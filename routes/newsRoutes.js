import express from "express";
import {
  createNewsController,
  deleteNewsController,
  getNewsController,
  getSingleNewsController,
  newsPhotoController,
  updateNewsController,
  newsFiltersController
} from "../conterollers/newsController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-news",
  requireSignIn,
  isAdmin,
  formidable(),
  createNewsController
);
//routes
router.put(
  "/update-news/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateNewsController
);

//get news
router.get("/get-news", getNewsController);

//single news
router.get("/get-news/:slug", getSingleNewsController);

//get photo
router.get("/news-photo/:pid", newsPhotoController);

//delete rnews
router.delete("/delete-news/:pid", deleteNewsController);

//filter 
router.post("/news-filters", newsFiltersController);

export default router;