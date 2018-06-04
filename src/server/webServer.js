const express = require("express");
const compression = require("compression");
const debug = require("debug")("app:http");

const A_LONG_TIME = 1 /* year */ * 365 * 24 * 60 * 60;

const app = express();

app.use(compression());

app.use((req, res, next) => {
  if (req.query.v) {
    res.append("Cache-Control", `max-age=${A_LONG_TIME}`);
  }
  if (req.path == "/scripts/service-worker.js") {
    res.append("Service-Worker-Allowed", "/");
    res.append("Cache-Control", "max-age=0"); // See https://developers.google.com/web/updates/2018/06/fresher-sw
  }
  next();
});

app.use(express.static(`${__dirname}/../../dist/browser`));

const httpPort = process.env.PORT || 80;
app.listen(httpPort);
debug(`Listening on http://localhost:${httpPort}`);
