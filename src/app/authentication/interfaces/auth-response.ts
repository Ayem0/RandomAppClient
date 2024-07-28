export interface RegisterResponse {
    message: string,
    errors: string[],
}

export interface LoginResponse {
    accessToken: string,
    refreshToken: string,
    errors: string[]
}

export interface ConfirmEmailResponse {
    message: string,
    errors: string[]
}
