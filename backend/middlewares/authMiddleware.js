import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token, '123');
  if (!token) {
    return res.status(401).json({ message: 'Lỗi jwt!' });
  }
  try {
    const decode = JWT.verify(
      token,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    console.log(req.user._id, 'isAdmin');
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(200).send({
        success: false,
        message: "Lỗi truy cập!",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Lỗi",
    });
  }
};