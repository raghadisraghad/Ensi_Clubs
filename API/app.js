const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')
const UserRoutes = require("./routes/userRoutes")

const app = express();
const port = 3000;

// Cors configuration - Allows requests from localhost:4200
const corsOptions = {
  origin: "http://localhost",
  optionsSuccessStatus: 204,
  methods: "GET, POST, PUT, DELETE",
};

// Use cors middleware
app.use(cors(corsOptions));

// Use express.json() middleware to parse JSON bodies of requests
app.use(express.json());

mongoose.connect('mongodb://admin:admin@localhost:27017/ensi?authsource=admin')

const db = mongoose.connection;

db.once("open",()=>{
  console.log("Connected to db")
})

//USER - ROUTES//
app.use(UserRoutes)

app.listen(port,()=>{
  console.log("listening on port ",port)
})