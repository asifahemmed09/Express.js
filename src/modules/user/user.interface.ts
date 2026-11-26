import type { Role } from "../../types";

export interface IUser {
    name: string
    email: string
    password: string
    age?: number
    role?: Role
}
