
import { report } from "process";
import { IUserRepository, UserRepository } from "../repositories/user.repository";

let userRepository: IUserRepository = new UserRepository();

export class UserService{
    getAllUsers = () => {
        let response = userRepository
        .getAllUsers().
        map((user) => {
            return {
                ...user, 
                username: user.username.toUpperCase(),
                email: user.email.toUpperCase(),
                name : user.name.toUpperCase()
            }
        });
        return response;
    };

    createUser = (user : any ) => { 
        const existid = userRepository.getOneUser(user.id);
        if(existid){
            throw new Error("User with this Id already exists");
        }

        const existemail= userRepository.getOneUser(user.email);
        if(existemail){
            throw new Error("User with this email already exists");
        }

        const existusername = userRepository.getOneUser(user.username);
        if(existusername){
            throw new Error("User with this username already exists");
        }

        return userRepository.createUser(user);
    };

    getUserById = (id: string ) => {
        let response = userRepository.getOneUser(id);
        return response;
    }

    updateUser = (id: string, user: any) => {
        let response = userRepository.updateUser(id , user);
        return response; 
    }

    deleteUser = (id: string) => {
        let response= userRepository.deleteUser(id);
        return response;
    }; 
}
