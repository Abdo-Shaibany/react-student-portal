import { departmentsList } from "@/api/mock/departments";
import { requestsList } from "@/api/mock/requests";
import { Department, DepartmentReport } from "@/core/models/Department.interface";

export function fetchDepartments(order?: string, searchQuery?: string, pageSize?: number, page?: number): Promise<Department[]> {
    return new Promise((resolve, reject) => {
        let filteredDepartments = departmentsList;


        if (searchQuery)
            filteredDepartments = filteredDepartments.filter(department => department.name.toLowerCase().includes(searchQuery.toLowerCase()))

        if (order)
            filteredDepartments = filteredDepartments.sort((a, b) => order === "asc" ? a.totalRequests! - b.totalRequests! : b.totalRequests! - a.totalRequests!);

        if (pageSize && page)
            filteredDepartments = filteredDepartments.slice((page - 1) * pageSize, page * pageSize);

        setTimeout(() => {
            resolve(filteredDepartments);

            // Uncomment below to simulate an error:
            reject(new Error("Failed to fetch departments"));
        }, 200);
    });
}

export function deleteDepartmentById(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const index = departmentsList.findIndex(department => department.id === id);

        if (index < 0) {
            reject(new Error(`Department with id ${id} not found.`));
        }

        departmentsList.splice(index, 1);

        setTimeout(() => {
            resolve();
        }, 200);
    });
}

export function createDepartment(department: Department): Promise<Department> {
    return new Promise((resolve, reject) => {
        const newDepartment = {
            id: (departmentsList.length + 1).toString(),
            name: department.name,
            totalRequests: 0,
        };

        departmentsList.push(newDepartment);

        setTimeout(() => {
            resolve(newDepartment);
        }, 200);
    });
}

export function updateDepartment(input: Department): Promise<Department> {
    return new Promise((resolve, reject) => {
        const index = departmentsList.findIndex(department => department.id === input.id);

        if (index < 0) {
            reject(new Error(`Department with id ${input.id} not found.`));
        }

        const updatedDepartment = {
            ...departmentsList[index],
            ...input,
        };

        departmentsList[index] = updatedDepartment;

        setTimeout(() => {
            resolve(updatedDepartment);
        }, 200);
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