import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import './core/database/connection'
import './modules/tweets/Tweet.model'
import './modules/users/User.model'
import schema from './core/schema'

const server = new ApolloServer({
    schema,
    context: ({ req }) => {
        const context = {
            req,
            token: req?.headers?.authorization
        }

        return context
    }
})
server.listen({port: 4100}, () => console.log('Server is running on port 4100'))
