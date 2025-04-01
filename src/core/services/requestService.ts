// src/services/studentRequestService.ts

import { requestsList } from "@/api/mock/requests";
import { Request } from "@/core/models/Request.interface";
import { RequestStatus } from "../enum/requestStatus";

export function fetchRequests(selectedDepartment: string, status: RequestStatus): Promise<{ data: Request[] }> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const filteredRequests = requestsList.filter(request => {
                const filtered = selectedDepartment === "all" ? true : (request.department.id === selectedDepartment);
                return status === "pending" && filtered;
            })

            resolve({ data: filteredRequests });

            // Uncomment below to simulate an error:
            reject(new Error("Failed to submit request"));
        }, 2000);
    });
}
