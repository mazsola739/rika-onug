import { IncomingMessage, ServerResponse } from 'http';
import { createRoom } from "../controllers/gameController";

export const handleRequest = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url === '/createRoom' && req.method === 'POST') {
    let body: Buffer[] = [];
    req.on('data', (chunk: Buffer) => {
      body.push(chunk);
    });
    req.on('end', () => {
      try {
        const selectedCardIds: number[] = JSON.parse(Buffer.concat(body).toString());
        const room = createRoom(selectedCardIds);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(room));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid data' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
};
