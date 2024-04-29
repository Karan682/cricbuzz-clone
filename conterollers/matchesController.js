import matchModel from "../models/matchesModel.js";
import fs from "fs";
import slugify from "slugify";

export const createMatchController = async (req, res) => {
  try {
    const {
      name,
      description,
      toss_winner,
      category,
      team_1,
      team_2,
      venue,
      team_1r,
      team_2r,
      winner
    } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !toss_winner:
        return res.status(500).send({ error: "toss_winner is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !team_1:
        return res.status(500).send({ error: "team_1 is Required" });
      case !team_2:
        return res.status(500).send({ error: "team_2 is Required" });
      case !venue:
        return res.status(500).send({ error: "venue is Required" });
      case !team_1r:
        return res.status(500).send({ error: "team_1 runs is Required" });
      case !team_2r:
        return res.status(500).send({ error: "team_2 runs is Required" });
        case !winner:
        return res.status(500).send({ error: "winner is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const matchs = new matchModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      matchs.photo.data = fs.readFileSync(photo.path);
      matchs.photo.contentType = photo.type;
    }
    await matchs.save();
    res.status(201).send({
      success: true,
      message: "Match Created Successfully",
      matchs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing match",
    });
  }
};

//get all matchs
export const getMatchController = async (req, res) => {
  try {
    const matchs = await matchModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: matchs.length,
      message: "ALlMatchs ",
      matchs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting matchs",
      error: error.message,
    });
  }
};
// get single match
export const getSingleMatchController = async (req, res) => {
  try {
    const match = await matchModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Match Fetched",
      match,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single match",
      error,
    });
  }
};

// get photo
export const matchPhotoController = async (req, res) => {
  try {
    const match = await matchModel.findById(req.params.pid).select("photo");
    if (match.photo.data) {
      res.set("Content-type", match.photo.contentType);
      return res.status(200).send(match.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete controller
export const deleteMatchController = async (req, res) => {
  try {
    await matchModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Match Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting match",
      error,
    });
  }
};

//upate matcha
export const updateMatchController = async (req, res) => {
  try {
    const {
      name,
      description,
      toss_winner,
      category,
      team_1,
      team_2,
      venue,
      team_1r,
      team_2r,
      winner
    } = req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !toss_winner:
        return res.status(500).send({ error: "toss_winner is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !team_1:
        return res.status(500).send({ error: "team_1 is Required" });
      case !team_2:
        return res.status(500).send({ error: "team_2 is Required" });
      case !venue:
        return res.status(500).send({ error: "venue is Required" });
      case !team_1r:
        return res.status(500).send({ error: "team_1 runs is Required" });
      case !team_2r:
        return res.status(500).send({ error: "team_2 runs is Required" });
        case !winner:
        return res.status(500).send({ error: "winner is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const matchs = await matchModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      matchs.photo.data = fs.readFileSync(photo.path);
      matchs.photo.contentType = photo.type;
    }
    await matchs.save();
    res.status(201).send({
      success: true,
      message: "Match Updated Successfully",
      matchs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte match",
    });
  }
};


//filter controller

export const matchFiltersController = async (req, res) => {
  try {
    const { checked } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    const matchs = await matchModel.find(args);
    res.status(200).send({
      success: true,
      matchs,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};