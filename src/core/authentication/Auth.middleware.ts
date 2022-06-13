import { verify } from "jsonwebtoken";
import { AuthChecker } from "type-graphql"
import AuthConfig from './Auth.config'

interface Context {
    token?: string;
}

const AuthMiddleware:AuthChecker<Context> = ({context}): boolean => {
    const authHeader = context.token
    
    if(!authHeader){
        return false
    }

    const [, token] = authHeader.split(' ')

    try {
        const decoded = verify(token, AuthConfig.jwt.secret)

        return !!decoded
    } catch{
        return false
    }
    
}

export default AuthMiddleware