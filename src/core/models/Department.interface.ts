export interface Department {
    id: string
    name: string
    totalRequests: number
}

export interface DepartmentReport {
    name: string;
    completed: number;
    pending: number;
    late: number;
}