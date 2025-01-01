import { Router } from "express";
import { UserController } from "./controller";
import { AuthMiddleware } from "../middlewares";
import { UserService } from "../services";

export class UserRoutes {


    static get routes(): Router {

        const router = Router();

        const userService = new UserService();
        const controller = new UserController(userService);

        router.use( AuthMiddleware.validateJWT );

        router.get( "/user/", controller.getUser );
        router.put( "/user/", controller.updateUser );

        return router;
    }
}