import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql';
import TweetSchema from './Tweet.schema';
import TweetModel from './Tweet.model';

@Resolver(TweetSchema)
class TweetController {

    @Query(returns => [TweetSchema], {name: 'twetts'})
    @Authorized()
    async find(){
        const tweet = await TweetModel.find()
        
        return tweet
    }

    @Query(returns => TweetSchema, {name: 'twett'})
    @Authorized()
    async findById(
        @Arg('id') id:string
    ){
        const tweet = await TweetModel.findById(id)

        if(!tweet){
            throw new Error('Tweet does not exist')
        }

        return tweet
    }

    @Mutation(returns => TweetSchema, {name: 'createTwetts'})
    @Authorized()
    async create(
        @Arg('author') author: string,
        @Arg('description') description: string
    ){
        const tweet = await TweetModel.create({author, description})

        return tweet
    }

    @Mutation(returns => TweetSchema)
    @Authorized()
    async upvoteTweet(
        @Arg('id') id:string
    ){
        const tweet = await TweetModel.findById(id)

        if(!tweet){
            throw new Error('Tweet does not exist')
        }

        tweet.set({likes: tweet.likes + 1})

        await tweet.save()

        return tweet
    }

    @Mutation(returns => TweetSchema)
    @Authorized()
    async downvoteTweet(
        @Arg('id') id:string
    ){
        const tweet = await TweetModel.findById(id)

        if(!tweet){
            throw new Error('Tweet does not exist')
        }

        tweet.set({likes: tweet.likes - 1})

        await tweet.save()

        return tweet
    }
}

export default TweetController