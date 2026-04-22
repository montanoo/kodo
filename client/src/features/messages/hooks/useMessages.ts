import { useQuery } from '@tanstack/react-query';
import spaceStore from '../../../store/spaces.store';
import { getMessages } from '../messages.api';

export default function useMessages() {
  const channelId = spaceStore((state) => state.currentChannelId);
  const data = useQuery({
    queryKey: ['messages', channelId],
    queryFn: () => getMessages({ channelId: channelId! }),
    enabled: !!channelId,
  });

  return data;
}
