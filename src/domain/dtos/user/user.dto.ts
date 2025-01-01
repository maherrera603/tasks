import { regular_exp } from "../../../config";

export class UserDTO{

    private constructor(
        public name?:string,
        public last_name?:string,
        public phone?: string,
        public email?: string,
        public password?:string,
    ){}

    static update( object: {[key:string]: any}): [string?, UserDTO?]{

        const {name, last_name, phone} = object;

        if(!name) return ["Missing name"];

        if(!last_name) return ["Missing last_name"];

        if(!phone) return ["Missing phone"];

        if(!regular_exp.phone.test(phone)) return ["invalid phone number format"];


        return [undefined, new UserDTO(name, last_name, phone)];
    }
}