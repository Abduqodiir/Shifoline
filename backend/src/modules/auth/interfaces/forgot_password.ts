export declare interface ForgotPasswordRequest {
    email: string;
}

export declare interface ForgotPasswordResponse {
    success: boolean; // Indicates if the request was successful.
    message?: string; // Optional message providing details about the result.
    resetToken?: string; 
}
