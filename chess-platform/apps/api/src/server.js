import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { Chess } from 'chess.js';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

const rooms = new Map();

function newRoom(id) {
  return {
    id,
    chess: new Chess(),
    players: new Set(),
    createdAt: Date.now(),
  };
}

function payload(room) {
  return {
    type: 'state',
    roomId: room.id,
    fen: room.chess.fen(),
    pgn: room.chess.pgn(),
    turn: room.chess.turn(),
    isGameOver: room.chess.isGameOver(),
    isCheck: room.chess.inCheck(),
    history: room.chess.history({ verbose: true }),
  };
}

function broadcast(room, msg) {
  const data = JSON.stringify(msg);
  for (const ws of room.players) {
    if (ws.readyState === 1) ws.send(data);
  }
}

app.get('/health', (_req, res) => res.json({ ok: true }));
app.get('/rooms/:roomId', (req, res) => {
  const room = rooms.get(req.params.roomId);
  if (!room) return res.status(404).json({ error: 'Room not found' });
  return res.json(payload(room));
});

const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/ws' });

wss.on('connection', (ws) => {
  ws.on('message', (raw) => {
    try {
      const msg = JSON.parse(raw.toString());
      if (msg.type === 'join') {
        const roomId = String(msg.roomId || '').trim();
        if (!roomId) {
          ws.send(JSON.stringify({ type: 'error', message: 'roomId required' }));
          return;
        }
        let room = rooms.get(roomId);
        if (!room) {
          room = newRoom(roomId);
          rooms.set(roomId, room);
        }
        room.players.add(ws);
        ws.roomId = roomId;
        ws.send(JSON.stringify(payload(room)));
        broadcast(room, { type: 'info', message: `Jugador conectado. Sala: ${roomId}` });
      }

      if (msg.type === 'move') {
        const roomId = ws.roomId;
        if (!roomId || !rooms.has(roomId)) return;
        const room = rooms.get(roomId);
        const move = room.chess.move({ from: msg.from, to: msg.to, promotion: msg.promotion || 'q' });
        if (!move) {
          ws.send(JSON.stringify({ type: 'error', message: 'Movimiento ilegal' }));
          return;
        }
        broadcast(room, payload(room));
      }

      if (msg.type === 'reset') {
        const roomId = ws.roomId;
        if (!roomId || !rooms.has(roomId)) return;
        const room = rooms.get(roomId);
        room.chess = new Chess();
        broadcast(room, payload(room));
      }
    } catch (e) {
      ws.send(JSON.stringify({ type: 'error', message: 'Mensaje inválido' }));
    }
  });

  ws.on('close', () => {
    const roomId = ws.roomId;
    if (!roomId || !rooms.has(roomId)) return;
    const room = rooms.get(roomId);
    room.players.delete(ws);
    if (room.players.size === 0 && Date.now() - room.createdAt > 60_000) {
      rooms.delete(roomId);
    }
  });
});

const PORT = Number(process.env.API_PORT || 4000);
server.listen(PORT, () => {
  console.log(`Chess server running at http://localhost:${PORT}`);
});
