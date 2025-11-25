import { IUserRepository, UserRepository } from "../repositories/user.repository";
import { User } from "../types/user.types";

let userRepository: IUserRepository = new UserRepository();

export class UserService {
    getAllUsers = () => {
        let response = userRepository.getAllUsers()
        .map((user) => {
            return {...user, username: user.username.toUpperCase()}
        });
        return response;
    }
    createUser = (user: User) => {
        const exist = userRepository.getOneUser(user.id);
        if (exist) {
            throw new Error("User with this ID already exists");
        }
        return userRepository.createUser(user);
    }
}