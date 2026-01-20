const express = require('express')
const cors = require('cors')
const multer  = require('multer')
const path = require('path')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();

const port = process.env.EXPRESS_PORT

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Multer configuration for pictures storage
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


// Tempory user db
const users = [{
  id: 1,
  email: "test@mail.com",
  password: bcrypt.hashSync("test")
}]


// Routes

/* Authentication */
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(403).send({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.EXPRESS_JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    req.userId = decoded.id;
    next();
  });
};


app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.EXPRESS_JWT_SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.get('/api/auth/verify-token', verifyToken, (req, res) => {
  res.status(200).send({message: 'Token provided is valid !'});
})


/* Files management */
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send(req.file.path);
});

app.listen(port, () => {
  console.log(`MemoriesHub Backend listening on port ${port}`)
})