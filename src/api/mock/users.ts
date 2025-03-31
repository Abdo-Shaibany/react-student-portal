import { User } from "@/models/User.interface";

export const usersList: User[] = [
    {
        id: "1", name: "John Doe", phone: "771402072", departmentId: "1", totalRequests: 24, department: { id: "1", name: "Admissions", totalRequests: 24 }
    },
    {
        id: "2", name: "Jane Smith", phone: "734227062", departmentId: "2", totalRequests: 42, department: { id: "2", name: "Registrar", totalRequests: 42 }
    },
];