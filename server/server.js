const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

// App
const app = express();
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log("## DATABASE CONNECTED ##");
  } catch (error) {
    console.log("DB Connection Err", error);
  }
};
dbConnect();
// Middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(cors());

// route
fs.readdirSync("./routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);

// PORT
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is Runing on http://localhost:${port}`);
});
