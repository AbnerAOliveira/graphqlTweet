
import { ITweet } from './Tweet.model';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
class TweetSchema implements ITweet {

  @Field(type => ID)
  id: any;
  
  @Field({ nullable: true })
  author: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  likes: number;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}

@ObjectType()
export class TweetPagination{

  @Field(type =>  [TweetSchema])
  tweets: TweetSchema[];

  @Field()
  totalPages: number;
}

export default TweetSchema;