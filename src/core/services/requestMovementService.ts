import { BASE_URL } from "./api";

interface RequestMovement {
    id: string;
    requestId: string;
    assignedToId?: string | null;
    assignedTo?: { id: string; name: string };
    date: string;
}

function getAuthHeader() {
    const token = localStorage.getItem("token") || "";
    return {
        Authorization: `Bearer ${token}`,
    };
}

function getHeaders() {
    return {
        "Content-Type": "application/json",
        ...getAuthHeader(),
    };
}


export async function createRequestMovement(
    requestId: string,
    assignedToId: string
): Promise<RequestMovement> {
    const response = await fetch(`${BASE_URL}/request-movements`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ requestId, assignedToId }),
    });
    if (!response.ok) {
        // You can read error text/json if backend returns details
        const text = await response.text();
        throw new Error(text || "Failed to create request movement");
    }
    const data = await response.json();
    return data as RequestMovement;
}


export async function fetchRequestMovementsByRequest(
    requestId: string,
    params?: { page?: number; pageSize?: number }
): Promise<RequestMovement[]> {
    const query = new URLSearchParams({ requestId });
    if (params?.page) query.append("page", String(params.page));
    if (params?.pageSize) query.append("pageSize", String(params.pageSize));

    const url = `${BASE_URL}/request-movements?${query.toString()}`;
    const response = await fetch(url, {
        method: "GET",
        headers: getHeaders(),
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to fetch request movements");
    }
    return (await response.json()) as RequestMovement[];
}


export async function updateRequestMovement(
    movementId: string,
    data: { assignedToId?: string | null; date?: string }
): Promise<RequestMovement> {
    const response = await fetch(`${BASE_URL}/request-movements/${movementId}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to update request movement");
    }
    return await response.json();
}

export async function deleteRequestMovement(
    movementId: string
): Promise<void> {
    const response = await fetch(`${BASE_URL}/request-movements/${movementId}`, {
        method: "DELETE",
        headers: getHeaders(),
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to delete request movement");
    }
}