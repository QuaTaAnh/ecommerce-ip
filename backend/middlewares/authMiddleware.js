import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
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

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const { id, name, phoneNumber, address, avatar } = decodedToken;
    req.user = { id, name, phoneNumber, address, avatar };
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: 'Đã xảy ra lỗi!',
    });
  }
};
