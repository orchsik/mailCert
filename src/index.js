require("dotenv").config();
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const api = require("./api");

const env = process.env.NODE_ENV || "development";
const httpPort = 3000;
const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api", api);

app.use("/api", (req, res) => {
  res.status(404).json({ error: "NULL" });
});

app.get("*", function (req, res) {
  res.send("404");
});

// http port listening
http.createServer(app).listen(httpPort, () => {
  console.log("Express HTTP server listening on port " + httpPort);
});
