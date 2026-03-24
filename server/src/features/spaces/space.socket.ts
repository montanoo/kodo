import { Server, Socket } from 'socket.io';

export function registerSpaceHandlers(io: Server, socket: Socket) {
  socket.on('space:join', (spaceId: number) => {
    socket.join(`space:${spaceId}`);
  });
}
