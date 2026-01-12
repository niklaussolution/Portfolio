/**
 * Mock Backend for Testing
 * 
 * This provides a temporary in-memory backend for testing the application
 * when the Supabase Edge Function is not yet deployed.
 * 
 * TO DISABLE: Set USE_MOCK_BACKEND to false once the real server is running.
 */

export const USE_MOCK_BACKEND = false; // Set to false when server is deployed

interface Registration {
  id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  role: 'Student' | 'Employee';
  organization: string;
  city: string;
  created_at: string;
}

interface AdminUser {
  email: string;
  password: string;
  token: string;
}

class MockBackend {
  private registrations: Registration[] = [];
  private adminUsers: AdminUser[] = [
    {
      email: 'niklaussolution@gmail.com',
      password: 'Niklaus@HsHari3457',
      token: 'mock-admin-token-12345'
    }
  ];

  // Simulate network delay
  private delay(ms: number = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Generate UUID
  private generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // Health check
  async health(): Promise<{ status: string }> {
    await this.delay(100);
    return { status: 'ok' };
  }

  // Register a new user
  async register(data: Omit<Registration, 'id' | 'created_at'>): Promise<any> {
    await this.delay(800);

    // Check for duplicate email
    const existingEmail = this.registrations.find(
      r => r.email.toLowerCase() === data.email.toLowerCase()
    );
    
    if (existingEmail) {
      throw new Error('This email is already registered');
    }

    const registration: Registration = {
      ...data,
      id: this.generateId(),
      created_at: new Date().toISOString()
    };

    this.registrations.push(registration);
    
    return {
      success: true,
      message: 'Registration successful!',
      data: registration
    };
  }

  // Admin login
  async adminLogin(email: string, password: string): Promise<any> {
    await this.delay(600);

    const admin = this.adminUsers.find(
      u => u.email === email && u.password === password
    );

    if (!admin) {
      throw new Error('Invalid credentials');
    }

    return {
      success: true,
      message: 'Login successful',
      access_token: admin.token,
      user: { email: admin.email, role: 'admin' }
    };
  }

  // Alias for compatibility
  async login(email: string, password: string): Promise<any> {
    return this.adminLogin(email, password);
  }

  // Get all registrations
  async getRegistrations(accessToken: string): Promise<any> {
    await this.delay(400);

    if (!this.isValidToken(accessToken)) {
      throw new Error('Unauthorized');
    }

    return {
      success: true,
      data: [...this.registrations].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    };
  }

  // Search registrations
  async searchRegistrations(accessToken: string, query: string): Promise<any> {
    await this.delay(300);

    if (!this.isValidToken(accessToken)) {
      throw new Error('Unauthorized');
    }

    const searchLower = query.toLowerCase();
    const filtered = this.registrations.filter(r =>
      r.fullName.toLowerCase().includes(searchLower) ||
      r.email.toLowerCase().includes(searchLower) ||
      r.mobileNumber.includes(searchLower) ||
      r.organization.toLowerCase().includes(searchLower) ||
      r.city.toLowerCase().includes(searchLower)
    );

    return {
      success: true,
      data: filtered.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    };
  }

  // Delete registration
  async deleteRegistration(accessToken: string, id: string): Promise<any> {
    await this.delay(400);

    if (!this.isValidToken(accessToken)) {
      throw new Error('Unauthorized');
    }

    const index = this.registrations.findIndex(r => r.id === id);
    
    if (index === -1) {
      throw new Error('Registration not found');
    }

    this.registrations.splice(index, 1);

    return {
      success: true,
      message: 'Registration deleted successfully'
    };
  }

  // Get statistics
  async getStats(accessToken: string): Promise<any> {
    await this.delay(300);

    if (!this.isValidToken(accessToken)) {
      throw new Error('Unauthorized');
    }

    const total = this.registrations.length;
    const students = this.registrations.filter(r => r.role === 'Student').length;
    const employees = this.registrations.filter(r => r.role === 'Employee').length;

    return {
      success: true,
      data: {
        total,
        students,
        employees
      }
    };
  }

  // Validate token
  private isValidToken(token: string): boolean {
    return this.adminUsers.some(u => u.token === token);
  }

  // Add sample data
  addSampleData() {
    const samples: Omit<Registration, 'id' | 'created_at'>[] = [
      {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        mobileNumber: '9876543210',
        role: 'Student',
        organization: 'ABC University',
        city: 'Mumbai'
      },
      {
        fullName: 'Jane Smith',
        email: 'jane.smith@company.com',
        mobileNumber: '8765432109',
        role: 'Employee',
        organization: 'Tech Corp',
        city: 'Delhi'
      },
      {
        fullName: 'Alice Johnson',
        email: 'alice.j@university.edu',
        mobileNumber: '7654321098',
        role: 'Student',
        organization: 'XYZ College',
        city: 'Bangalore'
      }
    ];

    samples.forEach(sample => {
      this.registrations.push({
        ...sample,
        id: this.generateId(),
        created_at: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
      });
    });
  }
}

// Create singleton instance
export const mockBackend = new MockBackend();

// Add sample data if in mock mode
if (USE_MOCK_BACKEND) {
  mockBackend.addSampleData();
}
