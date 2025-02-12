export declare interface LoginRequest {
    email: string;
    password:string;
}

export declare interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    message: string;
}