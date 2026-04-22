import Sidebar from './Sidebar';
import spaceStore from '../../store/spaces.store';

export default function TopBar() {
  const currentSpaceId = spaceStore((state) => state.currentSpaceId);
  const currentChannelId = spaceStore((state) => state.currentChannelId);
  const spaces = spaceStore((state) => state.spaces);

  const currentSpace = spaces.find((s) => s.id === currentSpaceId);
  const currentChannel = currentSpace?.channels.find(
    (c) => c.id === currentChannelId
  );
  const channelName = currentChannel?.name ?? 'Select a channel';

  return (
    <header className="grid grid-cols-2 py-2 px-4 w-full bg-surf border-b border-border">
      <div className="flex gap-4 items-center">
        <Sidebar />
        <div className="flex items-center gap-2 font-mono">
          <span className="text-muted">#</span>
          <span className="text-text font-semibold text-sm">{channelName}</span>
        </div>
      </div>
      <div className="flex justify-end items-center text-xs font-mono font-semibold">
        <div>
          <div className="bg-accent flex items-center justify-center px-2 py-1">
            CHAT
          </div>
        </div>
        <div>
          <div className="border-boder border flex items-center justify-center px-2 py-1 text-muted">
            BOARD
          </div>
        </div>
      </div>
    </header>
  );
}
