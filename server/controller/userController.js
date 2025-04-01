const userModel = require("../modal/userModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "offical.foxteach@gmail.com",
    pass: "ernq sbxn tvqz hrut",
  },
});

const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(201)
        .send({ message: "User don't exist", success: false, statusCode: 201 });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(202).send({
        message: "Incorrect Password",
        success: false,
        statusCode: 202,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).send({
      message: "Login Successfully",
      userId: user._id,
      token: token,
      success: true,
      statusCode: 200,
      isAdmin: user.isAdmin,
      user: user,
    });
  } catch (error) {
    return res
      .status(401)
      .send({ message: "Internal Server Error", success: true });
  }
};

const signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).send({
        message: "Email, Name, and Password are required.",
        success: false,
      });
    }

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.status(201).send({
        message: "User already exists",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ ...req.body, password: hashPassword });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetLink = `https://www.foxteach.org/add-new-password?token=${resetToken}&email=${email}`;

    newUser.resetToken = resetToken;
    newUser.tokenExpiry = Date.now() + 3600000;
    await newUser.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "offical.foxteach@gmail.com",
        pass: "ernq sbxn tvqz hrut",
      },
    });

    await transporter.sendMail({
      from: '"FoxTeach" <offical.foxteach@gmail.com>',
      to: email,
      subject: "FoxTeach Reset Password",
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h1 style="text-align: center; color:rgb(93, 216, 101);">Welcome, ${req.body.name}!</h1>
            <img src="https://foxtech-x0qv.onrender.com/static/3.png" alt="Coffee Cup" style="display: block; margin: 0 auto; width: 120px; height: 120px;" />
            <p style="font-size: 16px; line-height: 1.5; text-align: center; color: #333;">Your account has been successfully created.</p>
            <p style="text-align: center; margin-top: 20px;">
              <a href="${resetLink}" style="background-color:rgb(93, 216, 109); color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Set Your Password</a>
            </p>
            <p style="font-size: 14px; text-align: center; color: #999;">If you did not create this account, please contact us immediately.</p>
          </div>
        </div>
      `,
    });

    res.status(200).send({
      message: "User created successfully. Email sent.",
      success: true,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

// Reset Password Function
const resetPassword = async (req, res) => {
  try {
    const { token } = req.query;
    const { password } = req.body;

    const user = await userModel.findOne({
      resetToken: token,
      tokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send({
        message: "Invalid or expired token",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetToken = undefined;
    user.tokenExpiry = undefined;

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "offical.foxteach@gmail.com",
        pass: "ernq sbxn tvqz hrut",
      },
    });

    await transporter.sendMail({
      from: '"FoxTeach" <offical.foxteach@gmail.com>',
      to: user.email,
      subject: "Password Updated",
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h1 style="text-align: center; color:rgb(93, 216, 95);">Password Updated Successfully</h1>
          <img src="https://foxtech-x0qv.onrender.com/static/3.png" alt="Coffee Cup" style="display: block; margin: 0 auto; width: 120px; height: 120px;" />
          <p style="font-size: 16px; line-height: 1.5; text-align: center; color: #333;">Hello ${req.body.name},</p>
          <p style="font-size: 16px; line-height: 1.5; text-align: center; color: #333;">Your password has been successfully updated.</p>
          <p style="font-size: 14px; text-align: center; color: #999;">If you didn't initiate this change, please contact us immediately.</p>
        </div>
      </div>
    `,
    });

    res.status(200).send({
      message: "Password reset successfully. Confirmation email sent.",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.tokenExpiry = Date.now() + 3600000;
    await user.save();

    const resetLink = `https://www.foxteach.org/reset-password/${token}`;

    const html = `
      <div style="font-family: 'Arial', sans-serif; background-color: #f9f9f9; padding: 30px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 25px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h1 style="text-align: center; color: #4CAF50; font-family: 'Bank Gothic', Arial, sans-serif;">Welcome to FoxTeach, ${user.name}!</h1>
          <img src="https://foxtech-x0qv.onrender.com/static/3.png" alt="Coffee Cup" style="display: block; margin: 0 auto; width: 140px; height: 120px; border-radius: 5px;" />
          <p style="font-size: 16px; line-height: 1.8; text-align: center; color: #555;">Hello ${user.name},</p>
          <p style="font-size: 16px; line-height: 1.8; text-align: center; color: #555;">You requested a password reset. Click the link below to reset your password:</p>
          <p style="text-align: center; margin-top: 20px;">
            <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-weight: bold; font-family: 'Bank Gothic', Arial, sans-serif;">Reset Password</a>
          </p>
          <p style="font-size: 14px; text-align: center; color: #999;">If you did not request a password reset, please ignore this email.</p>
          <hr style="margin: 20px 0; border: 0.5px solid #ddd;">
          <p style="font-size: 14px; text-align: center; color: #999;">FoxTeach Team, Bringing the best brewing stories to life.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: '"FoxTeach" <arijitghosh1203@gmail.com>',
      to: email,
      subject: "Password Reset",
      html: html,
    });

    res.json({ success: true, message: "Password reset link sent to email." });
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const resetPasswordInLoginTime = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await userModel.findOne({
      resetToken: token,
      tokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token." });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.tokenExpiry = undefined;
    await user.save();

    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <h1 style="text-align: center; color:rgb(93, 216, 105);">Password Reset Successful</h1>
          <img src="https://foxtech-x0qv.onrender.com/static/3.png" alt="Coffee Cup" style="display: block; margin: 0 auto; width: 140px; height: 120px;" />
          <p style="font-size: 16px; line-height: 1.5; text-align: center; color: #333;">Hello ${user.name},</p>
          <p style="font-size: 16px; line-height: 1.5; text-align: center; color: #333;">Your password has been successfully reset!</p>
          <p style="font-size: 14px; text-align: center; color: #999;">If you didn't initiate this change, please contact us immediately.</p>
        </div>
      </div>
    `;


    await transporter.sendMail({
      from: '"FoxTeach" <offical.foxteach@gmail.com>',
      to: user.email,
      subject: "Password Reset Successful",
      html: confirmationHtml,
    });

    res.json({ success: true, message: "Password reset successful." });
  } catch (error) {
    console.error("Error in reset password:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    return res
      .status(500)
      .json({ message: "Server error while deleting user" });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await userModel.find();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUser:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching users" });
  }
};

const validateToken = (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ isValid: false, message: "No token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ isValid: false, message: "Invalid token" });
    }
    return res.status(200).json({ isValid: true, message: "Token is valid" });
  });
};

const getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "Unauthorized", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found", success: false });
    }

    res.status(200).send(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).send({ message: "Server Error", success: false });
  }
};

const updateProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { field, value } = req.body;

    let user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    if (field === "name") user.name = value;
    if (field === "password") {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(value, salt);
    }
    if (field === "phone") user.phone = value;
    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  login,
  signup,
  resetPassword,
  forgotPassword,
  resetPasswordInLoginTime,
  deleteUser,
  getUser,
  validateToken,
  getProfile,
  updateProfile,
};
