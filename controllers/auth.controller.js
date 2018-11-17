const authService = require('../services/auth.service');
module.exports.login = (req, res, next) => {

    authService.login(req.body.username, req.body.password).then(user => {
        res.json(user)
    }).catch(err => next(err));
}