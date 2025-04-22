export interface RequestType {
    id?: string
    name: string
    totalRequests?: number
}

export interface RequestTypeReport {
    name: string;
    completed: number;
    pending: number;
    late: number;
}

export interface RequestForm {
    id: string;
    name: string;
}