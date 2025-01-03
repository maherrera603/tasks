import { Request, Response } from "express";

export class TaskController {

    constructor(){}


    public allTasks = (req: Request, res: Response) => {

        res.json("allTasks");
    }


    public getTask = (req: Request, res: Response) => {
        res.json("getTasks");
    }


    public createTask = (req: Request, res: Response) => {
        res.json("createTask");
    }


    public updateTask = (req: Request, res: Response) => {
        res.json("updateTasks");
    }


    public deleteTask = (req: Request, res: Response) => {
        res.json("deleteTask")
    }

}