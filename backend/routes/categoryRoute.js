import express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createCategoryController, deleteCategoryController, getAllCategoryByPageControlller, getAllCategoryControlller, getCategoryByType, getOneCategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router()

router.post('/create-category', requireSignIn, isAdmin, createCategoryController)
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController)
router.get('/get-all-category-by/:page', getAllCategoryByPageControlller)
router.get('/get-all-category', getAllCategoryControlller)
router.get('/get-category-by/:slug', getOneCategoryController)
router.get('/get-category-by-type/:slug', getCategoryByType)

export default router
