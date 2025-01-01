import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { envs } from "./envs";

export class BcryptAdapter {


    static hash( password: string) {
        const salt = genSaltSync(envs.HASH_SALT);
        return hashSync(password, salt);
    }

    static compare(password: string, hashed: string) {
        return compareSync(password, hashed);
    }
    
}