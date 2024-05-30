const categories = require("../models/category");

const findAllCategories = async (req, res, next) => {
  req.categoriesArray = await categories.find({});
  next();
};

// Create new category
const createCategory = async (req, res, next) => {
  console.log("POST /categories");
  try {
    console.log(req.body);
    req.category = await categories.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send({ message: "Error create new category" });
  }
};

// Search category by id
const findCategoryById = async (req, res, next) => {
  try {
    req.category = await categories.findById(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.statusCode(404).send(JSON.stringify({ message: "Category not found" }));
  }
};

// Update category data
const updateCategory = async (req, res, next) => {
  try {
    req.category = await categories.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .statusCode(400)
      .send(JSON.stringify({ message: "Error update category" }));
  }
};

// Delete category by id
const deleteCategory = async (req, res, next) => {
  try {
    res.category = await categories.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .statusCode(400)
      .send(JSON.stringify({ message: "Error delete category" }));
  }
};

// Check is category
const checkIsCategoryExists = async (req, res, next) => {
  const isInArray = req.categoriesArray.find((category) => {
    return req.body.name === category.name;
  });
  // If found a match
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res.statusCode(400).send(
      JSON.stringify({
        message: "A category with that name already exists",
      })
    );
  } else {
    next();
  }
};

// Check input name is empty
const checkEmptyName = async (req, res, next) => {
  if (!req.body.name) {
    res.setHeader("Content-Type", "application/json");
    res
      .statusCode(400)
      .send(JSON.stringify({ message: "Enter the name of the category" }));
  } else {
    next();
  }
};

module.exports = {
  findAllCategories,
  createCategory,
  findCategoryById,
  updateCategory,
  deleteCategory,
  checkIsCategoryExists,
  checkEmptyName,
};
