import { RequestStatus } from "../enum/requestStatus"
import { Department } from "./Department.interface"
import { RequestType } from "./RequestType.interface"
import { User } from "./User.interface"

export interface CreateRequestMovementData {
    requestId: string;
    assignedToId?: string | null;
    date?: Date;
}

export interface Request {
    id: string
    requestNumber: string
    studentName: string
    title: string
    phone: string
    message: string
    createdAt: string
    createdAtDate: string
    status: RequestStatus
    departmentId: string
    assignedToId?: string
    department: Department
    RequestType: RequestType
    assignedTo?: User
    files: { name: string; type: 'pdf' | 'image', url: string }[]
    statusHistory: {
        status: RequestStatus
        date: string
        comment?: string
    }[];
    RequestMovement: CreateRequestMovementData[];
}

export interface RequestForm {
    // fullName: string;
    // phone: string;
    departmentId: string;
    requestTypeId: string;
    message?: string;
    fileUpload?: FileList;
}

export interface RequestDailyCount { date: string, count: number }

export interface RequestTodayReport { pending: number, late: number }