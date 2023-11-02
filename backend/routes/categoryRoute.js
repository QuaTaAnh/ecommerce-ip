import express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createCategoryController, deleteCategoryController, getAllCategoryControlller, getCategoryBanner, getOneCategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router()

router.post('/create-category', requireSignIn, isAdmin, createCategoryController)
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController)
router.get('/get-category', getAllCategoryControlller)
router.get('/get-category-by/:slug', getOneCategoryController)
router.get('/get-category-banner', getCategoryBanner)

export default router
