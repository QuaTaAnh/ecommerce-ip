import express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getAllProductByPageController, getProductInCategoryController, searchProduct, updateProductController } from "../controllers/productController.js";

const router = express.Router()

router.post('/create-product', requireSignIn, isAdmin, createProductController)
router.get('/get-all-product-by-page/:page', getAllProductByPageController)
router.get('/search-product/:searchValue', searchProduct)
router.put('/update-product/:id', requireSignIn, isAdmin, updateProductController)
router.delete("/delete-product/:id", requireSignIn, isAdmin, deleteProductController)
router.get('/get-product-in-category/:slug', getProductInCategoryController)

export default router
