import { LoginFormData } from "@/core/models/LoginForm.interface";
import { ChangePasswordFormData, StudentUser, User } from "@/core/models/User.interface";
import { Base64 } from 'js-base64';
import { BASE_URL } from "./api";


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


export async function submitSudentLoginRequest(formData: LoginFormData): Promise<User> {
    const response = await fetch(`${BASE_URL}/auth/student-login`, {
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

export async function submitChangePassword(
    formData: ChangePasswordFormData
): Promise<void> {
    const token = localStorage.getItem("token")
    if (!token) {
        throw new Error("Not authenticated")
    }

    const tokenPart = token.split('.')[1];
    const decodedString = Base64.decode(tokenPart);
    const user = JSON.parse(decodedString);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let response: any;

    if (user.studentNo) {
        response = await fetch(`${BASE_URL}/auth/student-change-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        })
    } else
        response = await fetch(`${BASE_URL}/auth/change-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        })

    if (!response.ok) {
        // try to pull error message from API
        const err = await response.json().catch(() => ({}))
        throw new Error(err.error || "Failed to change password")
    }
    // no return value on success
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
    if ('isAdmin' in user && typeof user.isAdmin === 'boolean') {
        return user.isAdmin;
    }
    return false;
}

export function isStudent(): boolean {
    const user = getUser();
    return 'studentNo' in user && !!(user as StudentUser).studentNo;
}


export function getUser(): User | StudentUser {
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
