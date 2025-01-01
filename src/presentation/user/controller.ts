import { Request, Response } from "express";
import { UserService } from "../services";
import { CustomError, UserDTO } from "../../domain";

export class UserController {

    constructor( private readonly userService: UserService){}

    private handleError(error: unknown, res:Response) {
        if(error instanceof CustomError)
            return res.status(error.statusCode).json({error: error.message})
        return res.status(500).json({error: "Internal Server"});
    }

    public getUser = (req: Request, res: Response) => {
        const {user} = req.body;

        this.userService.getUser(user.id)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res));
    }


    public updateUser = (req: Request, res: Response) => {
        const [error, userDto] = UserDTO.update(req.body);
        if(error) {
            res.status(400).json({ error });
            return
        }

        this.userService.updatedUser(userDto!, req.body.user.id)
            .then(response => res.json( response ))
            .catch( error => this.handleError(error, res));
     }
}