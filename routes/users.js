const Joi = require("joi"); // to validate objects schema
const express = require("express");
const router = express.Router();

const usersService = require("../services/usersService");

router.get("/", (req, res) => {
  usersService
    .getUsers()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      return res.status(500).send("Server Error: " + err.message);
    });
});
router.get("/:id", (req, res) => {
  usersService
    .getUser(req.params.id)
    .then(result => {
      if (!result)
        return res
          .status(404)
          .send("The user with the given ID was not founded.");
      res.send(result);
    })
    .catch(err => {
      return res.status(500).send("Server Error: " + err.message);
    });
});
router.post("/", (req, res) => {
  const { error } = this.validateUser(req.body); // like result.error
  if (error) return res.status(400).send(error.details[0].message);

  usersService
    .createUser(req.body)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      return res.status(500).send("Create Error: " + err.message);
    });
});
router.put("/:id", (req, res) => {
  usersService
    .getUser(req.params.id)
    .then(result => {
      if (!result)
        return res.status(404).send("The user with the given ID was not founded.");
      const { error } = this.validateUser(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      usersService
        .updateUser(req.params.id, req.body)
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          return res.status(500).send("Update Error: " + err.message);
        });
    })
    .catch(err => {
      return res.status(500).send("Server Error: " + err.message);
    });
});
router.delete("/:id", (req, res) => {
  usersService
    .getUser(req.params.id)
    .then(result => {
      if (!result)
        return res.status(404).send("The user with the given ID was not founded.");

      usersService
        .deleteUser(req.params.id)
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          return res.status(500).send("Delete Error: " + err.message);
        });
      res.send(result);
    })
    .catch(err => {
      return res.status(500).send("Server Error: " + err.message);
    });
});
this.validateUser = function (user) {
  const userValidator = {
    firstName: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required()
  };
  return Joi.validate(user, userValidator);
}
module.exports = router;
