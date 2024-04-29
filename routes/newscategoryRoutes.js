import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  NewscategoryControlller,
  createNewsCategoryController,
  deleteNewsCategoryCOntroller,
  singleNewsCategoryController,
  updateNewsCategoryController,
} from "./../conterollers/newscategoryController.js";

const router = express.Router();

//routes
// create category
router.post(
  "/createnews-category",
  requireSignIn,
  isAdmin,
  createNewsCategoryController
);

//update category
router.put(
  "/updatenews-category/:id",
  requireSignIn,
  isAdmin,
  updateNewsCategoryController
);

//getALl category
router.get("/getnews-category", NewscategoryControlller);

//single category
router.get("/singlenews-category/:slug", singleNewsCategoryController);

//delete category
router.delete(
  "/deletenews-category/:id",
  requireSignIn,
  isAdmin,
  deleteNewsCategoryCOntroller
);

export default router;