import { regular_exp } from "../../../config";

export class LoginDTO {
    
    private constructor(
        public email: string,
        public password: string,
    ){}


    static create(object: { [key: string]: any}): [string?, LoginDTO?]{
        const {email, password} = object;

        if(!email) return ["Missing email"];

        if(!regular_exp.email.test(email)) return ["Invalid format email"];

        if(!password) return ["Missing password"];

        if(password.length < 8) return ["password to short, contain  les 8 characters"];

        if (password.length > 12) return ["Password to long, contain less 12 characters"];
        
        if(!regular_exp.password.test(password)) return ["Incorrect password, password must have 1 uppercase character, 1 lowercase character and 1 special character"]

        return [undefined, new LoginDTO(email, password)];
    }
}