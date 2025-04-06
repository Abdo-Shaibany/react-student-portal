import { LoginFormData } from "@/core/models/LoginForm.interface";
import { User } from "@/core/models/User.interface";
import { Base64 } from 'js-base64';

const BASE_URL = "http://localhost:3000/api";

export async function submitLoginRequest(formData: LoginFormData): Promise<User> {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "charset": "utf-8",
        },
        body: JSON.stringify(formData),
    });
    if (!response.ok) {
        throw new Error("Failed to login");
    }
    const data = await response.json();

    localStorage.setItem("token", data.token);
    return data.user;
}

export function logout(navigate: (path: string) => void): void {
    localStorage.removeItem("token");
    navigate("/");
}

export function isAuth(): boolean {
    return !!localStorage.getItem("token");
}

export function isAdmin(): boolean {
    const user = getUser();
    return user.isAdmin;
}

export function getUser(): User {
    const token = localStorage.getItem("token");
    if (!token) return {
        phone: "771402072",
        departmentId: "all",
        name: "Abdullah",
        totalRequests: 20,
        isAdmin: false,
    };
    const tokenPart = token.split('.')[1];
    const decodedString = Base64.decode(tokenPart);
    const user = JSON.parse(decodedString);
    return user;
}
