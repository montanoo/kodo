import { useQuery } from '@tanstack/react-query';
import { getSpaces } from '../spaces.api';
import authStore from '../../../store/auth.store';
import spaceStore from '../../../store/spaces.store';
import { socket } from '../../../lib/socket';

export default function useSpaces() {
  const user = authStore((state) => state.user);
  const setSpaces = spaceStore((state) => state.setSpaces);
  const data = useQuery({
    queryKey: ['spaces', user?.id],
    queryFn: async () => {
      const spaces = await getSpaces();
      setSpaces(spaces);
      spaces.forEach((space) => socket.emit('space:join', space.id));

      return spaces;
    },
    enabled: !!user?.id,
  });

  return data;
}
