import productModel from "../models/productModel.js"
import fs from "fs";
import slugify from "slugify";

export const createProductController = async (req, res) =>{
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { image } = req.files
        //validate
        if(!name){
            return res.send({error: 'Vui lòng nhập tên sản phẩm!'})
        }
        if(!description){
            return res.send({error: 'Vui lòng nhập mô tả sản phẩm!'})
        }
        if(!price){
            return res.send({error: 'Vui lòng nhập giá sản phẩm!'})
        }
        if(!quantity){
            return res.send({error: 'Vui lòng nhập số lượng sản phẩm!'})
        }
        if(!category){
            return res.send({error: 'Vui lòng nhập danh mục sản phẩm!'})
        }
        if(image && image.size > 1000000){
            return res.send({error: 'Dung lượng ảnh phải nhỏ hơn 1Mb!'})
        }

        const product = new productModel({...req.fields, slug: slugify(name)})
        if(image){
            product.image.data = fs.readFileSync(image.path);
            product.image.contentType = image.type;
        }
        await product.save()
        res.status(201).send({
            success: true, 
            message: 'Thêm mới sản phẩm thành công!',
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false, 
            message: 'Thêm mới sản phẩm thất bại!', 
            error
        })
    }
}