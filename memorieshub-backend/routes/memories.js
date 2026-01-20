const express = require('express');
const router = express.Router();
const { uploadMemory } = require('../controllers/memories');
const { checkJwtToken } = require('../middlewares/auth')

router.post('/upload', checkJwtToken, uploadMemory);

module.exports = router;