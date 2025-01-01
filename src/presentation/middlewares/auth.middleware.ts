import { NextFunction, Request, Response } from "express";
import { envs, JWTAdapter } from "../../config";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain";

export class AuthMiddleware { 


    static async validateJWT (req: Request, res: Response, next: NextFunction) {
        const autorization = req.header("Authorization");
        if(!autorization) return res.status(401).json({error: "No token provided"});
        if(!autorization.startsWith("Bearer ")) return res.status(401).json({error: "Invalid bearer token"});

        const token = autorization.split(" ").at(1) || "";

        try {
            const payload = await JWTAdapter.validatedToken<{user: string}>(token, envs.JWT_SEED);
            if(!payload) return res.status(401).json({error: "Invalid Token"});


            const user = await UserModel.findById(payload.user);
            if(!user) return res.status(401).json({error: "Invalid token"});

            const {password, ...datauser} = UserEntity.fromObject(user);
            console.log(datauser);

            next();

        }catch(error){
            return res.status(500).json({error: "Internal Server"});
        }

    }
}