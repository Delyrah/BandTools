export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiry: string;
    user: AuthUser;
}

export interface AuthUser {
    id: number;
    email: string;
    displayName: string;
    avatarUrl?: string;
    role: 'Member' | 'Admin';
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    email: string;
    password: string;
    displayName: string;
}