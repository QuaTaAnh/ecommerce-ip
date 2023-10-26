import slugify from "slugify"
import categoryModel from "../models/categoryModel.js"

export const createCategoryController = async (req, res) =>{
    try {
        const {name} = req.body
        //validate
        if(!name){
            return res.send({error: 'Vui lòng nhập tên danh mục!'})
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
            message: 'Thêm mới danh mục thành công!',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false, 
            message: 'Thêm mới danh mục thất bại!', 
            error
        })
    }
}

export const updateCategoryController = async (req, res) => {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const exisitingCategory = await categoryModel.findOne({name})
        if(exisitingCategory){
            return res.status(200).send({
                success: false, 
                message: 'Danh mục đã tồn tại!'
            })
      }
      const category = await categoryModel.findByIdAndUpdate(
        id,
        { name, slug: slugify(name) },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Cập nhật danh mục thành công!",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Cập nhật danh mục thất bại!",
      });
    }
  };

//getAll
export const getAllCategoryControlller = async (req, res) => {
    try {
      const category = await categoryModel.find({});
      res.status(200).send({
        success: true,
        message: "Lấy danh sách danh mục thành công!",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Đã xảy ra lỗi!",
      });
    }
};

export const getOneCategoryController = async (req, res) =>{
    try {
        const category = await categoryModel.findOne({slug: req.params.slug})
        res.status(200).send({
            success: true,
            message: "Lấy danh mục thành công!",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
        success: false,
        error,
        message: "Đã xảy ra lỗi!",
      });
    }
}

export const deleteCategoryController = async (req, res) =>{
    try {
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
        success: true,
        message: "Xóa danh mục thành công!",
    });
    } catch (error) {
        console.log(error);
        res.status(500).send({
        success: false,
        error,
        message: "Đã xảy ra lỗi!",
      });
    }
}