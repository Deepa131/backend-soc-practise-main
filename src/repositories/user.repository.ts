import { User } from "../types/user.types";

// In-memory storage - 
let users: any[] = [
  { id: "user1", username: 'john_doe', email: 'john@example.com', name: 'John Doe', age: 30 },
  { id: "user2", username: 'jane_smith', email: 'jane@example.com', name: 'Jane Smith', age: 25 },
];

export interface IUserRepository {
    getAllUsers(): User[];
    getOneUser(id: string): User | undefined;
    createUser(user: User): User;
    updateUser(id: string, user: any): any;
    deleteUser(id: string): boolean;
}

export class UserRepository implements IUserRepository {
    deleteUser(id: string): boolean {
        const index = users.findIndex(u => u.id ===id);
        if (index === -1) {
            return false;
        }
        users.splice(index, 1);
        return true;
    }
    updateUser(id: string, user: any) {
        const index = users.findIndex(u => u.id === id);

        if (index === -1) {
            return undefined;
        }
        users [index] = {
            ...users[index],
            ...user
        };
        return users[index];
    }
    getAllUsers(): User[] {
        return users;
    }
    getOneUser(id: string): User | undefined {
        return users.find(user => user.id === id);
    }
    createUser(user: User): User {
        users.push(user);
        return user;
    }
}