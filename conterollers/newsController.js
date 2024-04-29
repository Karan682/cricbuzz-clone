import newsModel from "../models/newsModel.js";
import fs from "fs";
import slugify from "slugify";

export const createNewsController = async (req, res) => {
  try {
    const {
      name,
      description,
      category,

    } = req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
     
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const news = new newsModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      news.photo.data = fs.readFileSync(photo.path);
      news.photo.contentType = photo.type;
    }
    await news.save();
    res.status(201).send({
      success: true,
      message: "News Created Successfully",
      news,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing news",
    });
  }
};

//get all news
export const getNewsController = async (req, res) => {
  try {
    const news = await newsModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: news.length,
      message: "ALlNewss ",
      news,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting news",
      error: error.message,
    });
  }
};
// get single news
export const getSingleNewsController = async (req, res) => {
  try {
    const news = await newsModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single News Fetched",
      news,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single news",
      error,
    });
  }
};

// get photo
export const newsPhotoController = async (req, res) => {
  try {
    const news = await newsModel.findById(req.params.pid).select("photo");
    if (news.photo.data) {
      res.set("Content-type", news.photo.contentType);
      return res.status(200).send(news.photo.data);
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
export const deleteNewsController = async (req, res) => {
  try {
    await newsModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "News Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting news",
      error,
    });
  }
};

//upate newsa
export const updateNewsController = async (req, res) => {
  try {
    const {
      name,
      description,  
      category,
    } = req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" }); 
      case !category:
        return res.status(500).send({ error: "Category is Required" });
     
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const news = await newsModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      news.photo.data = fs.readFileSync(photo.path);
      news.photo.contentType = photo.type;
    }
    await news.save();
    res.status(201).send({
      success: true,
      message: "News Updated Successfully",
      news,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte news",
    });
  }
};

//filter controller
export const newsFiltersController = async (req, res) => {
  try {
    const { checked } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    const news = await newsModel.find(args);
    res.status(200).send({
      success: true,
      news,
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