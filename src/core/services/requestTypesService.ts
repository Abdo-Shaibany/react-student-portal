// src/services/departmentService.ts
import { DepartmentReport } from "../models/Department.interface";
import { RequestType } from "../models/RequestType.interface";
import { BASE_URL } from "./api";

const END_POINT = 'requestTypes';


function getAuthHeaders() {
    const token = localStorage.getItem("token") || "";
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

export async function fetchRequestTypes(
    order?: string,
    searchQuery?: string,
    pageSize?: number,
    page?: number
): Promise<RequestType[]> {
    const params = new URLSearchParams();
    if (order) params.append("order", order);
    if (searchQuery) params.append("search", searchQuery);
    if (pageSize) params.append("pageSize", String(pageSize));
    if (page) params.append("page", String(page));

    const response = await fetch(`${BASE_URL}/${END_POINT}?${params.toString()}`, {
        method: "GET",
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch requests types");
    }
    return await response.json();
}

export async function deleteRequestTypeById(id: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/${END_POINT}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to delete request type");
    }
    return;
}

export async function createRequestType(department: RequestType): Promise<RequestType> {
    const response = await fetch(`${BASE_URL}/${END_POINT}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(department),
    });
    if (!response.ok) {
        throw new Error("Failed to create request");
    }
    return await response.json();
}

export async function updateRequestType(type: RequestType): Promise<RequestType> {
    delete type.department;
    const response = await fetch(`${BASE_URL}/${END_POINT}/${type.id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(type),
    });
    if (!response.ok) {
        throw new Error("Failed to update request type");
    }
    return await response.json();
}

export async function fetchRequestsTypesReport(): Promise<DepartmentReport[]> {
    const response = await fetch(`${BASE_URL}/${END_POINT}/report`, {
        method: "GET",
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch requests types report");
    }
    return await response.json();
}
