export interface LoginRequest {
    email: string,
    password: string
}

export interface RegisterRequest {
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

export interface ConfirmEmailRequest {
    email: string,
}

export interface RefreshRequest {
    refreshToken: string,
}