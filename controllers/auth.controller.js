const authService = require('../services/auth.service');
module.exports.login = (req, res, next) => {

    authService.login(req.body.gmail, req.body.password, req.body.type).then(user => {
        console.log(user);
        res.json(user);
    }).catch(err => next(err));
}