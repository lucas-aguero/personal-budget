const router = require("express").Router();
const Op = require("sequelize").Op;

const { Transaction } = require('../../config/database');

router.get("/", async (req, res) => {
  const detail = req.query.detail;
  const condition = detail ? {detail: { [Op.like]: `%${detail}%`} } : null;
  
  const transactions = await Transaction.findAll({ where: condition});

  res.json(transactions);
});

router.get("/:id", async (req, res) => {
  const transaction = await Transaction.findOne({ where: { id: req.params.id } });
  res.json(transaction);
});


router.post('/', async (req,res) => {
  if (req.body.isIncome == 'on') {
    req.body.isIncome = 1;
  }

  const transaction = await Transaction.create(req.body);
  res.json(transaction);
});

router.put('/:transactionid', async (req,res) => {
  if (req.body.isIncome == 'on') {
    req.body.isIncome = 1;
  }

  await Transaction.update(req.body, {
    where: {id: req.params.transactionid}
  });
  res.json({success: "Transaction Updated"});
});

router.delete('/:transactionid', async (req,res) => {
  await Transaction.destroy({
    where: {id: req.params.transactionid}
  });
  res.json({success: "Transaction Deleted"});
});

module.exports = router;
