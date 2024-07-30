export interface RegisterResponse {
    message: string,
    errors: string[],
}

export interface LoginResponse {
    isSuccess: boolean,
    accessToken: string,
    refreshToken: string,
    errors: string[]
}

export interface ConfirmEmailResponse {
    message: string,
    errors: string[]
}
