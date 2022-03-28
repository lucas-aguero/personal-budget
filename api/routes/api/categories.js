const router = require('express').Router();

const { Category } = require('../../config/database');

router.get("/", async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
});

router.post('/', async (req,res) => {
  const category = await Category.create(req.body);
  res.json(category);
});

router.put('/:categoryid', async (req,res) => {
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
