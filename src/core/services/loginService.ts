// src/services/studentRequestService.ts

import { LoginFormData } from "@/core/models/LoginForm.interface";
import { NavigateFunction } from "react-router-dom";
import { User } from "../models/User.interface";

export function submitLoginRequest(formData: LoginFormData): Promise<{ requestNumber: number }> {
    return new Promise((resolve, reject) => {
        console.log(formData)
        setTimeout(() => {
            // TODO: get the token and save it to localstoarge
            // TODO: make gloable interceptor to add the token
            // TODO: make gloable router to see if user exist or redirect to welcome page in protected routes
            const requestNumber = Math.floor(100000 + Math.random() * 900000);
            resolve({ requestNumber });

            // Uncomment below to simulate an error:
            reject(new Error("Failed to submit request"));
        }, 2000);
    });
}

export function logout(navigate: NavigateFunction) {
    localStorage.removeItem('token');
    navigate('/');
}

export function isAuth() {
    return true;
}

export function isAdmin() {
    return true;
}

export function getUser(): User {
    return {
        phone: '771402072',
        departmentId: "all",
        name: "Abdullah",
        totalRequests: 20
    }
}