const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs');
const authRoutes = require('./routes/auth');
const memoryRoutes = require('./routes/memories');


dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/memories', memoryRoutes);


app.listen(process.env.EXPRESS_PORT, () => {
  console.log(`MemoriesHub Backend listening on port ${process.env.EXPRESS_PORT}`)
})