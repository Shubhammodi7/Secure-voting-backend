const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
require('dotenv').config();

const connectToDb = require('./config/db');
connectToDb()

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoute = require('./routes/user.routes');
const candidateRoute = require('./routes/candidate.routes');
const voteRoute = require('./routes/vote.routes');

app.use('/api/v1/user', userRoute);
app.use('/api/v1/candidate', candidateRoute);
app.use('/api/v1/vote', voteRoute);


const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})