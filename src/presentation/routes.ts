import { Router } from "express";
import { AuthRoutes } from "./auth";
import { UserRoutes } from "./user";
import { TaskRouter } from "./task";

export class AppRoutes {

    static get routes(): Router{
        const router = Router();
        
        const apiEndPoint = "/api/v1";
        router.use( apiEndPoint, AuthRoutes.routes );
        router.use( apiEndPoint, UserRoutes.routes );
        router.use( apiEndPoint, TaskRouter.routes );
        

        return router;
    }
}