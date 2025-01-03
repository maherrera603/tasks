import { TaskModel } from "../../data";
import { CustomError, TaskDTO } from "../../domain";

export class TaskService {

    constructor(){}


    public async create(taskDto: TaskDTO){
        const existTask = await TaskModel.findOne({task: taskDto.task});
        if (existTask) throw CustomError.badRequest("task Exists");


        try {

            const task = new TaskModel(taskDto);
            await task.save();

            return { task }
            
        } catch (error) {
            console.log(error)
            throw CustomError.internalServer("Internal Server Error");
        }

    }

    public async allTasks( user: string){
        try {
            
            const tasks = await TaskModel.find({user});
            return { tasks }
        } catch (error) {
            throw CustomError.internalServer("Internal Server error")
        }
    }


}