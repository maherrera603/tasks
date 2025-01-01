import { Router } from "express";
import { AuthRoutes } from "./auth";

export class AppRoutes {

    static get routes(): Router{
        const router = Router();
        

        router.use("/api/v1", AuthRoutes.routes );
        

        return router;
    }
}