const express = require("express");
const compression = require("compression");
const debug = require("debug")("app:http");

const A_LONG_TIME = 1 /* year */ * 365 * 24 * 60 * 60;

const app = express();

app.use(compression());

app.use((req, res, next) => {
  if (req.query.v) {
    res.append("Cache-Control", `max-age=${A_LONG_TIME}, 1`);
  }
  if (req.path == "/scripts/service-worker.js")
    res.append("Service-Worker-Allowed", "/");
  next();
});

app.use(express.static(`${__dirname}/../../dist`));

app.get("/pong", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  // Reference
  // - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
  // - https://support.cloudflare.com/hc/en-us/articles/202775670-How-Do-I-Tell-Cloudflare-What-to-Cache-
  res.header(
    "Cache-Control",
    [
      "max-age=0", // Clients to not cache
      "public", // Ensure proxies cache
      `s-maxage=${A_LONG_TIME}` // Proxies to cache forever
    ].join(", ")
  );
  res.end();
});

const httpPort = process.env.PORT || 80;
app.listen(httpPort);
debug(`Listening on http://localhost:${httpPort}`);
