const router = require('express').Router();
const Op = require("sequelize").Op;

const { Category } = require('../../config/database');

router.get("/", async (req, res) => {
  const name = req.query.name;
  const condition = name ? {name: { [Op.like]: `%${name}%`} } : null;
  
  const categories = await Category.findAll({ where: condition});

  res.json(categories);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findOne({ where: { id: req.params.id } });
  res.json(category);
});

router.post('/', async (req,res) => {
  if (req.body.isIncome == 'on') {
    req.body.isIncome = 1;
  }
  const category = await Category.create(req.body);
  res.json(category);
});

router.put('/:categoryid', async (req,res) => {
  if (req.body.isIncome == 'on') {
    req.body.isIncome = 1;
  }

  await Category.update(req.body, {
    where: {id: req.params.categoryid}
  });
  res.json({success: "Category Updated"});
});

router.delete('/:categoryid', async (req,res) => {
  await Category.destroy({
    where: {id: req.params.categoryid}
  });
  res.json({success: "Category Deleted"});
});

module.exports = router;
