import { departmentsList } from "@/api/mock/departments";
import { Department } from "@/core/models/Department.interface";

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