// const express = require("express");
// const app = express();

const app = require("./app");
const connectDatabase = require("./db/Database");
const PORT = 8080;

app.get("/api/home", (req, res) => {
  res.json({ message: "Watagawan Mi Hombre!" });
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env"
  })
}

// connect db
connectDatabase();

app.listen(PORT, () => {
  console.log(`🚀 App listening on port ${PORT}!`);
});
