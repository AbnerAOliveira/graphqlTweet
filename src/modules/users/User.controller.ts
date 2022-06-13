import { Arg, Mutation, Query, Resolver } from "type-graphql";
import UserSchema from "./User.schema";
import UserModel from "./User.model";
import { hash } from "bcryptjs";

@Resolver(UserSchema)
class UserController {

    @Query(returns => [UserSchema], {name: 'users'})
    async find(){
        const users = await UserModel.find().select([
            'id',
            'name',
            'email',
            'createdAt',
            'updatedAt'
        ])

        if(!users){
            throw new Error('Ops sem usuários =D')
        }
        return users
    }

    
    @Query(returns => UserSchema, {name: 'user'})
    async findById(
        @Arg('id') id: string
    ){
        const user = await UserModel.findById(id)

        if(!user){
            throw new Error('Ops sem usuário =D')
        }
        return user
    }

    @Mutation(returns => UserSchema, {name: 'createUser'})
    async create(
        @Arg('name') name: string,
        @Arg('email') email: string,
        @Arg('password') password: string
    ){
        const hashedPassword = await hash(password, 8)
        const user = await UserModel.create({name, email, password: hashedPassword})

        if(!user){
            throw new Error('Erro na comunicação com o banco de dados')
        }

        return user;
    }
}

export default UserController