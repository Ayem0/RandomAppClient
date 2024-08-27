export interface ErrorResponse {
    errors?: string[]
}

export interface Response extends ErrorResponse {
    isSuccess: boolean,
}

export interface RegisterResponse extends ErrorResponse, Response {
    message: string,
}

export interface LoginResponse extends ErrorResponse, Response {
    accessToken: string,
    refreshToken: string,
}

export interface ConfirmEmailResponse extends ErrorResponse, Response {
    message: string,
}

export interface ResendConfirmEmailResponse extends ErrorResponse, Response {
    message: string,
}

export interface RefreshResponse extends ErrorResponse, Response {
    accessToken: string,
    refreshToken: string,
}

export interface ForgotPasswordResponse extends ErrorResponse, Response {
    message: string,
}

export interface ResetPasswordResponse extends ErrorResponse, Response {
    message: string,
}