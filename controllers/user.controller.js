const userService = require('../services/user.service');
module.exports.createUser = (req, res, next) => {
    userService.add(req.body)
        .then(rs => res.json(rs))
        .catch((err) => next(err));
}
module.exports.updateUser = (req, res, next) => {
    userService.update(req.body)
        .then(rs => res.json(rs))
        .catch((err) => next(err));
}
module.exports.getAllByClass = (req, res, next) => {
    let criteria = {
        searchText: req.query.searchText,
        itemPerPage: parseInt(req.query.itemPerPage),
        currentPage: parseInt(req.query.currentPage)
    };
    studentClass = req.query.class;
    userService.getAllByClass(criteria, studentClass)
        .then(rs => res.json(rs))
        .catch((err) => next(err));
}
module.exports.deleteById = (req, res, next) => {
    userService.deleteById(req.params.id)
        .then(rs => res.json(rs))
        .catch((err) => next(err));
}
module.exports.getById = (req, res, next) => {
    userService.getById(req.query.id)
        .then(rs => res.json(rs))
        .catch((err) => next(err));
}

