require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes1 = require('./routes');
const routes2 = require('./routes/registerRoutes');
// instatiate express
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3003;

// cross-origin request security (CORS) 
// prevents requests to unauthorized domains
// accept requests from the client
app.use(cors({
  origin: CLIENT_ORIGIN
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve up static assets (usually on Heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
};

// add routes
app.use(routes1);
app.use(routes2);

// connect to MongoDB remotely or locally
const MONGODB_URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds127260.mlab.com:27260/heroku_zpz7kd01`
console.log(MONGODB_URI)
mongoose.connect("mongodb://localhost/ProjectThree", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});

// invoke server
app.listen(PORT, error => {
    if (error) throw (error)
    console.log(`🌎 ==> API Server now listening on PORT http://localhost:${PORT}`);
});