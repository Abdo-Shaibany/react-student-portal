/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, RequestDailyCount, RequestTodayReport } from "@/core/models/Request.interface";
import { RequestStatus } from "@/core/enum/requestStatus";
import { BASE_URL } from "./api";


function getHeaders() {
    return {
        "Content-Type": "application/json",
        ...getAuthHeader()
    };
}

function getAuthHeader() {
    const token = localStorage.getItem("token") || "";
    return {
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
    assignToId?: string;
}): Promise<{ data: Request[] }> {
    const queryParams = new URLSearchParams();
    const filters: any = {};
    const orderBy: any = {}

    if (params.selectedDepartment && params.selectedDepartment !== 'all') filters.departmentId = params.selectedDepartment;
    if (params.status && params.status !== 'all') filters.status = params.status;
    if (params.assignToId && params.assignToId !== 'all') filters.assignedToId = params.assignToId;
    if (params.dateOrder) orderBy.createdAtDate = params.dateOrder;

    queryParams.append("filters", JSON.stringify(filters));
    queryParams.append("orderBy", JSON.stringify(orderBy));

    if (params.searchQuery) queryParams.append("search", params.searchQuery);
    if (params.page) queryParams.append("page", String(params.page));
    if (params.pageSize) queryParams.append("pageSize", String(params.pageSize));

    const response = await fetch(`${BASE_URL}/requests?${queryParams.toString()}`, {
        method: "GET",
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch requests");
    }
    return await response.json();
}

export async function fetchRequestCountsDaily(): Promise<RequestDailyCount[]> {
    const response = await fetch(`${BASE_URL}/requests/daily-count`, {
        method: "GET",
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch request counts daily");
    }
    return await response.json();
}

export async function fetchRequestById(id: string): Promise<Request | undefined> {
    const response = await fetch(`${BASE_URL}/requests/${id}`, {
        method: "GET",
        headers: getHeaders(),
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
): Promise<Request> {
    const response = await fetch(`${BASE_URL}/requests/${id}/status`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ status, comment: comment !== "" ? comment : null }),
    });
    if (!response.ok) {
        throw new Error("Failed to update request status");
    }
    return await response.json();
}

export async function submitStudentRequest(formData: FormData): Promise<{ requestNumber: number }> {
    const response = await fetch(`${BASE_URL}/requests`, {
        method: "POST",
        headers: getAuthHeader(),
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Failed to submit request");
    }
    return await response.json();
}

export async function getRequestTodayReport(): Promise<RequestTodayReport> {
    const response = await fetch(`${BASE_URL}/requests/today-report`, {
        method: "GET",
        headers: getHeaders(),
    });
    if (!response.ok) {
        throw new Error("Failed to fetch today's report");
    }
    return await response.json();
}
