export class UserEntity {

    private constructor(
        public name: string,
        public email: string,
        public password: string,
        public role: string[],
        public id?:string
    ){}

    static fromObject( object: { [key: string]: any}){
        const {id, _id, name, email, password, role} = object;


        return new UserEntity(name, email, password, role, id || _id)

    }
}