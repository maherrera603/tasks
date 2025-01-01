import { BcryptAdapter, envs, JWTAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginDTO, RegisterDTO, UserEntity } from "../../domain";

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


    public async loginUser(loginDto: LoginDTO){
        const existUser = await UserModel.findOne({email: loginDto.email});
        if(!existUser) throw CustomError.badRequest("user don't not exists");

        const {password, ...userEntity} = UserEntity.fromObject(existUser);
        const isValidPassword = BcryptAdapter.compare(loginDto.password, password);
        if (!isValidPassword) throw CustomError.badRequest("email and/or password incorrect");

        // generacion del token
        const token = await JWTAdapter.generateToken({
            payload: { user: userEntity.id},
            duration: envs.DURATION_TOKEN,
            jwtSeed: envs.JWT_SEED
        });
        if(!token) return CustomError.internalServer("Error while creating JWT");



        return {
            user: userEntity,
            token
        }
    }

}