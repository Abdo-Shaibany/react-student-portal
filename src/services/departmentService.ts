import { departmentsList } from "@/api/mock/departments";
import { requestsList } from "@/api/mock/requests";
import { Department, DepartmentReport } from "@/core/models/Department.interface";

export function fetchDepartments(): Promise<Department[]> {
    return new Promise((resolve, reject) => {
        // Simulate a network delay of 2 seconds
        setTimeout(() => {
            // Simulate success by returning the departments list
            resolve(departmentsList);

            // Uncomment below to simulate an error:
            // reject(new Error("Failed to fetch departments"));
        }, 2000);
    });
}


export function fetchDepartmentsReport(): Promise<{ data: DepartmentReport[] }> {
    return new Promise((resolve, reject) => {
        // Simulate a network delay of 2 seconds
        setTimeout(() => {
            // Simulate success by returning the departments list
            const departmentsReport: DepartmentReport[] = departmentsList.map(department => {
                const completed = requestsList.filter(request => request.department.id === department.id && request.status === "completed").length
                const today = new Date().toISOString().split('T')[0]
                const pending = requestsList.filter(request => request.department.id === department.id && request.status === "pending" && request.createdAt.split('T')[0] === today).length
                const late = requestsList.filter(request => request.department.id === department.id && request.status === "pending" && request.createdAt.split('T')[0] < today).length
                return {
                    name: department.name,
                    completed,
                    pending,
                    late,
                }
            })

            resolve({ data: departmentsReport });

            // Uncomment below to simulate an error:
            reject(new Error("Failed to fetch departments"));
        }, 2000);
    });
}