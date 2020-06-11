const jwt = require('jsonwebtoken');
const { HttpError } = require("../models/errors");

const authentication = function () {
    const JWT_KEY = ""; // insert here JWT key;
    return function getUser(req, res, next) {
        let token = req.headers['authorization'] || req.headers['x-access-token']; 
        req.authUser = null;
        console.log('authentication...', token || 'unknow user');
        
        if(token) {
            try {
                decoded = jwt.verify(token, JWT_KEY);
                req.authUser = { ...decoded, JWT: token };
            } catch(err) {
                throw new HttpError(err, 403);
            }    
        }
        next();
    }
};
const authorization = function (routeValidRoles) {
    return function getAccess(req, res, next) {
        if(!req.authUser) {
            throw new HttpError("User is not authenticated.", 401);
        }
        if(!routeValideRoles.includes(req.authUser.roleName)) {
            throw new HttpError("User does not have the right roles.", 401);
        }
        console.log('authorization...', routeValidRoles);
        next();
    }
};
module.exports = {
    authentication, // who?
    authorization   // check permissions?
}