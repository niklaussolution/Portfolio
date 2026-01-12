const Registration = require("../models/Registration");

exports.registerUser = async (req, res) => {
  try {
    const { fullName: name, email, mobileNumber: phone, role, organization, city } = req.body;

    if (!name || !email || !phone || !role || !organization || !city) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const newRegistration = new Registration({
      name,
      email,
      phone,
      role,
      organization,
      city
    });

    await newRegistration.save();

    console.log("✅ Registration saved");

    res.status(201).json({
      success: true,
      message: "Registration successful"
    });

  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({});
    res.status(200).json({
      success: true,
      data: registrations
    });
  } catch (err) {
    console.error("❌ Get registrations error:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
