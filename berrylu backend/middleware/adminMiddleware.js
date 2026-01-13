import jwt from "jsonwebtoken";
import User from "../models/User.js";

const adminProtect = async (req, res, next) => {
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user || !user.isAdmin) {
        return res.status(403).json({ message: "Admin access only" });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token failed" });
    }
  } else {
    return res.status(401).json({ message: "No token, not authorized" });
  }
};

export default adminProtect;
