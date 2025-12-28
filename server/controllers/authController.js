import { response } from "express";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "./nodemailer.js";


export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long"
    });
  }


  try {
    const existingUser = await userModel.findOne({ email }); // is email pe user pehle se exist krta hai ya nhi?
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ name, email, password: hashedPassword });
    await user.save(); // user ko save karna database me

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true, // because of this is cookie ko sirf server padh skta hai, browser ki javascript nhi, isse ham XSS attack se bach skte hai
      secure: process.env.NODE_ENV === 'production', // cookie sirf https pe chalegi production me and localhost hai to kisi pe chal jayegi
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',  // Cookie sirf tabhi bhejo jab user tumhari hi site par ho.
      maxAge: 7 * 24 * 60 * 60 * 1000  // days => hours => minutes => seconds => mili seconds
    })

    // Sending the welcome email
    // const mailOptions = {
    //     from: process.env.SENDER_EMAIL,
    //     to: email,
    //     subject: 'Welcome to Gooolo',
    //     text: `Welcome to Goolo website. Your account has been created with email id: ${email}`
    // }


    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Hello Motu Shikha Dii 🎉",
      html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #4F46E5;">Welcome to Goolo 🚀</h2>
                <p style="font-size: 16px;">
                    Hi <strong>${email}</strong>,
                </p>
                <p>
                    Your account has been successfully created.
                </p>
                <p style="margin-top: 20px; font-size: 14px; color: gray;">
                    Thanks for joining Goolo 🙂
                </p>
                </div>
            `
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message
    });
  }
}


export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required"
    });
  }

  try {

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
      success: true,
      message: "User loggedIn successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message
    })
  }
}


export const logout = async (req, res) => {

  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
    })


    return res.status(200).json({
      success: true,
      message: "User logged out successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message
    })
  }
}

// Send Verification OTP to the User's Email
export const sendVerifyOtp = async (req, res) => {
  try {
    // const { userId } = req.body;
    const userId  = req.user.id; // JWT token ko verify karke server khud userId nikalta hai and for that I have to make middleware (authMiddleware) jo jwt ko verify kare

    // Check user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Already verified check (status code fix)
    if (user.isAccountVerified) {
      return res.status(400).json({
        success: false,
        message: "Account already verified"
      });
    }

    // Proper 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP + expiry (24 HOURS)
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 5 * 60 * 1000;
    await user.save();

    // Proper email usage
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #4F46E5;">Verify Your Account 🔐</h2>
          <p>Hi <strong>${user.email}</strong>,</p>
          <p>Your verification OTP is:</p>

          <h1 style="letter-spacing: 5px; color: #111;">
            ${otp}
          </h1>

          <p>This OTP is valid for <b>24 hours</b>.</p>

          <p style="margin-top: 20px; font-size: 14px; color: gray;">
            If you did not request this, please ignore this email.
          </p>
        </div>
      `
    };

    // Send mail
    await transporter.sendMail(mailOption);

    return res.status(200).json({
      success: true,
      message: "Verification OTP sent to email"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send verification OTP",
      error: error.message
    });
  }
};

// Verify the email using OTP
export const verifyEmail = async (req, res) => {
  try {
    const { otp } = req.body;
    const userId = req.user.id;

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required"
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (!user.verifyOtp || user.verifyOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired"
      });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
};


export const isAuthenticated = async (req, res) => {
  try {
      return res.status(200).json({
      success: true,
      message: "Authentication Successfull"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
}


// Send Password Reset OTP
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required"
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP + expiry (5 minutes)
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 5 * 60 * 1000;
    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #4F46E5;">Reset Your Password 🔑</h2>
          <p>Your password reset OTP is:</p>
          <h1 style="letter-spacing: 5px;">${otp}</h1>
          <p>This OTP is valid for <b>5 minutes</b>.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOption);

    return res.status(200).json({
      success: true,
      message: "Password reset OTP sent to email"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send reset OTP",
      error: error.message
    });
  }
};


// Reset User Password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Email, OTP, and new password are required"
    });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long"
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (!user.resetOtp || user.resetOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to reset password",
      error: error.message
    });
  }
};