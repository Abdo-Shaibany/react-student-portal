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

export interface StudentUser {
    id?: string
    name: string
    phone: string
    studentNo: string
    password?: string
}

export interface UserFormData {
    id?: string;
    name: string;
    phone: string;
    password?: string;
    departmentId: string;
}

export interface StudentUserFormData {
    id?: string;
    name: string;
    phone: string;
    password?: string;
    studentNo: string;
}

export interface ChangePasswordFormData {
    currentPassword: string
    newPassword: string
    confirmNewPassword: string
}
