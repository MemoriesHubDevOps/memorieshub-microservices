const express = require('express');
const router = express.Router();
const { login, verifyToken, signup } = require('../controllers/auth');
const { checkJwtToken } = require('../middlewares/auth');

router.post('/login', login);
router.post('/signup', signup)
router.post('/verify-token', checkJwtToken, verifyToken);

module.exports = router;