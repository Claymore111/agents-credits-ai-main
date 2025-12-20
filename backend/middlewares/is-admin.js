import Admin from "../models/admins.js";

export const isAdmin = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const admin = await Admin.findById(userId);
    if (!admin) {
      return res.status(401).json({ message: "Unauthorized , you are not an admin" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized , error while checking if you are an admin" });
  }
};
