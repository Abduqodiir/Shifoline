import { UserRoles } from "../models";

export declare interface CreateUserRequest {
    fullname: string;
    email: string;
    phone_number ?: string;
    password: string;
    image ?: string;
    role ?:UserRoles;
}