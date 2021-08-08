const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

//import routes
const authRoutes = require("./routes/auth");

// App
const app = express();
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });

    console.log("## DATABASE CONNECTED ##");
  } catch (error) {
    console.log("DB Connectio Err", error);
  }
};
dbConnect();
// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// route
app.use("/api", authRoutes);

// PORT
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is Runing on http://localhost:${port}`);
});
