import { Department } from "./Department.interface";

export interface RequestType {
    id?: string
    name: string
    totalRequests?: number
    department?: Department
    departmentId: string;
}

export interface RequestTypeReport {
    name: string;
    completed: number;
    pending: number;
    late: number;
}

export interface RequestTypeForm {
    id: string;
    name: string;
    departmentId: string;
}