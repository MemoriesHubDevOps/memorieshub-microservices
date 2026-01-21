const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id }, process.env.EXPRESS_JWT_SECRET_KEY, { expiresIn: '1h' });
  res.json({ user, token });
};

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (user) {
    return res.status(403).json({ error: `User with email ${email} already exists.`});
  }

  const newUser = await User.create({name, email, password: bcrypt.hashSync(password)})
  const token = jwt.sign({ id: newUser.id }, process.env.EXPRESS_JWT_SECRET_KEY, { expiresIn: '1h' });
  res.json({ user: newUser, token });
};

exports.verifyToken = async (req, res) => {
  res.status(200).send({message: 'Token provided is valid !'});
};