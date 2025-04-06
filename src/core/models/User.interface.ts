import { Department } from "./Department.interface"

export interface User {
    id?: string
    name: string
    phone: string
    departmentId: string
    department?: Department
    totalRequests: number
    password?: string
    isAdmin: boolean
}

export interface UserFormData {
    id?: string;
    name: string;
    phone: string;
    password?: string;
    departmentId: string;
}