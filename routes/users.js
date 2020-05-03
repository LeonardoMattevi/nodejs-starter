const express = require("express");
const router = express.Router();
const { logger } = require('../core/logger');
const { ADMIN, BASE } = require('../core/roles');
const authProvider = require("../middleware/authProvider");
const usersService = require("../services/usersService");
const validators = require("../store/validators");

router.get("/", authProvider([ADMIN, BASE]), async (req, res) => {
  logger.info("You get all users!");
  let result = await usersService.getUsers();
  res.send(result);
});
router.get("/:id", authProvider([ADMIN, BASE]), async (req, res) => {
  let result = await usersService.getUser(req.params.id);
  if(!result)
    throw ({ httpCode: 404, message: "The user with the given ID was not founded."});
    
  res.send(result);
});
router.post("/", authProvider([ADMIN]), async (req, res) => {
  const { error } = validators.validateUser(req.body);
  if (error) 
    throw ({ httpCode: 400, message: error.details[0].message});
  
  let result = await usersService.createUser(req.body);
  res.send(result);
});
router.put("/:id", authProvider([ADMIN]), async (req, res) => {
  let result = await usersService.getUser(req.params.id);
  if (!result)
    throw ({ httpCode: 404, message: "The user with the given ID was not founded."});

  const { error } = validators.validateUser(req.body);
  if (error)
    throw ({ httpCode: 400, message: error.details[0].message});

  result = await usersService.updateUser(req.params.id, req.body);
  res.send(result);
});
router.delete("/:id", authProvider([ADMIN]), async (req, res) => {
  let result = await usersService.getUser(req.params.id);
  if (!result)
    throw ({ httpCode: 404, message: "The user with the given ID was not founded." });

  result = await usersService.deleteUser(req.params.id);
  res.send(result);
});
module.exports = router;
