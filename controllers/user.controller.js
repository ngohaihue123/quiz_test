const User = require('../models/user.model');
exports.test=function(req, res){
    res.send("Greeting from test contoller");

}
exports.create = function (req, res) {
    console.log("innit");
    // console.log(req);
    let user = new User(
        {
            name: req.body.name,
            gmail: req.body.gmail,
            password: req.body.password
        }
    );

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};