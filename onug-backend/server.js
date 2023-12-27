const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/api/gameRooms' && req.method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Get all game rooms' }));
  } else if (req.url === '/api/gameRooms' && req.method === 'POST') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Create a new game room' }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
