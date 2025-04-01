/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestDailyCount, RequestForm, RequestTodayReport } from "@/core/models/Request.interface";
import { RequestStatus } from "@/core/enum/requestStatus";

const BASE_URL = "http://localhost:3000/api";

function getAuthHeaders() {
    const token = localStorage.getItem("token") || "";
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

export async function fetchRequests(params: {
    selectedDepartment?: string;
    status?: RequestStatus;
    searchQuery?: string;
    dateOrder?: string;
    page?: number;
    pageSize?: number;
}): Promise<{ data: Request[] }> {

    const queryParams = new URLSearchParams();
    const filters: any = {};

    if (params.selectedDepartment && params.selectedDepartment !== 'all') filters.departmentId = params.selectedDepartment;
    if (params.status && params.status !== 'all') filters.status = params.status;
    if (params.dateOrder) filters.createAtDate = params.dateOrder;

    queryParams.append("filters", JSON.stringify(filters));
    if (params.searchQuery) queryParams.append("search", params.searchQuery);
    if (params.page) queryParams.append("page", String(params.page));
    if (params.pageSize) queryParams.append("pageSize", String(params.pageSize));

    const response = await fetch(`${BASE_URL}/requests?${queryParams.toString()}`, {
        method: "GET",
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch requests");
    }
    return await response.json();
}

export async function fetchRequestCountsDaily(): Promise<{ data: RequestDailyCount[] }> {
    const response = await fetch(`${BASE_URL}/requests/daily-count`, {
        method: "GET",
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch request counts daily");
    }
    return await response.json();
}

export async function fetchRequestById(id: string): Promise<{ data: Request | undefined }> {
    const response = await fetch(`${BASE_URL}/requests/${id}`, {
        method: "GET",
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch request by id");
    }
    return await response.json();
}

export async function updateRequestStatus(
    id: string,
    status: RequestStatus,
    comment: string
): Promise<{ data: Request | undefined }> {
    const response = await fetch(`${BASE_URL}/requests/${id}/status`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, comment }),
    });
    if (!response.ok) {
        throw new Error("Failed to update request status");
    }
    return await response.json();
}

export async function submitStudentRequest(formData: RequestForm): Promise<{ requestNumber: number }> {
    const response = await fetch(`${BASE_URL}/requests`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error("Failed to submit request");
    }
    return await response.json();
}

export async function getRequestTodayReport(): Promise<RequestTodayReport> {
    const response = await fetch(`${BASE_URL}/requests/today-report`, {
        method: "GET",
        headers: getAuthHeaders(),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch today's report");
    }
    return await response.json();
}
