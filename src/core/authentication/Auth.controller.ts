import { Arg, Mutation, Resolver } from "type-graphql";
import { compare, hash } from "bcryptjs"; 
import AuthSchema from "./Auth.schema";
import UserModel from "../../modules/users/User.model";
import AuthConfig from './Auth.config';
import { sign } from "jsonwebtoken";

@Resolver(AuthSchema)
class AuthController {

    @Mutation(returns => AuthSchema)
    async signIn(
        @Arg('email') email: string,
        @Arg('password') password: string
    ){
        const user = await UserModel.findOne({ email })

        if(!user){
            throw new Error('Email e senha não combinam')
        }

        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched){
            throw new Error('Email e senha não combinam')
        }

        const {secret, expiresIn} = AuthConfig.jwt

        const token = sign({}, secret, {
            subject: `"${user._id}`,
            expiresIn
        })
    
        return {
            token,
            user
        }
    }

}

export default AuthController