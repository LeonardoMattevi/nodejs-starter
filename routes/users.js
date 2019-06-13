const express = require("express");
const router = express.Router();

const usersService = require("../services/usersService");
const validators = require("../store/validators");

router.get("/", async (req, res) => {
  let result = null;
  
  try {
    result = await usersService.getUsers();
    res.send(result);
  } catch (err) {
    res.status(err.httpCode || 500).send("Server Error: " + err.message);
  }
});
router.get("/:id", async (req, res) => {
  let result = null;
  try {
    result = await usersService.getUser(req.params.id);
    if(!result)
      throw ({ httpCode: 404, message: "The user with the given ID was not founded."});
      
    res.send(result);
  } catch (err) {
    res.status(err.httpCode || 500).send("Server Error: " + err.message);
  }
});
router.post("/", async (req, res) => {
  let result = null;
  try {
    const { error } = validators.validateUser(req.body);
    if (error) 
      throw ({ httpCode: 400, message: error.details[0].message});
    
    result = await usersService.createUser(req.body);
    res.send(result);
  } catch(err) {
    return res.status(err.httpCode || 500).send("Create Error: " + err.message);
  }
});
router.put("/:id", async (req, res) => {
  let result = null;
  try {
    result = await usersService.getUser(req.params.id);
    if (!result)
      throw ({ httpCode: 404, message: "The user with the given ID was not founded."});

    const { error } = validators.validateUser(req.body);
    if (error)
      throw ({ httpCode: 400, message: error.details[0].message});

    result = await usersService.updateUser(req.params.id, req.body);
    res.send(result);
  } catch(err) {
    return res.status(err.httpCode || 500).send("Server Error: " + err.message);
  }
});
router.delete("/:id", async (req, res) => {
  let result = null;
  try{
    result = await usersService.getUser(req.params.id);
    if (!result)
      throw ({ httpCode: 404, message: "The user with the given ID was not founded." });

    result = await usersService.deleteUser(req.params.id);
    res.send(result);
  } catch(err) {
      return res.status(err.httpCode || 500).send("Server Error: " + err.message);
  }
});
module.exports = router;
