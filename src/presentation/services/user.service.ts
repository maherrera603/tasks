import { UserModel } from "../../data";
import { CustomError, UserEntity } from "../../domain";

export class UserService {

    constructor(){}


    async getUser( id: string) {
        const user = await UserModel.findById(id);
        if(!user) throw CustomError.notFound("User not exists");

        const {password, ...dataUser} = UserEntity.fromObject(user);

        return {
            user: dataUser
        }

    }
}