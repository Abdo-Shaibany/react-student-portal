// src/services/userService.ts
import { User, UserFormData } from "@/core/models/User.interface";
import { BASE_URL } from "./api";


function getAuthHeaders() {
    const token = localStorage.getItem("token") || "";
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

export async function fetchUsers(searchQuery?: string, sortOrder?: string): Promise<User[]> {
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (sortOrder) params.append("sortOrder", sortOrder);

    const response = await fetch(`${BASE_URL}/users?${params.toString()}`, {
        method: "GET",
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    return await response.json();
}

export async function createUser(user: UserFormData): Promise<User> {
    const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error("Failed to create user");
    }
    return await response.json();
}

export async function updateUser(id: string, user: UserFormData): Promise<User> {
    if (!user.password) delete user.password;
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error("Failed to update user");
    }
    return await response.json();
}

export async function deleteUser(id: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error("Failed to delete user");
    }
    return;
}
