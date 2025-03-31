import { User } from "@/models/User.interface";

export const usersList: User[] = [
    {
        id: "1", name: "John Doe", email: "john@uni.edu", departmentId: "1", totalRequests: 24, department: { id: "1", name: "Admissions", totalRequests: 24 }
    },
    {
        id: "2", name: "Jane Smith", email: "jane@uni.edu", departmentId: "2", totalRequests: 42, department: { id: "2", name: "Registrar", totalRequests: 42 }
    },
];