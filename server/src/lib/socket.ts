import { Server } from 'socket.io';
import { Server as HttpServer } from 'node:http';
import { socketAuth } from '@/middleware/socketAuth';
import { registerChannelHandlers } from '@/features/channel/channel.socket';

let io: Server;
export function initSocket(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  io.use(socketAuth);

  io.on('connection', (socket) => {
    registerChannelHandlers(io, socket);
  });
}

export { io };
