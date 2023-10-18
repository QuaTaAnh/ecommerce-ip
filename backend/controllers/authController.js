import { hashPassword } from "../helpers/authHelper.js"
import userModel from "../models/userModel.js"

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
        if(!address){
            return res.send({error: 'Vui lòng nhập địa chỉ!'})
        }

        //check user
        const exisitingUser = await userModel.findOne({email})

        if(exisitingUser){
            return res.status(200).send({
                success: true, 
                message: 'Đã đăng kí, vui lòng đăng nhập'
            })
        }

        const hashedPass = await hashPassword(password)
        const user = await new userModel({name, email, password: hashedPass, phoneNumber, address}).save()
        res.status(201).send({
            success: true, 
            message: 'Người dùng đăng kí thành công',
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
