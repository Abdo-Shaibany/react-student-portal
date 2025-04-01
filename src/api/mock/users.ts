import { User } from "@/core/models/User.interface";

export const usersList: User[] = [
    {
        id: "1", name: "John Doe", phone: "+123456789", departmentId: "1", totalRequests: 24, department: { id: "1", name: "Admissions", totalRequests: 24 }
    },
    {
        id: "2", name: "Jane Smith", phone: "+987654321", departmentId: "2", totalRequests: 42, department: { id: "2", name: "Registrar", totalRequests: 42 }
    },
    {
        id: "3", name: "Alice Brown", phone: "+111222333", departmentId: "3", totalRequests: 15, department: { id: "3", name: "Library", totalRequests: 15 }
    },
    {
        id: "4", name: "Bob Johnson", phone: "+444555666", departmentId: "4", totalRequests: 18, department: { id: "4", name: "Maintenance", totalRequests: 18 }
    },
];
