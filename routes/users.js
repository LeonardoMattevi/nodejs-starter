const express = require("express");
const router = express.Router();

const usersService = require("../services/usersService");

//cs.CreateUser().then((result) => {
/* usersService.GetUsers()
        .then((result)=>{
            console.log('users: ' + result);
        });*/
//});

// let myId = '5ad8a363c4a9d93ae01d2e21';
// GetUser(myId)
// .then((result)=>{
//     console.log('this user: ' + result);
// });

router.get("/", (req, res) => {
  usersService
    .GetUsers()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      return res.status(400).send("Server Error: " + err.message);
    });
});
router.get("/:id", (req, res) => {
  usersService
    .GetUser(req.params.id)
    .then(result => {
      if (!result)
        return res
          .status(404)
          .send("The user with the given ID was not founded.");
      res.send(result);
    })
    .catch(err => {
      return res.status(400).send("Server Error: " + err.message);
    });
});
router.post("/", (req, res) => {
  const { error } = validateUser(req.body); // like result.error
  if (error) return res.status(400).send(error.details[0].message);

  usersService
    .CreateUser(req.body)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      return res.status(400).send("Create Error: " + err.message);
    });
});
router.put("/:id", (req, res) => {
  const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user)
    return res.status(404).send("The user with the given ID was not founded.");

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  usersService
    .UpdateUser(req.params.id, req.body)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      return res.status(400).send("Update Error: " + err.message);
    });
});
router.delete("/:id", (req, res) => {
  const user = users.find(c => c.id === parseInt(req.params.id));
  if (!user)
    return res.status(404).send("The user with the given ID was not founded.");

  usersService
    .DeleteUser(req.params.id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      return res.status(400).send("Delete Error: " + err.message);
    });
});

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(user, schema);
}

module.exports = router;
