import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterDTO, UserEntity } from "../../domain";

export class AuthService {

    constructor(){}

    public async registerUser( registerDto: RegisterDTO){
        const existUser = await UserModel.findOne({ email: registerDto.email});
        if(existUser) throw CustomError.badRequest("email already exist");


        try {
            const user =  new UserModel(registerDto);
            
            user.password = BcryptAdapter.hash(registerDto.password);
            await user.save();

            const {password, ...newUser} = UserEntity.fromObject(user);
            
            return { newUser }
            
        } catch (error) {
            console.log(error)
            throw CustomError.internalServer(`${error}`);
        }




    }

}