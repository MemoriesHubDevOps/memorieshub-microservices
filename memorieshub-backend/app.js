const express = require('express')
const cors = require('cors')
const multer  = require('multer')
const path = require('path')

const app = express()
const port = 3300

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
  }
})

const upload = multer({ storage: storage })

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send(req.file.path);
});

app.listen(port, () => {
  console.log(`MemoriesHub Backend listening on port ${port}`)
})