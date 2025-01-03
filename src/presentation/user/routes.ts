import { Router } from "express";
import { UserController } from "./controller";
import { AuthMiddleware } from "../middlewares";
import { UserService } from "../services";

export class UserRoutes {


    static get routes(): Router {

        const router = Router();

        const userService = new UserService();
        const controller = new UserController(userService);

        router.get( "/user/", [ AuthMiddleware.validateJWT ], controller.getUser );
        router.put( "/user/", [ AuthMiddleware.validateJWT ], controller.updateUser );

        return router;
    }
}