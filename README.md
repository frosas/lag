![Screenshot](https://raw.github.com/frosas/lag/master/screenshot.png)

# Development

```bash
$ npm i
$ bin/dev
```

Open http://localhost:5000

# TODO

- Make favicon work on Firefox and Safari
- Consider using WebSockets to reduce latency and processor overhead
- Make it work offline (to start it without a connection)
  - http://www.html5rocks.com/en/tutorials/service-worker/introduction/
- When no pings are ponged the current lag (number) is wrong
- Testing
- Consider using http://w3c.github.io/netinfo/
- Do the pings in a Worker to improve accuracy?
- Ping from another thread (use a Web Worker) to avoid altered values when the 
  computer slows down.
- Don't cancel all the requests after a while but leave a sample of them to be 
  able to report a real lag.