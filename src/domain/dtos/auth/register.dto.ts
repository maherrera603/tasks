import { regular_exp } from "../../../config";

export class RegisterDTO {

    private constructor(
        public readonly name: string,
        public readonly last_name: string,
        public readonly phone: string,
        public readonly email: string,
        public readonly password: string,
    ){}


    static create(object: {[key: string]:any}): [string?, RegisterDTO?]{
        const {name, last_name, phone, email, password} = object;

        if(!name) return ["Missing name"];

        if(!last_name) return ["Missing last_name"];

        if(!phone) return ["Missing phone"];

        if(!email) return ["Missing email"];

        if(!regular_exp.email.test(email) ) return ["Invalid format email"];

        if(!password) return ["Missing password"];

        if(password.length < 7) return ["password to short, contain  les 8 characters"];

        if(password.length > 12) return ["Password to long, contain less 12 characters"];
        
        if( !regular_exp.password.test(password) ) 
            return ["Incorrect password, password must have 1 uppercase character, 1 lowercase character and 1 special character"];
        
        return [ undefined, new RegisterDTO(name, last_name, phone, email, password) ];
    }
}