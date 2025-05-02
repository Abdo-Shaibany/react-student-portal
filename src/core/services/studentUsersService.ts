import { StudentUserFormData, StudentUser } from "@/core/models/User.interface";
import { BASE_URL } from "./api";


function getAuthHeaders() {
    const token = localStorage.getItem("token") || "";
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

const end_point = '/studentAccount';

export async function fetchStudnetUsers(searchQuery?: string, sortOrder?: string): Promise<StudentUser[]> {
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (sortOrder) params.append("sortOrder", sortOrder);

    const response = await fetch(`${BASE_URL}${end_point}?${params.toString()}`, {
        method: "GET",
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch student accounts");
    }
    return await response.json();
}

export async function createStudentUser(user: StudentUserFormData): Promise<StudentUser> {
    const response = await fetch(`${BASE_URL}${end_point}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error("Failed to create student account");
    }
    return await response.json();
}

export async function updateStudentUser(id: string, user: StudentUserFormData): Promise<StudentUser> {
    if (!user.password) delete user.password;
    const response = await fetch(`${BASE_URL}${end_point}/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error("Failed to update student account");
    }
    return await response.json();
}

export async function deleteStudentUser(id: string): Promise<void> {
    const response = await fetch(`${BASE_URL}${end_point}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error("Failed to delete student user");
    }
    return;
}
