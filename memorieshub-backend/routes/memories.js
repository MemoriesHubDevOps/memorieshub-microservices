const express = require('express');
const router = express.Router();
const { uploadMemory, getMemories } = require('../controllers/memories');
const { checkJwtToken } = require('../middlewares/auth');

router.post('/upload', checkJwtToken, uploadMemory);
router.get('/', checkJwtToken, getMemories)

module.exports = router;