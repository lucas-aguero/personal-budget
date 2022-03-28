const router = require('express').Router();

const middlewares = require('../middlewares/middlewares');

const apiRouterCategories = require("./api/categories");
const apiRouterTransactions = require('./api/transactions');
const apiRouterUsers = require('./api/users');

router.use("/categories", middlewares.checkToken, apiRouterCategories);
router.use('/transactions', middlewares.checkToken, apiRouterTransactions);
router.use('/users', apiRouterUsers);

module.exports = router;
