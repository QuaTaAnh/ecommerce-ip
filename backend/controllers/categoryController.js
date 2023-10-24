import slugify from "slugify"
import categoryModel from "../models/categoryModel.js"

export const createCategoryController = async (req, res) =>{
    try {
        const {name} = req.body
        //validate
        if(!name){
            return res.send({error: 'Vui lòng nhập tên sản phẩm!'})
        }
        const exisitingCategory = await categoryModel.findOne({name})
        if(exisitingCategory){
            return res.status(200).send({
                success: false, 
                message: 'Danh mục đã tồn tại!'
            })
        }

        const category = await new categoryModel({name, slug: slugify(name)}).save()
        res.status(201).send({
            success: true, 
            message: 'Thêm mới thành công!',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false, 
            message: 'Thêm mới thất bại!', 
            error
        })
    }
}