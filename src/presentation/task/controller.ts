import { Request, Response } from "express";
import { CustomError, TaskDTO } from "../../domain";
import { TaskService } from "../services";



export class TaskController {

    constructor(private taskService: TaskService){}

    private handleError( error: unknown, res: Response) {

        if( error instanceof CustomError) return res.status(error.statusCode).json({error: error.message});
        return res.status(500).json({error: "Internal Server"});
    }

    public allTasks = (req: Request, res: Response) => {    
        const { id } = req.body.user;
        if(!id) {
            res.status(403).json({ error: "User unathorized"});
            return;
        }


        this.taskService.allTasks(id)
            .then( response => res.json(response))
            .catch( error => this.handleError(error, res))
    }


    public getTask = (req: Request, res: Response) => {
        const { id } = req.params;

        this.taskService.getTask( id )
            .then( response => res.json( response))
            .catch( error => this.handleError(error, res))
    }


    public createTask = (req: Request, res: Response) => {
        const [error, taskDto] = TaskDTO.create(req.body, req.body.user.id);
        if(error) {
            res.status(400).json({error});
            return;
        }

        this.taskService.create( taskDto! )
            .then( response => res.json(response))
            .catch( error => this.handleError( error, res));

    }


    public updateTask = (req: Request, res: Response) => {
        const [error, taskDto] = TaskDTO.update(req.body, req.body.user.id);
        if(error) {
            res.status(400).json({error});
            return;
        }

        const  { id } = req.params;
        this.taskService.updateTask(taskDto!, id)
            .then( response => res.json(response))
            .catch( error  => this.handleError(error, res));

    }


    public deleteTask = (req: Request, res: Response) => {
        const { id } = req.params;


        this.taskService.deleteTask(id)
            .then( response => res.json( response ))
            .catch( error => this.handleError(error, res));

    }

}