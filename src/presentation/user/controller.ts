import { Request, Response } from "express";
import { UserService } from "../services";
import { CustomError } from "../../domain";

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
        res.json("updateUser")
    }
}