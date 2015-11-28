![Screenshot](https://raw.github.com/frosas/lag/master/screenshot.png)

# Development

```bash
$ npm i
$ bin/server
```

Open http://localhost:5000

# TODO

- Consider using WebSockets to reduce latency and processor overhead
- When no pings are ponged the current lag (number) is wrong
- Testing
- Consider using http://w3c.github.io/netinfo/
- Ping from another thread (use a Web Worker) to avoid altered values when the 
  computer slows down.
- Don't cancel all the requests after a while but leave a sample of them to be 
  able to report a real lag.
