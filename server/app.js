const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/test", (req, res) => {
  res.send({ message: "Watagwan Mi Hombre!" });
});

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// import routes
const users = require("./controller/user");
const tempUsers = require("./controller/tempUser")
const teams = require("./controller/teams");
const tasks = require("./controller/tasks");
const drivers = require("./controller/drivers");
const mapMeta = require("./controller/mapMeta");
const notifications = require("./controller/notification");
const events = require("./controller/events");
const support = require("./controller/support");
const operator = require("./controller/operator");
const vehicle = require("./controller/vehicle");
const approvals = require("./controller/approvals");
const driversMapMeta = require("./controller/driversMapMeta");
const teamsMapMeta = require("./controller/teamsMapMeta");
const tasksMapMeta = require("./controller/tasksMapMeta");
const status = require("./controller/status")

app.use("/api/v1/task", tasks);
app.use("/api/v1/team", teams);
app.use("/api/v1/temp-user", tempUsers);
app.use("/api/v1/user", users);
app.use("/api/v1/driver", drivers);
app.use("/api/v1/notification", notifications);
app.use("/api/v1/event", events);
app.use("/api/v1/support", support);
app.use("/api/v1/operator", operator);
app.use("/api/v1/vehicle", vehicle);
app.use("/api/v1/approval", approvals);

app.use("/api/v1/team-map-meta", teamsMapMeta);
app.use("/api/v1/driver-map-meta", driversMapMeta);
app.use("/api/v1/task-map-meta", tasksMapMeta);

app.use("/api/v1/status", status);

module.exports = app;
