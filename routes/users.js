const express = require("express");
const router = express.Router();
const { infoLogger } = require('../middleware/logger');

const usersService = require("../services/usersService");
const validators = require("../store/validators");

router.get("/", async (req, res) => {
  infoLogger("You get all users!");
  let result = await usersService.getUsers();
  res.send(result);
});
router.get("/:id", async (req, res) => {
  let result = await usersService.getUser(req.params.id);
  if(!result)
    throw ({ httpCode: 404, message: "The user with the given ID was not founded."});
    
  res.send(result);
});
router.post("/", async (req, res) => {
  const { error } = validators.validateUser(req.body);
  if (error) 
    throw ({ httpCode: 400, message: error.details[0].message});
  
  let result = await usersService.createUser(req.body);
  res.send(result);
});
router.put("/:id", async (req, res) => {
  let result = await usersService.getUser(req.params.id);
  if (!result)
    throw ({ httpCode: 404, message: "The user with the given ID was not founded."});

  const { error } = validators.validateUser(req.body);
  if (error)
    throw ({ httpCode: 400, message: error.details[0].message});

  result = await usersService.updateUser(req.params.id, req.body);
  res.send(result);
});
router.delete("/:id", async (req, res) => {
  let result = await usersService.getUser(req.params.id);
  if (!result)
    throw ({ httpCode: 404, message: "The user with the given ID was not founded." });

  result = await usersService.deleteUser(req.params.id);
  res.send(result);
});
module.exports = router;
