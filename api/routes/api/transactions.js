const router = require("express").Router();

const { Transaction } = require('../../config/database');

router.get("/", async (req, res) => {
  const transactions = await Transaction.findAll();
  res.json(transactions);
});

router.post('/', async (req,res) => {
  const transaction = await Transaction.create(req.body);
  res.json(transaction);
});

router.put('/:transactionid', async (req,res) => {
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
