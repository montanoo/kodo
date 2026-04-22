import type { SpaceApiResponse } from '@kodo/shared/types/spaces.types';
import { create } from 'zustand';

type SpaceStore = {
  spaces: SpaceApiResponse[];
  currentSpaceId: number | null;
  currentChannelId: number | null;
  setCurrentSpace: (id: number) => void;
  setCurrentChannel: (id: number) => void;
  setSpaces: (spaces: SpaceApiResponse[]) => void;
};

const spaceStore = create<SpaceStore>()((set) => ({
  spaces: null,
  currentSpaceId: null,
  currentChannelId: null,
  setCurrentSpace: (id) => {
    localStorage.setItem('last-visited-space', String(id));
    set({ currentSpaceId: id });
  },
  setCurrentChannel: (id) => {
    localStorage.setItem('last-visited-channel', String(id));
    set({ currentChannelId: id });
  },
  setSpaces: (spaces) => {
    set({ spaces });
  },
}));

export default spaceStore;
