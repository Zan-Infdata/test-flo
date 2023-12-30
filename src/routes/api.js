const express = require("express");
const router = express.Router();

  

const ctrlUsers = require("../controllers/user");
const ctrlDrinks = require("../controllers/drink");
const ctrlAdmin = require("../controllers/admin");



/**
 * Users
 */
router.get('/user/list', ctrlUsers.getSyUserList);
router.get('/user/drinklist', ctrlUsers.getSyUserDrinkList);
router.get('/user/show', ctrlUsers.getSyUserByUUID);
router.get('/user', ctrlUsers.getSyUserById);
router.post('/user/add', ctrlUsers.addSyUser);
router.delete('/user/delete', ctrlUsers.deleteSyUser);

/**
 * Drinks
 */
router.get('/drink/list', ctrlDrinks.getTDrinkByUserId);
router.post('/drink/add', ctrlDrinks.addTDrink);


/**
 * Admin
 */
router.get('/reset', ctrlAdmin.resetDb);

module.exports = router;