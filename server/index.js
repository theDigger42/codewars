const express = require("express");
const compression = require("compression");
const http = require("http");
const socket = require("socket.io");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const auth = require("./routes/auth");
const signup = require("./routes/signup");
const users = require("./routes/users");
const challengeRoutes = require("./routes/challenge");
const databaseRoutes = require("./routes/database");

const app = express();
app.use(compression());
const server = http.Server(app);

// Setup middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../build"));
app.use(cors());

app.use("/api/auth", auth);
app.use("/api/signup", signup);
app.use("/", users);
app.use("/", challengeRoutes);
app.use("/", databaseRoutes);

app.set("port", process.env.PORT || 80);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

const io = (module.exports.io = socket(server));
const ioGame = (module.exports.ioGame = io.of("/game"));

const socketManager = require("./sockets/socketManager").io;
const gameSocketManager = require("./sockets/gameSocketManager").ioGame;

io.on("connection", socketManager);
ioGame.on("connection", gameSocketManager);

server.listen(app.get("port"), function() {
  console.log("Server started on port:" + app.get("port"));
});

module.exports = app;
