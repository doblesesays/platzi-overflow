import express from 'express';
import Debug from 'debug';
import jwt from 'jsonwebtoken'

const app = express.Router()
const debug = new Debug('platzi-overflow:auth')

const secret = 'clavesecreta'

const users = {
    firstName: 'Genessis',
    lastName: 'Jimenez',
    email: 'genesis.jz.93@gmail.com',
    password: '0000',
    _id: 123
}

const findUserByEmail = e => users.find(({ email }) => email === e)
const comparePassword = (providedPassword, userPassword) => {
    return providedPassword === userPassword
}

// ESTO ES EQUIVALENTE A LA SENTENCIA DE ARRIBA
// function findUserByEmail(email) {
//     return users.find(user=> user.email === email)
// }

app.post('/signin', (res, req, next) => {
    const {email, password} = req.body
    const user = findUserByEmail(email)

    if (!user) {
        debug('user with email ${email} not found')
        return handleLoginFailed(res)
    }

    if (!comparePassword(password, user.password)) {
        debug('Password dont match ${password} !== ${user.password}')
        return handleLoginFailed(res)
    }

    const token = jwt.sign({user}, secret, {expiresIn: 86400})
    res.statusCode(200).json({
        message: 'Login succeded',
        toke,
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    })
})

function handleLoginFailed(res) {
    return res.status(401).json({
        message: 'Login faild',
        error: 'email or password dont match'
    })
}

export default app
