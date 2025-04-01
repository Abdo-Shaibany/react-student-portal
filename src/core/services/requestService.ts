// src/services/studentRequestService.ts

import { requestsList } from "@/api/mock/requests";
import { Request, RequestDailyCount } from "@/core/models/Request.interface";
import { RequestStatus } from "../enum/requestStatus";

export function fetchRequests(selectedDepartment: string, status: RequestStatus, searchQuery?: string, dateOrder?: string): Promise<{ data: Request[] }> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let filteredRequests = requestsList.filter(request => {
                const filtered = selectedDepartment === "all" ? true : (request.department.id === selectedDepartment);
                return status === request.status && filtered;
            })

            filteredRequests = requestsList
                .filter(request => {
                    const matchesSearch = [
                        request.requestNumber,
                        request.studentName,
                        request.phone,
                    ].some(value => value.toLowerCase().includes((searchQuery ?? '').toLowerCase()));
                    return request.department && request.assignedTo && matchesSearch;
                })
                .sort((a, b) =>
                    dateOrder === "newest"
                        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                );

            resolve({ data: filteredRequests });

            // Uncomment below to simulate an error:
            reject(new Error("Failed to submit request"));
        }, 2000);
    });
}

export function fetchRequestCountsDaily(): Promise<{ data: RequestDailyCount[] }> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const chartData = [
                { date: "2024-03-01", count: 12 },
                { date: "2024-03-02", count: 18 },
                { date: "2024-03-03", count: 9 },
            ];

            resolve({ data: chartData });

            // Uncomment below to simulate an error:
            reject(new Error("Failed to fetch request counts daily"));
        }, 2000);
    });
}
