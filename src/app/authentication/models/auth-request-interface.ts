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
    token: string
}

export interface ResendConfirmEmailRequest {
    email: string,
}

export interface RefreshRequest {
    refreshToken: string,
}

export interface ForgotPasswordRequest {
    email: string,
}

export interface ResetPasswordRequest {
    email: string,
    token: string,
    password: string,
    confirmPassword: string
}