import { Field, ID, ObjectType } from "type-graphql";
import { IUser } from "./User.model";

@ObjectType()
class UserSchema implements IUser{

    @Field(type => ID)
    _id: any

    @Field({nullable: true})
    name: string;

    @Field({nullable: true})
    email: string;

    @Field({nullable: true})
    password: string;
}

export default UserSchema