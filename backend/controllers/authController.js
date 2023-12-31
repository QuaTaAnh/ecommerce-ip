import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import userModel from "../models/userModel.js"
import orderModel from "../models/orderModel.js"
import JWT from 'jsonwebtoken'
import cloudinary from "../config/cloudinary.js"

export const registerController = async (req, res) =>{
    try {
        const {name, email, password, phoneNumber, address, role } = req.body
        //validate
        if(!name){
            return res.send({error: 'Vui lòng nhập tên!'})
        }
        if(!email){
            return res.send({error: 'Vui lòng nhập email!'})
        }
        if(!password){
            return res.send({error: 'Vui lòng nhập mật khẩu!'})
        }
        if(!phoneNumber){
            return res.send({error: 'Vui lòng nhập số điện thoại!'})
        }

        //check user
        const exisitingUser = await userModel.findOne({email})

        if(exisitingUser){
            return res.status(200).send({
                success: false, 
                message: 'Email này đã đăng kí, vui lòng đăng nhập!'
            })
        }

        const hashedPass = await hashPassword(password)
        const user = await new userModel({name, email, password: hashedPass, phoneNumber, address}).save()
        res.status(201).send({
            success: true, 
            message: 'Người dùng đăng kí thành công!',
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false, 
            message: 'Đăng kí thất bại!', 
            error
        })
    }
}

export const loginController = async (req, res) =>{
    try {
        const {email, password} = req.body
        //validate
        if(!email || !password){
            return res.status(404).send({
                success: false, 
                message: 'Email hoặc mật khẩu không hợp lệ!'
            })

        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false, 
                message: 'Email chưa đăng kí!'
            })
        }
        const checkPass = await comparePassword(password, user.password)
        if(!checkPass){
            return res.status(200).send({
                success: false, 
                message: 'Sai mật khẩu!'
            })
        }

        //token
        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'}) 
        res.status(200).send({
            success: true, 
            message: 'Đăng nhập thành công!', 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                phoneNumber: user.phoneNumber,
                address: user.address,
                avatar: user.avatar,
                role: user.role
            },
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false, 
            message: 'Đăng nhập thất bại!', 
            error
        })
    }
}

export const updateProfileController = async (req, res) => {
    try {
        const { _id, name, password, address, phoneNumber, avatar } = req.body;
        const user = await userModel.findById(_id);
        if (password && password.length < 6) {
            return res.json({ error: "Mật khẩu phải lớn hơn 6 kí tự!" });
          }
        const result = await cloudinary.uploader.upload(avatar, {
            folder: "users",
        })
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            _id,
            {
              name: name || user.name,
              password: hashedPassword || user.password,
              phoneNumber: phoneNumber || user.phoneNumber,
              address: address || user.address,
              avatar: avatar || result.secure_url
            },
            { new: true }
          );
          res.status(200).send({
            success: true,
            message: "Cập nhập thông tin thành công!",
            updatedUser,
          });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false, 
            message: 'Cập nhật thông tin thất bại!', 
            error
        })
        
    }   
}

export const getOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({ buyer: req.params.id })
        .populate("buyer", "name")
        res.json(orders)
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Đã xảy ra lỗi!",
        error,
      });
    }
  };
  
