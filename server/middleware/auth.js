import Debug from 'debug';
import { secret } from "../config/index";
import jwt from 'jsonwebtoken';

const debug = new Debug('platzi-overflow:auth-middleware')

export const users = [{
    firstName: 'Genessis',
    lastName: 'Jimenez',
    email: 'genesis.jz.93@gmail.com',
    password: '0000',
    _id: 123
}]

 export function findUserByEmail(email) {
     return users.find(user=> user.email === email)
 }

export const required = (req, res, next) => {
    jwt.verify(req.query.token, secret, (err, token) => {
        if (err) {
            debug('JWTF was not encrypted with our secret')
            return res.status(401).json({
                message: 'Unauthorized',
                error: err
            })
        }

        debug(`Token verified ${token}`)
        req.user = token.user
        next()
    })
}