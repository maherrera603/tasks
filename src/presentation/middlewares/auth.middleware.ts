import { NextFunction, Request, Response } from "express";
import { envs, JWTAdapter } from "../../config";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain";

export class AuthMiddleware { 


    static async validateJWT (req: Request, res: Response, next: NextFunction) {
        const autorization = req.header("Authorization");
        if(!autorization) {
            res.status(401).json({error: "No token provided"});
            return
        }
        if(!autorization.startsWith("Bearer ")) {
            res.status(401).json({error: "Invalid bearer token"});
            return;
        }

        const token = autorization.split(" ").at(-1) || "";

        try {
            const payload = await JWTAdapter.validatedToken<{user: string}>(token, envs.JWT_SEED);
            if(!payload) { 
                res.status(401).json({error: "Invalid Token"});
                return;
            }


            const user = await UserModel.findById(payload.user);
            if(!user) {
                res.status(401).json({error: "Invalid token"});
                return;
            }

            const {password, ...datauser} = UserEntity.fromObject(user);
            req.body.user = datauser;

            next();

        }catch(error){
            res.status(500).json({error: "Internal Server"});
            return 
        }

    }
}