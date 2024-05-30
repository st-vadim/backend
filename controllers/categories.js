const sendAllCategories = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.categoriesArray));
};

// Controller send a new category
const sendCategoryCreated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.category));
};

// Function send category by id
const sendCategoryById = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.category));
};

// Function show result update category
const sendCategoryUpdated = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(JSON.stringify({ message: "Update category" }));
};

// Function show result delete category
const sendCategoryDeleted = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.category));
};

module.exports = {
  sendAllCategories,
  sendCategoryCreated,
  sendCategoryById,
  sendCategoryUpdated,
  sendCategoryDeleted
};
