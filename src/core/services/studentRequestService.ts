// src/services/studentRequestService.ts
import { RequestForm } from "@/core/models/Request.interface";

export function submitStudentRequest(formData: RequestForm): Promise<{ requestNumber: number }> {
    return new Promise((resolve, reject) => {
        // Simulate a network delay of 2 seconds
        console.log(formData)
        setTimeout(() => {
            // Simulate success by generating a random request number
            const requestNumber = Math.floor(100000 + Math.random() * 900000);
            resolve({ requestNumber });

            // Uncomment below to simulate an error:
            // reject(new Error("Failed to submit request"));
        }, 2000);
    });
}
