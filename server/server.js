const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const connectDB = require("./config/database");
require("dotenv").config();

const app = express();

/* ---------------- CONNECT DB ---------------- */
connectDB();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5174",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- ROUTES ---------------- */
app.use("/api", require("./routes/registration"));

/* ---------------- EMAIL SETUP ---------------- */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* ---------------- EMAIL ROUTE ---------------- */
app.post("/send-confirmation", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and Email required"
      });
    }

    const mailOptions = {
      from: `"Niklaus Solutions" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank You for Registering – Niklaus Solutions",
      html: `
        <h2>Dear ${name},</h2>
        <p>Thank you for registering for the <b>Free Cyber Awareness Seminar</b>
        conducted by <b>Niklaus Solutions</b>.</p>
        <p>Your registration has been <b>successfully received</b>.</p>
        <p><b>Niklaus Solutions</b><br/>
        🌐 www.theniklaus.com</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Confirmation email sent"
    });

  } catch (err) {
    console.error("❌ Email Error:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

/* ---------------- ROOT ROUTE ---------------- */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
    endpoints: {
      register: "POST /api/register",
      getRegistrations: "GET /api/registrations",
      sendConfirmation: "POST /send-confirmation"
    }
  });
});

/* ---------------- 404 HANDLER ---------------- */
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

/* ---------------- SERVER ---------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
