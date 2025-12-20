import Client from "../models/clients.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerClient = async (req, res) => {
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
    const client = await Client.create({
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
    res.status(201).json({ message: "Client registered successfully", client });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginClient = async (req, res) => {
  try {
    const { email, password } = req.body;
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, client.password);
    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3600000,
        secure: true,
      });
    res
        .status(200)
        .json({ message: "Login successful", user: client, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutClient = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClient = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const client = await Client.findById(userId).select("-password");
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Client found", user: client });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json({ message: "Clients found", clients });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};