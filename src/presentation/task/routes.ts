import { Router } from "express";
import { TaskController } from "./controller";
import { AuthMiddleware } from "../middlewares";
import { TaskService } from "../services";

export class TaskRouter{


    static get routes() :Router {
        const router = Router();

        const taskService = new TaskService();
        
        const controller = new TaskController( taskService );

        router.get("/tasks/", [ AuthMiddleware.validateJWT ], controller.allTasks);
        router.get("/tasks/:id", [ AuthMiddleware.validateJWT ], controller.getTask);
        router.post("/tasks/", [ AuthMiddleware.validateJWT ], controller.createTask);
        router.put("/tasks/:id", [ AuthMiddleware.validateJWT ], controller.updateTask);
        router.delete("/tasks/:id", [ AuthMiddleware.validateJWT ], controller.deleteTask);

        return router;
    }
}