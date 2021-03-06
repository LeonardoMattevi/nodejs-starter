const express = require('express');
const router = express.Router();
const { logger } = require('../core/logger');
const { ADMIN, BASE } = require('../core/roles');
const { authentication, authorization } = require('../middleware/authProvider');
const usersService = require('../services/usersService');
const { validateCreateUser, validateEditUser } = require('../store/validators');
const { HttpError } = require('../models/errors');

router.get('/', authentication(), authorization([ADMIN, BASE]), async (req, res) => {
  logger.info('You get all users!');
  const result = await usersService.getUsers();

  res.send(result);
});
router.get('/:id', authentication(), authorization([ADMIN, BASE]), async (req, res) => {
  const result = await usersService.getUser(req.params.id);

  if (!result) {throw new HttpError('The user not found.', 404);}

  res.send(result);
});
router.post('/', authentication(), authorization([ADMIN]), async (req, res) => {
  const { error } = validateCreateUser(req.body);

  if (error) {throw new HttpError(error.details[0].message, 400);}

  const result = await usersService.createUser(req.body);

  res.send(result);
});
router.put('/:id', authentication(), authorization([ADMIN]), async (req, res) => {
  const { error } = validateEditUser(req.body);

  if (error) {throw new HttpError(error.details[0].message, 400);}

  if (req.body._id !== req.params.id) {throw new HttpError('The body _id does not match with URL ID', 400);}

  let result = await usersService.getUser(req.params.id);

  if (!result) {throw new HttpError('The user not found.', 404);}

  result = await usersService.updateUser(req.params.id, req.body);
  if (result.ok) {result = await usersService.getUser(req.params.id);}
  res.send(result);
});
router.delete('/:id', authentication(), authorization([ADMIN]), async (req, res) => {
  let result = await usersService.getUser(req.params.id);

  if (!result) {throw new HttpError('The user not found.', 404);}

  result = await usersService.deleteUser(req.params.id);
  res.send(result);
});
module.exports = router;
