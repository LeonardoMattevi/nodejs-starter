/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const config = __webpack_require__(/*! config */ \"config\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst port = process.env.PORT || 3000;\n\nconst helmet = __webpack_require__(/*! helmet */ \"helmet\");\n\n__webpack_require__(/*! express-async-errors */ \"express-async-errors\");\nconst morgan = __webpack_require__(/*! morgan */ \"morgan\");\nconst express = __webpack_require__(/*! express */ \"express\");\nconst app = express();\n\napp.use(express.json());\napp.use(express.urlencoded({ extended: true }));\napp.set('views', path.join(__dirname, 'views'));\napp.set('view engine', 'ejs');\n\nif (config.enableAccessLogs) {\n  app.use(morgan('tiny'));\n}\napp.use(helmet());\napp.use(express.static('public'));\n\n__webpack_require__(/*! ./routes/index */ \"./routes/index.js\")(app);\n\napp.listen(port, () => {\n  console.log(`listening on port ${port}...`);\n});\n\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./core/logger.js":
/*!************************!*\
  !*** ./core/logger.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { createLogger, transports, format } = __webpack_require__(/*! winston */ \"winston\");\n\nconst transportError = [\n  new transports.File({\n    level: 'info',\n    filename: 'logs/winston/errors.log',\n    maxsize: 30000000, // 30MB\n    tailable: true,\n    maxFiles: 3,\n  }),\n  new transports.Console({\n    format: format.simple(),\n  }),\n];\nconst transportInfo = [\n  new transports.File({\n    level: 'info',\n    filename: 'logs/winston/info.log',\n    maxsize: 30000000, // 30MB\n    tailable: true,\n    maxFiles: 3,\n  }),\n  new transports.Console({\n    format: format.simple(),\n  }),\n];\nconst loggerError = createLogger({\n  format: format.combine(\n    format.printf(err => err.message),\n  ),\n  transports: transportError,\n});\nconst loggerInfo = createLogger({\n  format: format.combine(\n    format.printf(info => info.message),\n  ),\n  transports: transportInfo,\n});\n\nmodule.exports = {\n  logger: {\n    info(message) {\n      loggerInfo.info(message + ' | ' + new Date().toISOString());\n    },\n    error(err, url) {\n      loggerError.error(err.message, {\n        date: new Date().toLocaleString(),\n        statusCode: err.statusCode || '500',\n        url: url || '',\n        stack: err.stack,\n      });\n    },\n  },\n};\n\n\n//# sourceURL=webpack:///./core/logger.js?");

/***/ }),

/***/ "./core/roles.js":
/*!***********************!*\
  !*** ./core/roles.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const roles = {\n  ADMIN: 'ADMIN',\n  BASE: 'BASE',\n};\n\nmodule.exports = roles;\n\n\n//# sourceURL=webpack:///./core/roles.js?");

/***/ }),

/***/ "./middleware/authProvider.js":
/*!************************************!*\
  !*** ./middleware/authProvider.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const jwt = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\nconst { HttpError } = __webpack_require__(/*! ../models/errors */ \"./models/errors.js\");\n\nconst authentication = function () {\n  const JWT_KEY = ''; // insert here JWT key;\n\n  return function getUser(req, res, next) {\n    const token = req.headers['authorization'] || req.headers['x-access-token'];\n\n    req.authUser = null;\n    console.log('authentication...', token || 'unknow user');\n\n    if (token) {\n      try {\n        const decoded = jwt.verify(token, JWT_KEY);\n\n        req.authUser = { ...decoded, JWT: token };\n      } catch (err) {\n        throw new HttpError(err, 403);\n      }\n    }\n    next();\n  };\n};\nconst authorization = function (routeValidRoles) {\n  return function getAccess(req, res, next) {\n    if (!req.authUser) {\n      throw new HttpError('User is not authenticated.', 401);\n    }\n    if (!routeValidRoles.includes(req.authUser.roleName)) {\n      throw new HttpError('User does not have the right roles.', 401);\n    }\n    console.log('authorization...', routeValidRoles);\n    next();\n  };\n};\n\nmodule.exports = {\n  authentication, // who?\n  authorization, // check permissions?\n};\n\n\n//# sourceURL=webpack:///./middleware/authProvider.js?");

/***/ }),

/***/ "./middleware/midErrors.js":
/*!*********************************!*\
  !*** ./middleware/midErrors.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { createLogger, transports, format } = __webpack_require__(/*! winston */ \"winston\");\n\nconst transportErrors = [\n  new transports.File({\n    level: 'error',\n    filename: 'logs/winston/mid-errors.log',\n    maxsize: 30000000, // 30MB\n    tailable: true,\n    maxFiles: 3,\n  }),\n];\nconst loggerError = createLogger({\n  format: format.combine(\n    format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss:ms' }),\n    format.printf(err => { return `${JSON.stringify(err)},`; }),\n  ),\n  transports: transportErrors,\n});\n\nmodule.exports = {\n  errorMidLogger(err, req, res, next) {\n    loggerError.error(err.message, {\n      date: new Date().toLocaleString(),\n      statusCode: err.statusCode || '500',\n      url: req.url || '',\n      stack: err.stack,\n    });\n    res.status(err.statusCode || 500).send(err.message || err);\n    next();\n  },\n};\n\n\n//# sourceURL=webpack:///./middleware/midErrors.js?");

/***/ }),

/***/ "./models/errors.js":
/*!**************************!*\
  !*** ./models/errors.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class HttpError extends Error {\n  constructor(error, statusCode) {\n    super(typeof (error) === 'string' ? error : error.message);\n    this.statusCode = statusCode || 500;\n  }\n}\n\nmodule.exports = {\n  HttpError,\n};\n\n\n//# sourceURL=webpack:///./models/errors.js?");

/***/ }),

/***/ "./routes/home.js":
/*!************************!*\
  !*** ./routes/home.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\n\nrouter.get('/', async (req, res) => {\n  const viewModel = {\n    page: {\n      header: {\n        title: 'header title',\n      },\n      title: 'page title',\n      description: 'page description',\n      links: [{\n        url: 'https://www.google.it',\n        label: 'google link',\n        target: '_blank',\n      }, {\n        url: 'https://www.google.it?p=2',\n        label: 'google link2',\n        target: '_blank',\n      }],\n    },\n  };\n\n  res.render('home', viewModel);\n});\nmodule.exports = router;\n\n\n//# sourceURL=webpack:///./routes/home.js?");

/***/ }),

/***/ "./routes/index.js":
/*!*************************!*\
  !*** ./routes/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const usersRoute = __webpack_require__(/*! ../routes/users */ \"./routes/users.js\");\nconst homeRoute = __webpack_require__(/*! ../routes/home */ \"./routes/home.js\");\nconst { errorMidLogger } = __webpack_require__(/*! ../middleware/midErrors */ \"./middleware/midErrors.js\");\n\nmodule.exports = function (app) {\n  app.use('/api/users', usersRoute);\n  app.use('/', homeRoute);\n\n  app.use(errorMidLogger);\n};\n\n\n//# sourceURL=webpack:///./routes/index.js?");

/***/ }),

/***/ "./routes/users.js":
/*!*************************!*\
  !*** ./routes/users.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst router = express.Router();\nconst { logger } = __webpack_require__(/*! ../core/logger */ \"./core/logger.js\");\nconst { ADMIN, BASE } = __webpack_require__(/*! ../core/roles */ \"./core/roles.js\");\nconst { authentication, authorization } = __webpack_require__(/*! ../middleware/authProvider */ \"./middleware/authProvider.js\");\nconst usersService = __webpack_require__(/*! ../services/usersService */ \"./services/usersService.js\");\nconst { validateCreateUser, validateEditUser } = __webpack_require__(/*! ../store/validators */ \"./store/validators.js\");\nconst { HttpError } = __webpack_require__(/*! ../models/errors */ \"./models/errors.js\");\n\nrouter.get('/', authentication(), authorization([ADMIN, BASE]), async (req, res) => {\n  logger.info('You get all users!');\n  const result = await usersService.getUsers();\n\n  res.send(result);\n});\nrouter.get('/:id', authentication(), authorization([ADMIN, BASE]), async (req, res) => {\n  const result = await usersService.getUser(req.params.id);\n\n  if (!result) {throw new HttpError('The user not found.', 404);}\n\n  res.send(result);\n});\nrouter.post('/', authentication(), authorization([ADMIN]), async (req, res) => {\n  const { error } = validateCreateUser(req.body);\n\n  if (error) {throw new HttpError(error.details[0].message, 400);}\n\n  const result = await usersService.createUser(req.body);\n\n  res.send(result);\n});\nrouter.put('/:id', authentication(), authorization([ADMIN]), async (req, res) => {\n  const { error } = validateEditUser(req.body);\n\n  if (error) {throw new HttpError(error.details[0].message, 400);}\n\n  if (req.body._id !== req.params.id) {throw new HttpError('The body _id does not match with URL ID', 400);}\n\n  let result = await usersService.getUser(req.params.id);\n\n  if (!result) {throw new HttpError('The user not found.', 404);}\n\n  result = await usersService.updateUser(req.params.id, req.body);\n  if (result.ok) {result = await usersService.getUser(req.params.id);}\n  res.send(result);\n});\nrouter.delete('/:id', authentication(), authorization([ADMIN]), async (req, res) => {\n  let result = await usersService.getUser(req.params.id);\n\n  if (!result) {throw new HttpError('The user not found.', 404);}\n\n  result = await usersService.deleteUser(req.params.id);\n  res.send(result);\n});\nmodule.exports = router;\n\n\n//# sourceURL=webpack:///./routes/users.js?");

/***/ }),

/***/ "./services/usersService.js":
/*!**********************************!*\
  !*** ./services/usersService.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst dbContext = __webpack_require__(/*! ../store/dbContext */ \"./store/dbContext.js\");\n\nclass UsersService {\n  constructor() { }\n  async getUsers() {\n    return await dbContext.User.find()\n      // .find({ price: { $gte: 10 } })\n      // .find({ price: { $in: [10, 15, 20] } })\n      // .or([ { price: { $in: [10, 15, 20] } }, { price: null } ])\n      // .and([ { price: { $in: [10, 15, 20] } }, { price: null } ])\n      // .find()\n      // .sort({ name: 1 })\n      // .select({ name: 1, tags: 1 })\n      .limit(10);\n  }\n  async getUser(id) {\n    return await dbContext.User.findOne({ _id: id });\n  }\n  async createUser(user) {\n    user.creationDate = Date.now();\n    const _user = new dbContext.User(user);\n\n    return await _user.save();\n  }\n  async updateUser(id, user) {\n    user.modificationDate = Date.now();\n    return await dbContext.User.updateOne({ _id: id }, user);\n  }\n  async deleteUser(id) {\n    return await dbContext.User.deleteOne({ _id: id });\n  }\n}\nmodule.exports = new UsersService();\n\n\n//# sourceURL=webpack:///./services/usersService.js?");

/***/ }),

/***/ "./store/dbContext.js":
/*!****************************!*\
  !*** ./store/dbContext.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst config = __webpack_require__(/*! config */ \"config\");\n\nconst connectionString = config.mongodbConnectionString || 'mongodb://localhost/';\n\nconsole.log(connectionString);\nconst dbName = 'AuthProvider';\n\n// mongoose.connection.readyState:\n// 0: disconnected\n// 1: connected\n// 2: connecting\n// 3: disconnecting\nconst db = mongoose.connection;\n\ndb.on('connecting', function () {\n  console.log('connecting to MongoDB...');\n});\ndb.on('error', function (error) {\n  console.log('Error in MongoDb connection: ' + error);\n});\ndb.on('connected', function () {\n  console.log('MongoDB connected!');\n});\ndb.once('open', function () {\n  console.log('MongoDB connection opened!');\n});\ndb.on('reconnected', function () {\n  console.log('MongoDB reconnected!');\n});\ndb.on('disconnected', function () {\n  console.log('MongoDB disconnected!');\n});\n\nmongoose.connect(connectionString + dbName, {\n  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect\n  reconnectInterval: 5000, // Reconnect every 5000ms\n  useNewUrlParser: true,\n});\n\n// schemas\nconst userSchema = new mongoose.Schema({\n  firstName: String,\n  lastName: String,\n  email: String,\n  isActive: Boolean,\n  modificationDate: { type: Date, default: null },\n  creationDate: { type: Date },\n});\nconst User = mongoose.model('User', userSchema, 'users');\n// model\n\nmodule.exports = {\n  User,\n};\n\n\n//# sourceURL=webpack:///./store/dbContext.js?");

/***/ }),

/***/ "./store/validators.js":
/*!*****************************!*\
  !*** ./store/validators.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Joi = __webpack_require__(/*! joi */ \"joi\");\n\nexports.validateCreateUser = function (user) {\n  const userValidator = {\n    firstName: Joi.string().min(3).required(),\n    lastName: Joi.string().min(3).required(),\n    email: Joi.string().email({ minDomainAtoms: 2 }).required(),\n    isActive: Joi.bool(),\n  };\n\n  return Joi.validate(user, userValidator);\n};\nexports.validateEditUser = function (user) {\n  const userValidator = {\n    _id: Joi.string().length(24).required(),\n    firstName: Joi.string().min(3).required(),\n    lastName: Joi.string().min(3).required(),\n    email: Joi.string().email({ minDomainAtoms: 2 }).required(),\n    isActive: Joi.bool(),\n  };\n\n  return Joi.validate(user, userValidator);\n};\n\n\n//# sourceURL=webpack:///./store/validators.js?");

/***/ }),

/***/ "config":
/*!*************************!*\
  !*** external "config" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"config\");\n\n//# sourceURL=webpack:///external_%22config%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-async-errors":
/*!***************************************!*\
  !*** external "express-async-errors" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-async-errors\");\n\n//# sourceURL=webpack:///external_%22express-async-errors%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"joi\");\n\n//# sourceURL=webpack:///external_%22joi%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mongoose\");\n\n//# sourceURL=webpack:///external_%22mongoose%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"winston\");\n\n//# sourceURL=webpack:///external_%22winston%22?");

/***/ })

/******/ });