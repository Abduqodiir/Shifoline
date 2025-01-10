import { UserRoles } from "../models";

export declare interface UpdateUserRequest {
    fullname ?: string;
    email ?: string;
    phone_number ?: string;
    password ?: string;
    image ?: string;
    role ?: UserRoles
}