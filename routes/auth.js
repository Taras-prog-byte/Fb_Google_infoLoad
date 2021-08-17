const express = require('express');
const controller = require('../controllers/auth');
const router = express.Router();
const passport = require('passport')


//http://localhost:5000/api/auth/login
router.post('/login', controller.login);
//http://localhost:5000/api/auth/register
router.post('/register', controller.register);


//http://localhost:5000/api/auth/tokens
//, passport.authenticate('jwt', {session:false})
router.get('/tokens', passport.authenticate('jwt', {session:false}), controller.profile);

module.exports=router;