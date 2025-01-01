import { Request, Response } from "express";
import { CustomError, RegisterDTO } from "../../domain";
import { AuthService } from "../services";

export class AuthController {
    
    constructor( private authService:AuthService ){}

    private handleError ( error: unknown, res: Response) {
        if( error instanceof CustomError ) return res.status(error.statusCode).json({error: error.message});
        return res.status(500).json({error: "Internal Server Error"});
        
    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerDTO] = RegisterDTO.create(req.body);
        if (error) {
            res.status(400).json({ error });
        } 

        this.authService.registerUser(registerDTO!)
            .then( response =>  res.status(201).json(response) )
            .catch( error => this.handleError(error, res))
        
    }

    loginUser = ( req: Request, res: Response) => {
        res.json("loginUser");
    }
}