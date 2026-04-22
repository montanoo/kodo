import type { MessageApiResponse } from '@kodo/shared/types/spaces.types';
import Api from '../../lib/api';

interface GetMessagesProps {
  channelId: number;
  cursor?: number;
}

export async function getMessages({ channelId, cursor }: GetMessagesProps) {
  const { data } = await Api.get<{ messages: MessageApiResponse[] }>(
    `channels/${channelId}/messages${cursor ? '?' + cursor : ''}`
  );
  const { messages } = data;
  return messages;
}
