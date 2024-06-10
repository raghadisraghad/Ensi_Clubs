const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')
const UserRoutes = require("./routes/userRoutes")
const ClubRoutes = require("./routes/clubRoutes")
const CommentsRoutes = require("./routes/commentsRoutes")
const EventsRoutes = require("./routes/eventsRoute")
const MembersRoutes = require("./routes/membersRoutes")

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

//DB Connection
mongoose.connect('mongodb://admin:admin@localhost:27017/ensi?authsource=admin')
const db = mongoose.connection;
db.once("open",()=>{
  console.log("Connected to db")
})
//---------------------//


//-----Routes-----//
app.use(UserRoutes)
app.use(ClubRoutes)
app.use(MembersRoutes)
app.use(EventsRoutes)
app.use(CommentsRoutes)
//-----------------//

app.listen(port,()=>{
  console.log("listening on port ",port)
})