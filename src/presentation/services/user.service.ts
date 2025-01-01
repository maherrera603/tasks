import { UserDTO } from './../../domain/dtos/user/user.dto';
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


    async updatedUser( userDto: UserDTO, id: string) {

        const existsUser = await UserModel.findById(id);
        if(!existsUser) throw CustomError.notFound("user not exist");

        try {
            const {name, last_name, phone} = userDto;
            const updateUser = await UserModel.findByIdAndUpdate({_id: id}, {name, last_name, phone }, {new: true});
            
            return {  user: updateUser}

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }

    }
}