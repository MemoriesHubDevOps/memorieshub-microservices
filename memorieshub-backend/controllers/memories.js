const multer = require('multer')
const { Memory } = require('../models/')


// Multer configuration for pictures storage
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });


exports.uploadMemory = [
  upload.single('image'),
  async (req, res) => {
    
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    await Memory.create({user_id: req.userId, s3_url: `https://s3.aws.com/`})

    res.send(req.file.path);
  }
]

exports.getMemories = async (req, res) => {
  const memories = await Memory.findAll({ where : { user_id : req.userId }});
  res.json(memories);
}