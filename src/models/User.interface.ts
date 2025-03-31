import { Department } from "./Department.interface"

export interface User {
    id: string
    name: string
    email: string
    departmentId: string
    department?: Department
    totalRequests: number
    password?: string
}