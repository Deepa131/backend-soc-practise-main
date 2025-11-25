
import { Request, Response } from "express";
import { CreateUserDTO } from "../dtos/user.dto";
import { User } from '../types/user.types'
import { UserService } from "../services/user.service";


let userService : UserService = new UserService();

export class UserController{
    createUser = (req: Request, res:Response) => {
        try{
            const validation = CreateUserDTO.safeParse(req.body);
        if(!validation.success){
            return res.status(400).json({errors: validation.error});
        }
        const {id, username, email, name} = validation.data;  

        const newUser: User = userService.createUser({id, username, email, name});
        
        return res.status(201).json(newUser);

        }catch(error: Error | any){
            return res.status(400).json({message: error.message ?? "Something went wrong"});
        }
    }

    getUsers = (req: Request, res: Response) => {
        let response = userService.getAllUsers();
        res.status(200).json(response);
    }

    getUserById = (req: Request, res: Response) => {
        const {userid} = req.params;
        let response = userService.getUserById(userid);
        res.status(200).json(response);
    }

    updateUser = (req: Request, res: Response) => {
        const {userid} = req.params;  // req.params get userid from the URL we passed
        const {username, email, name, age} = req.body;       // req.body get userid from the body
        try {
            const updatedUser = userService.updateUser(userid, { username, email, name, age });
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(updatedUser);
        } catch (error: any) {
            return res.status(500).json({ message: "Error updating user" });
        }
    }

    deleteUser = (req: Request, res: Response) => {
        const {userid} = req.params;
        let response = userService.deleteUser(userid);
        res.status(200).json(response);
    }
}
