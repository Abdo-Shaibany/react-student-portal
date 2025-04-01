import { Department } from "./Department.interface"
import { User } from "./User.interface"

export interface Request {
    id: string
    requestNumber: string
    studentName: string
    title: string
    phone: string
    email: string
    message: string
    createdAt: string
    status: "pending" | "in-progress" | "completed"
    departmentId: string
    assignedToId: string
    department: Department
    assignedTo: User
    files: { name: string; type: 'pdf' | 'image', url: string }[]
    statusHistory: {
        status: "pending" | "in-progress" | "completed"
        date: string
        comment?: string
    }[]
}

export interface RequestForm {
    fullName: string;
    phone: string;
    title: string;
    departmentId: string;
    message: string;
    fileUpload: FileList;
}