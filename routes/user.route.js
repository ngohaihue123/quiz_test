const router = require('express').Router(),
    userController = require('../controllers/user.controller');
router.get("/allUser", userController.getAllByClass);
router.post('/add', userController.createUser);
router.put("/update", userController.updateUser);
router.delete("/:id", userController.deleteById)
router.get("/", userController.getById)
module.exports = router