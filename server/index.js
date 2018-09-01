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
const helmet = require('helmet')

const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';
const CLIENT_BUILD_PATH = path.join(__dirname, '../client/build');

const app = express();
app.use(express.static(CLIENT_BUILD_PATH));
app.use(compression());
const server = http.Server(app);

// Setup middleware
app.use(helmet())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", auth);
app.use("/api/signup", signup);
app.use("/", users);
app.use("/", challengeRoutes);
app.use("/", databaseRoutes);

app.set("port", process.env.PORT || PORT);

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
});

const io = (module.exports.io = socket(server));
const ioGame = (module.exports.ioGame = io.of("/game"));

const socketManager = require("./sockets/socketManager").io;
const gameSocketManager = require("./sockets/gameSocketManager").ioGame;

io.on("connection", socketManager);
ioGame.on("connection", gameSocketManager);

server.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

module.exports = app;
