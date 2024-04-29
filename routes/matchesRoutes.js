import express from "express";
import {
  createMatchController,
  deleteMatchController,
  getMatchController,
  getSingleMatchController,
  matchPhotoController,
  updateMatchController,
  matchFiltersController,
} from "../conterollers/matchesController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-match",
  requireSignIn,
  isAdmin,
  formidable(),
  createMatchController
);
//routes
router.put(
  "/update-match/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateMatchController
);

//get matchs
router.get("/get-match", getMatchController);

//single match
router.get("/get-match/:slug", getSingleMatchController);

//get photo
router.get("/match-photo/:pid", matchPhotoController);

//delete rmatch
router.delete("/delete-match/:pid", deleteMatchController);

//filter controller
router.post("/match-filters", matchFiltersController);

export default router;