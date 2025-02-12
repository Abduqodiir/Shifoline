export declare interface ResetPasswordRequest {
    resetToken: string; 
    newPassword: string;
    confirmPassword?: string; 
}

export declare interface ResetPasswordResponse {
    success: boolean; 
    message?: string;
}
