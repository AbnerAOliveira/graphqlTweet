
import { buildSchemaSync } from 'type-graphql';

import Tweet from '../../modules/tweets/Tweet.model';
import TweetController from '../../modules/tweets/Tweet.controller';

import UserController from '../../modules/users/User.controller';
import User from '../../modules/users/User.model'

import AuthSchema from '../authentication/Auth.schema';
import AuthController from '../authentication/Auth.controller';
import AuthMiddleware from '../authentication/Auth.middleware';

const schema = buildSchemaSync({
  resolvers: [Tweet, TweetController, User, UserController, AuthSchema, AuthController],
  authChecker: AuthMiddleware
})

export default schema;