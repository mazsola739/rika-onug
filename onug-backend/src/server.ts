import { IncomingMessage, ServerResponse } from "http";

const http = require('http');

const PORT = 7000;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.writeHead(200);
    res.end('Welcome to the One Night Ultimate Werewolf Game Backend!');
  } else {
    res.writeHead(404);
    res.end('404 Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
