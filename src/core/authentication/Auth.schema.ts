import { Field, ObjectType } from "type-graphql";
import UserSchema from "../../modules/users/User.schema";

export interface IUser {
    _id: any;
    name:string;
    email:string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface IAuth{
    token: string;
    user: IUser
}
@ObjectType()
class AuthSchema implements IAuth {

    @Field({nullable: false})
    token: string;

    @Field( type => UserSchema, {nullable: false})
    user: UserSchema;
}

export default AuthSchema