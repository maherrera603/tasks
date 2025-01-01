import { Router } from "express";
import { AuthController } from "./controller";

export class AuthRoutes {


    static get routes (): Router{
        const router = Router();
        const controller = new AuthController();

        router.post( "/user/register", controller.registerUser );
        router.post( "/user/login", controller.loginUser )

        return router;
    }
}