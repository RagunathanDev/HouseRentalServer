const express = require("express"); //Express framework import
const mongoose = require("mongoose"); //Mongoose DB import
require("dotenv/config"); //ENVIRONMENT SECURITY CREDENTIALS (PERSONAL) get (.env)
const app = express(); // Involk the express framework
//Import ROUTES
//const postRoutes = require("./routes/posts");
const userRoutes = require("./Router/User");
const houseDetailRoutes = require("./Router/HouseDetails");

//Middleware
app.use(express.json());

app.use("/user", userRoutes);

app.use("/owner", houseDetailRoutes);

//app.use("/posts", postRoutes);

app.get("/ragu", (req, res) => {
  res.send("Hello RAGU, Welcome to REST_API");
});

// app.post("/user", (req, res) => {
//   res.set("Access-Control-Allow-Origin", "*");
//   console.log(req.body.email);
//   res.send(req.body);
// });

//Connect to DB
// mongoose.connect(
//   process.env.DB_CONNECTION,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   () => console.log("Connected To DB")
// );
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err);
    else console.log("mongodb is connected");
  }
);

app.listen(process.env.PORT, () =>
  console.log(`Server up and run ${process.env.PORT}!`)
);
