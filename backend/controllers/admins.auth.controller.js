import Admin from "../models/admins.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const registerAdmin = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      cin,
      gender,
      location,
      zipCode,
      password,
      confirmPassword,
    } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      firstName,
      lastName,
      email,
      phone,
      cin,
      gender,
      location,
      zipCode,
      password: hashedPassword,
    });
    res.status(201).json({ message: "Admin registered successfully", admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true, secure: true, maxAge: 3600000 });
    res.status(200).json({ message: "Login successful", admin , token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutAdmin = async (req, res) => {
  try {
    console.log("Logging out...");
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const admin = await Admin.findById(userId).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin found", admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin updated successfully", admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};