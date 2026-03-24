import {
  createMessageInput,
  sendMessageSchema,
} from '@kodo/shared/validators/channel.validator';
import { Socket, Server } from 'socket.io';
import { sendMessageService } from './channel.service';

export function registerChannelHandlers(io: Server, socket: Socket) {
  socket.on('message:send', async (arg: createMessageInput) => {
    try {
      const input = sendMessageSchema.parse(arg);
      const result = await sendMessageService(input, socket.data.userId);
      io.to(`space:${input.spaceId}`).emit('message:new', result);
    } catch (error) {
      socket.emit('message:error', { error: 'something went wrong' });
    }
  });
}
