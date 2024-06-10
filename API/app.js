const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')
const UserRoutes = require("./routes/userRoutes")
const ClubRoutes = require("./routes/clubRoutes")
const CommentsRoutes = require("./routes/commentsRoutes")
const EventsRoutes = require("./routes/eventsRoute")
const MembersRoutes = require("./routes/membersRoutes")
const PvRoutes = require("./routes/pvRoutes")
const NotificationRoutes = require("./routes/notificationRoutes")
const Auth = require("./routes/auth")
const Club = require('./models/club');

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
app.use(PvRoutes)
app.use(NotificationRoutes)
app.use(Auth)
//-----------------//

app.listen(port,()=>{
  console.log("listening on port ",port)
})

// Cron job to check for expired events daily at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const clubs = await Club.find({});
    clubs.forEach(async (club) => {
      const expiredEvents = club.events.filter(event => new Date(event.date) < today);
      club.history.push(...expiredEvents);
      club.events = club.events.filter(event => new Date(event.date) >= today);
      await club.save();
    });

    console.log('Checked for expired events and moved them to history');
  } catch (error) {
    console.error('Error checking for expired events:', error);
  }
});