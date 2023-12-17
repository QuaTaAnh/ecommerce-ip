import productModel from "../models/productModel.js"
import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import cloudinary from "../config/cloudinary.js";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) =>{
    try {
        const { name, description, price, category, quantity, image, shipping } = req.body;
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

        const result = await cloudinary.uploader.upload(image, {
            folder: "products",
        })
        if(result){
            const product = new productModel({
                name,
                description,
                category, 
                price,
                quantity,
                image: result.secure_url, 
                slug: slugify(name)})
            await product.save()
            res.status(201).send({
                success: true, 
                message: 'Thêm mới sản phẩm thành công!',
                product
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false, 
            message: 'Thêm mới sản phẩm thất bại!', 
            error
        })
    }
}

export const getAllProductByPageController = async (req, res) =>{
    try {
        const page = req.params.page ? req.params.page : 1;
        const perPage = 8;
        const totalProducts = await productModel.countDocuments({});
        const product = await productModel
        .find({})
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            totalProduct: totalProducts,
            message: "Lấy danh sách sản phẩm thành công!",
            product,
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

export const getOneProductController = async (req, res) =>{
    try {
        const product = await productModel.findOne({slug: req.params.slug})
        res.status(200).send({
            success: true,
            message: "Lấy sản phẩm thành công!",
            product
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

export const searchProduct = async (req, res) =>{
    try {
        const {searchValue} = req.params
        const result = await productModel.find({
            $or: [
                { name: { $regex: searchValue, $options: "i" }}
            ]
        }).limit(5)
        res.json(result)
    } catch (error) {
        console.log(error);
        res.status(500).send({
        success: false,
        error,
        message: "Đã xảy ra lỗi!",
      });
    }
}

export const updateProductController = async (req, res) =>{
    try {
        const { name, description, price, category, quantity, image, shipping } = req.body;
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

        const result = await cloudinary.uploader.upload(image, {
            folder: "products",
        })

        const product = await productModel.findByIdAndUpdate(
            req.params.id, 
            { name,
            description,
            category, 
            price,
            quantity,
            image: result.secure_url, 
            slug: slugify(name)},
            { new: true },
        )
        await product.save()
        res.status(201).send({
            success: true, 
            message: 'Cập nhật sản phẩm thành công!',
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false, 
            message: 'Cập nhật sản phẩm thất bại!', 
            error
        })
    }
}

export const deleteProductController = async (req, res) =>{
    try {
        const {id} = req.params
        await productModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true, 
            message: 'Xóa sản phẩm thành công!', 
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false, 
            message: 'Xóa sản phẩm thất bại!', 
            error
        })
    }
}

export const getProductInCategoryController = async (req, res) =>{
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel.find({ category }).populate("category");
        res.status(200).send({
        success: true,
        category,
        products,
    });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false, 
            message: 'Đã xảy ra lỗi!', 
            error
        })
    }
}

export const getProductInCategoryControllerByPage = async (req, res) =>{
    try {
        const page = req.params.page ? req.params.page : 1;
        const perPage = 8;
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const totalProducts = await productModel.countDocuments({category: category._id});
        const products = await productModel
        .find({ category })
        .populate("category")
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
        res.status(200).send({
        success: true,
        category,
        products,
        totalProducts: totalProducts
    });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false, 
            message: 'Đã xảy ra lỗi!', 
            error
        })
    }
}

export const braintreeTokenController = async (req, res) => {
    try {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(response);
        }
      });
    } catch (error) {
      console.log(error);
    }
}

export const brainTreePaymentController = async (req, res) => {
    try {
        console.log(req.user, 'iii');
      const { nonce, items, userId } = req.body;
      let total = 0;
      items.map((i) => {
        total += i.price;
      });
      let newTransaction = gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        function (error, result) {
            if (error) {
                console.error(error);
                return;
            }
          if (result) {
            const order = new orderModel({
              products: items,
              payment: result,
              buyer: userId,
            }).save();
            res.json({ ok: true });
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
}