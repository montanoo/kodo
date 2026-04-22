export interface SpaceApiResponse {
  id: number;
  name: string;
  channels: { id: number; name: string }[];
  spaceMembers: { role: { type: string } }[];
}

export interface MessageUser {
  email: string;
  username: string;
  avatar: string | null;
}

export interface MessageApiResponse {
  id: number;
  text: string;
  channelId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: MessageUser;
}
