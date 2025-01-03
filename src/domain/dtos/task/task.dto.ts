export class TaskDTO {

    private constructor(
        public task: string,
        public description: string,
        public finished_task: Date,
        public user:string,
        public status?: boolean,
    ){}


    static create(object: {[key: string]: any}, user: string): [string?, TaskDTO?]{

        const { task, description, finished_task } = object;
        
        if(!task) return ["Missing task"];
        
        if(!description) return ["Missing description"];

        if(!finished_task) return ["Missing finished_task"];

        if(!user) return ["Missing user"];
        
        return[undefined, new TaskDTO(task, description, finished_task, user)];
    }

}