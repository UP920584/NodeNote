// Initialising imports

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo').default;

require('dotenv').config()

const PORT = process.env.PORT || 3002
const DB = process.env.DB_URI
const SECRET = process.env.SESSION_SECRET

const app = express();
const router = express.Router();
const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('trust proxy', 1) 
app.use(cookieParser());

app.use(session({
  secret: SECRET,
  resave: false, 
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: DB }),
}))

mongoose
  .connect(
    DB,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

app.use('/api', require('./api/index'));

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));