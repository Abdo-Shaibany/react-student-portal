// src/services/departmentService.ts
import { Department, DepartmentReport } from "@/core/models/Department.interface";
import { BASE_URL } from "./api";


function getAuthHeaders() {
    const token = localStorage.getItem("token") || "";
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

export async function fetchDepartments(
    order?: string,
    searchQuery?: string,
    pageSize?: number,
    page?: number
): Promise<Department[]> {
    const params = new URLSearchParams();
    if (order) params.append("order", order);
    if (searchQuery) params.append("search", searchQuery);
    if (pageSize) params.append("pageSize", String(pageSize));
    if (page) params.append("page", String(page));

    const response = await fetch(`${BASE_URL}/departments?${params.toString()}`, {
        method: "GET",
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch departments");
    }
    return await response.json();
}

export async function deleteDepartmentById(id: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/departments/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to delete department");
    }
    return;
}

export async function createDepartment(department: Department): Promise<Department> {
    const response = await fetch(`${BASE_URL}/departments`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(department),
    });
    if (!response.ok) {
        throw new Error("Failed to create department");
    }
    return await response.json();
}

export async function updateDepartment(department: Department): Promise<Department> {
    const response = await fetch(`${BASE_URL}/departments/${department.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(department),
    });
    if (!response.ok) {
        throw new Error("Failed to update department");
    }
    return await response.json();
}

export async function fetchDepartmentsReport(): Promise<DepartmentReport[]> {
    const response = await fetch(`${BASE_URL}/departments/report`, {
        method: "GET",
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch departments report");
    }
    return await response.json();
}
