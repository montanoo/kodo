import { Menu, X, Hash } from 'lucide-react';
import spaceStore from '../../store/spaces.store';
import authStore from '../../store/auth.store';
import { useState } from 'react';

export default function Sidebar() {
  const spaces = spaceStore((state) => state.spaces);
  const currentSpaceId = spaceStore((state) => state.currentSpaceId);
  const currentChannelId = spaceStore((state) => state.currentChannelId);
  const setCurrentSpace = spaceStore((state) => state.setCurrentSpace);
  const setCurrentChannel = spaceStore((state) => state.setCurrentChannel);
  const user = authStore((state) => state.user);
  
  const [open, setOpen] = useState(false);

  const currentSpace = spaces.find((s) => s.id === currentSpaceId);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="p-2.5 border border-border cursor-pointer hover:border-accent transition-colors"
        aria-label="Open sidebar"
      >
        <Menu size={16} className="text-muted" />
      </button>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300
          ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      <aside
        aria-hidden={!open}
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-surf border-r border-border
          flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${open ? 'translate-x-0' : '-translate-x-full pointer-events-none'}`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-border shrink-0">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-muted">
            Workspaces
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-muted hover:text-text transition-colors cursor-pointer"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-3 px-2">
          {spaces.map((space) => (
            <div key={space.id} className="mb-1">
              <button
                type="button"
                onClick={() => setCurrentSpace(space.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-left font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer
                  ${currentSpaceId === space.id ? 'text-accent' : 'text-muted hover:text-text'}`}
              >
                <div
                  className={`w-5 h-5 flex items-center justify-center text-[0.6rem] font-bold shrink-0
                  ${currentSpaceId === space.id ? 'bg-accent text-bg' : 'bg-surf2 text-muted'}`}
                >
                  {space.name[0].toUpperCase()}
                </div>
                {space.name}
              </button>

              {/* channels */}
              {currentSpaceId === space.id && (
                <div className="mt-0.5 mb-2">
                  {space.channels.map((channel) => (
                    <button
                      type="button"
                      key={channel.id}
                      onClick={() => {
                        setCurrentChannel(channel.id);
                        setOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 pl-8 pr-3 py-1.5 text-left font-mono text-xs transition-colors cursor-pointer relative
                        ${
                          currentChannelId === channel.id
                            ? 'text-text bg-accent/5 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-0.5 before:bg-accent'
                            : 'text-muted hover:text-text hover:bg-white/[0.02]'
                        }`}
                    >
                      <Hash size={11} className="shrink-0 opacity-60" />
                      {channel.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* user row */}
        <div className="border-t border-border px-4 py-3 shrink-0 flex items-center gap-2.5">
          <div className="w-7 h-7 bg-accent flex items-center justify-center font-mono text-xs font-bold text-bg shrink-0">
            {user?.username?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <span className="font-mono text-xs font-semibold text-text truncate flex-1">
            {user?.username ?? 'You'}
          </span>
        </div>
      </aside>
    </>
  );
}
