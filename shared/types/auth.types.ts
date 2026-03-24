export interface AuthUser {
  id: number;
  email: string;
  username: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

export interface AuthApiResponse {
  accessToken: string;
  user: AuthUser;
}
