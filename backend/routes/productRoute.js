import express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, getAllProductByPageController, searchProduct } from "../controllers/productController.js";
import formidable from 'express-formidable'

const router = express.Router()

router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)
router.get('/get-all-product-by-page/:page', getAllProductByPageController)
router.get('/search-product/:searchValue', searchProduct)
// router.put('/update-product/:id', requireSignIn, isAdmin, updateProductController)
// router.delete("/delete-product/:id", requireSignIn, isAdmin, deleteProductController)
// router.get('/get-product-by/:slug', getOneProductController)

export default router
