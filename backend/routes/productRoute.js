import express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getAllProductByPageController, getOneProductController, getProductInCategoryController, getProductInCategoryControllerByPage, searchProduct, updateProductController } from "../controllers/productController.js";

const router = express.Router()

router.post('/create-product', requireSignIn, isAdmin, createProductController)
router.get('/get-all-product-by-page/:page', getAllProductByPageController)
router.get('/get-product-by/:slug', getOneProductController)
router.get('/search-product/:searchValue', searchProduct)
router.put('/update-product/:id', requireSignIn, isAdmin, updateProductController)
router.delete("/delete-product/:id", requireSignIn, isAdmin, deleteProductController)
router.get('/get-product-in-category/:slug', getProductInCategoryController)
router.get('/get-product-in-category-by-page/:slug/:page', getProductInCategoryControllerByPage)

export default router
