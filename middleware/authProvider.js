module.exports = function authProvider(validRoles) {
    return function auth(req, res, next){
        console.log('Authenticating...', validRoles);
        next();
    }
};