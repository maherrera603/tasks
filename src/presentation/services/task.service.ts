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

    public async getTask(id: string) {
        try {
            const task = await TaskModel.findById(id);
            if(!task) throw CustomError.notFound(`task not found with id: ${id}`)
            
            return { task }
        } catch (error) {
            throw CustomError.notFound(`task not found with id: ${id}`)
        }
    }


    public async updateTask(taskDto: TaskDTO, idTask: string){

        const existsTask = await TaskModel.findById( idTask );
        if (!existsTask) throw CustomError.notFound(`Task Not found with id: ${idTask}`);

        try {
            const task = await TaskModel.findByIdAndUpdate( 
                idTask, {
                    ...taskDto
                }, 
                {new: true }
            );

            return { task }

        } catch (error) {
            throw CustomError.internalServer("Internal Server Error");
        }



    }

    public async deleteTask( id: string ){

        try {
            const task = await TaskModel.findById(id);

            if(!task) throw CustomError.notFound(`Task not found with id: ${id}`);

            const { deletedCount } = await TaskModel.deleteOne({_id:id});
                       
            return { delete: deletedCount > 0, task }

        } catch (error) {
            
            throw CustomError.notFound(`Task not found with id: ${id}`);
        }

    }

}