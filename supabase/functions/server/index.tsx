import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Initialize Supabase clients
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

// Service role client for admin operations
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-f0354f00/health", (c) => {
  return c.json({ status: "ok" });
});

// Initialize database tables on startup
async function initializeDatabase() {
  try {
    console.log("Checking/creating registrations_niklaus table...");
    
    // Create the registrations table if it doesn't exist
    const { error: createTableError } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.registrations_niklaus (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          phone TEXT NOT NULL,
          dob DATE NOT NULL,
          category TEXT CHECK (category IN ('Student','Employee')) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });
    
    if (createTableError) {
      console.log("Note: exec_sql RPC might not exist, using direct table operations");
    }
    
    // Enable RLS
    const { error: rlsError } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        ALTER TABLE public.registrations_niklaus ENABLE ROW LEVEL SECURITY;
      `
    });
    
    // Create policies
    const { error: policyError } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        DO $$ 
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_policies 
            WHERE tablename = 'registrations_niklaus' 
            AND policyname = 'Public Insert'
          ) THEN
            CREATE POLICY "Public Insert"
            ON public.registrations_niklaus
            FOR INSERT
            WITH CHECK (true);
          END IF;
          
          IF NOT EXISTS (
            SELECT 1 FROM pg_policies 
            WHERE tablename = 'registrations_niklaus' 
            AND policyname = 'Admin Full Access'
          ) THEN
            CREATE POLICY "Admin Full Access"
            ON public.registrations_niklaus
            FOR ALL
            USING (auth.role() = 'authenticated');
          END IF;
        END $$;
      `
    });
    
    console.log("Database initialization complete");
  } catch (error) {
    console.log("Database initialization note:", error);
  }
}

// Initialize on startup
initializeDatabase();

// ============= PUBLIC ROUTES =============

// Submit registration (public endpoint)
app.post("/make-server-f0354f00/register", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, dob, category } = body;

    // Validate required fields
    if (!name || !email || !phone || !dob || !category) {
      return c.json(
        { success: false, error: "All fields are required" },
        400
      );
    }

    // Validate category
    if (category !== 'Student' && category !== 'Employee') {
      return c.json(
        { success: false, error: "Category must be either Student or Employee" },
        400
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json(
        { success: false, error: "Invalid email format" },
        400
      );
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (!phoneRegex.test(phone) || phone.length < 10) {
      return c.json(
        { success: false, error: "Invalid phone number format" },
        400
      );
    }

    // Insert registration using anon key (public access)
    const supabasePublic = createClient(supabaseUrl, supabaseAnonKey);
    
    const { data, error } = await supabasePublic
      .from('registrations_niklaus')
      .insert([
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          dob,
          category
        }
      ])
      .select();

    if (error) {
      console.error("Registration error:", error);
      
      // Check for duplicate email
      if (error.code === '23505' || error.message.includes('duplicate') || error.message.includes('unique')) {
        return c.json(
          { success: false, error: "This email is already registered" },
          400
        );
      }
      
      return c.json(
        { success: false, error: `Registration failed: ${error.message}` },
        400
      );
    }

    console.log("Registration successful:", data);
    return c.json({ success: true, message: "Registration successful!", data });
  } catch (error) {
    console.error("Server error during registration:", error);
    return c.json(
      { success: false, error: `Server error: ${error.message}` },
      500
    );
  }
});

// ============= ADMIN ROUTES =============

// Admin signup route
app.post("/make-server-f0354f00/admin/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return c.json(
        { success: false, error: "Email and password are required" },
        400
      );
    }

    // Create admin user
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { name: name || 'Admin', role: 'admin' },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error("Admin signup error:", error);
      return c.json(
        { success: false, error: `Signup failed: ${error.message}` },
        400
      );
    }

    return c.json({ success: true, message: "Admin account created successfully", data });
  } catch (error) {
    console.error("Server error during admin signup:", error);
    return c.json(
      { success: false, error: `Server error: ${error.message}` },
      500
    );
  }
});

// Admin login verification (checks if user exists and returns session info)
app.post("/make-server-f0354f00/admin/login", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    if (!email || !password) {
      return c.json(
        { success: false, error: "Email and password are required" },
        400
      );
    }

    // Sign in with email/password
    const supabasePublic = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabasePublic.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error);
      return c.json(
        { success: false, error: "Invalid credentials" },
        401
      );
    }

    return c.json({
      success: true,
      message: "Login successful",
      access_token: data.session.access_token,
      user: data.user
    });
  } catch (error) {
    console.error("Server error during login:", error);
    return c.json(
      { success: false, error: `Server error: ${error.message}` },
      500
    );
  }
});

// Get all registrations (protected - admin only)
app.get("/make-server-f0354f00/admin/registrations", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ success: false, error: "Unauthorized: No token provided" }, 401);
    }

    // Verify user with access token
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
    
    if (authError || !user) {
      console.error("Authorization error while fetching registrations:", authError);
      return c.json({ success: false, error: "Unauthorized: Invalid token" }, 401);
    }

    // Get all registrations
    const { data, error } = await supabaseAdmin
      .from('registrations_niklaus')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching registrations:", error);
      return c.json(
        { success: false, error: `Failed to fetch registrations: ${error.message}` },
        400
      );
    }

    return c.json({ success: true, data });
  } catch (error) {
    console.error("Server error fetching registrations:", error);
    return c.json(
      { success: false, error: `Server error: ${error.message}` },
      500
    );
  }
});

// Search registrations (protected - admin only)
app.get("/make-server-f0354f00/admin/registrations/search", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }

    // Verify user
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }

    const searchQuery = c.req.query('q') || '';
    const searchType = c.req.query('type') || 'all';

    let query = supabaseAdmin
      .from('registrations_niklaus')
      .select('*');

    if (searchQuery) {
      switch (searchType) {
        case 'name':
          query = query.ilike('name', `%${searchQuery}%`);
          break;
        case 'email':
          query = query.ilike('email', `%${searchQuery}%`);
          break;
        case 'phone':
          query = query.ilike('phone', `%${searchQuery}%`);
          break;
        default:
          // Search across all fields
          query = query.or(`name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,phone.ilike.%${searchQuery}%`);
      }
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error("Search error:", error);
      return c.json(
        { success: false, error: `Search failed: ${error.message}` },
        400
      );
    }

    return c.json({ success: true, data });
  } catch (error) {
    console.error("Server error during search:", error);
    return c.json(
      { success: false, error: `Server error: ${error.message}` },
      500
    );
  }
});

// Delete registration (protected - admin only)
app.delete("/make-server-f0354f00/admin/registrations/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }

    // Verify user
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }

    const id = c.req.param('id');

    const { error } = await supabaseAdmin
      .from('registrations_niklaus')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Delete error:", error);
      return c.json(
        { success: false, error: `Delete failed: ${error.message}` },
        400
      );
    }

    return c.json({ success: true, message: "Registration deleted successfully" });
  } catch (error) {
    console.error("Server error during delete:", error);
    return c.json(
      { success: false, error: `Server error: ${error.message}` },
      500
    );
  }
});

// Get registration stats (protected - admin only)
app.get("/make-server-f0354f00/admin/stats", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }

    // Verify user
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(accessToken);
    
    if (authError || !user) {
      return c.json({ success: false, error: "Unauthorized" }, 401);
    }

    // Get total count
    const { count: totalCount, error: totalError } = await supabaseAdmin
      .from('registrations_niklaus')
      .select('*', { count: 'exact', head: true });

    // Get student count
    const { count: studentCount, error: studentError } = await supabaseAdmin
      .from('registrations_niklaus')
      .select('*', { count: 'exact', head: true })
      .eq('category', 'Student');

    // Get employee count
    const { count: employeeCount, error: employeeError } = await supabaseAdmin
      .from('registrations_niklaus')
      .select('*', { count: 'exact', head: true })
      .eq('category', 'Employee');

    if (totalError || studentError || employeeError) {
      return c.json(
        { success: false, error: "Failed to fetch stats" },
        400
      );
    }

    return c.json({
      success: true,
      data: {
        total: totalCount || 0,
        students: studentCount || 0,
        employees: employeeCount || 0
      }
    });
  } catch (error) {
    console.error("Server error fetching stats:", error);
    return c.json(
      { success: false, error: `Server error: ${error.message}` },
      500
    );
  }
});

Deno.serve(app.fetch);
