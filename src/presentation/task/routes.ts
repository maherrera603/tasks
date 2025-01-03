import { Router } from "express";
import { TaskController } from "./controller";

export class TaskRouter{


    static get routes() :Router {
        const router = Router();
        
        const controller = new TaskController();

        router.get("/tasks/", controller.allTasks);
        router.get("/tasks/:id", controller.getTask);
        router.post("/tasks/", controller.createTask);
        router.put("/tasks/:id", controller.updateTask);
        router.delete("/tasks/:id", controller.deleteTask);

        return router;
    }
}