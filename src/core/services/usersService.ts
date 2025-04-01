import { usersList } from "@/api/mock/users";
import { User, UserFormData } from "../models/User.interface";

export function fetchUsers(searchQuery: string, sortOrder: string): Promise<User[]> {
    return Promise.resolve(
        usersList
            .filter((user) =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .sort((a, b) =>
                sortOrder === "asc"
                    ? a.totalRequests - b.totalRequests
                    : b.totalRequests - a.totalRequests
            )
    );
}

export function createUser(user: UserFormData): Promise<User> {
    return new Promise((resolve, reject) => {
        const newUser = {
            id: (usersList.length + 1).toString(),
            ...user,
            totalRequests: 0,
        };
        usersList.push(newUser);
        resolve(newUser);

        reject("hi")
    });
}

export function updateUser(id: string, user: UserFormData): Promise<User> {
    return new Promise((resolve, reject) => {
        const existingUser = usersList.find((user) => user.id === id);
        if (existingUser) {
            resolve({ ...existingUser, ...user });
        } else {
            reject(new Error(`User with id ${id} not found`));
        }
    });
}

export function deleteUser(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const userIndex = usersList.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            reject(new Error(`User with id ${id} not found`));
        } else {
            usersList.splice(userIndex, 1);
            resolve();
        }
    });
}
