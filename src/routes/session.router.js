const { Router } = require('express');
const usersModel = require('../dao/models/users.model');
const router = Router();
const crypto = require('crypto');
const passport = require('passport');
const {userLogin, perfil, register, logOut, passwordRecovery, passwordRecovery2} = require('../controller/users.controller')

const {auth, passportCall} = require('../utils')


router.post('/login', userLogin);
router.get('/perfil', passportCall('jwt'), auth, perfil);
router.post('/register', register);
router.get('/logout', logOut);
router.post('/recovery',passwordRecovery)
router.get('/recovery2',passwordRecovery2)

module.exports = router

