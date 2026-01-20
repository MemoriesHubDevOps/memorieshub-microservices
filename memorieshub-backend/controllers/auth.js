const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// Tempory user db
const users = [{
  id: 1,
  email: "test@mail.com",
  password: bcrypt.hashSync("test")
}]

exports.login = async (req, res) => {
  const { email, password } = req.body;
  // const user = await User.findByEmail(email);
  const user = users.find(u => u.email == email)
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id }, process.env.EXPRESS_JWT_SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
};

exports.verifyToken = async (req, res) => {
  res.status(200).send({message: 'Token provided is valid !'});
};