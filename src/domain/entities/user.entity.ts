export class UserEntity {

    private constructor(
        public name: string,
        public last_name: string,
        public email: string,
        public phone: string,
        public password: string,
        public role: string[],
        public id?:string
    ){}

    static fromObject( object: { [key: string]: any}){
        const {id, _id, name, email, last_name, phone,  password, role} = object;


        return new UserEntity(name, last_name, email, phone, password, role, id || _id)

    }
}