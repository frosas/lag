const express = require("express");
const compression = require("compression");
const debug = require("debug")("app:http");

const app = express();

app.use(compression());

app.use((req, res, next) => {
  if (req.query.v) {
    const aLongTime = 1 /* year */ * 365 * 24 * 60 * 60;
    res.append("Cache-Control", `max-age=${aLongTime}, 1`);
  }
  if (req.path == "/scripts/service-worker.js")
    res.append("Service-Worker-Allowed", "/");
  next();
});

app.use(express.static(`${__dirname}/../../dist`));

app.get("/pong", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.end();
});

const httpPort = process.env.PORT || 80;
app.listen(httpPort);
debug(`Listening on http://localhost:${httpPort}`);
