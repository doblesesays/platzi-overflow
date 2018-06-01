import express from 'express';
import Debug from 'debug';
import jwt from 'jsonwebtoken'

const app = express.Router()
const debug = new Debug('platzi-overflow:auth')

const secret = 'clavesecreta'

const users = [{
    firstName: 'Genessis',
    lastName: 'Jimenez',
    email: 'genesis.jz.93@gmail.com',
    password: '0000',
    _id: 123
}]

//const findUserByEmail = e => users.find(({ email }) => email === e)

function comparePasswords(providedPassword, userPassword) {
    return providedPassword === userPassword
}

// ESTO ES EQUIVALENTE A LA SENTENCIA DE ARRIBA
 function findUserByEmail(email) {
     return users.find(user=> user.email === email)
 }

app.post('/signin', (req, res, next) => {
    const {email, password} = req.body
    const user = findUserByEmail(email)

    if (!user) {
        debug('user with email ${email} not found')
        return handleLoginFailed(res)
    }

    if (!comparePasswords(password, user.password)) {
        debug('Password dont match ${password} !== ${user.password}')
        return handleLoginFailed(res, 'El correo y la contraseña no coinciden.')
    }

    const token = createToken(user)
    res.status(200).json({
        message: 'Login succeded',
        token,
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    })
})

const createToken = (user) => jwt.sign({user}, secret, {expiresIn: 86400})

// /api/auth/signup
app.post('/signup', (req, res) => {
    const {firstName, lastName, email, password} = req.body
    const user = {
        _id: +new Date(),
        firstName,
        lastName,
        email,
        password
    }
    debug(`Creating new user ${user}`)
    users.push(user)
    const token = createToken(user)
    res.status(201).json({
        message: 'User saved',
        token,
        userId: user._id,
        firstName,
        lastName,
        email
    })    
});

function handleLoginFailed(res, message) {
    return res.status(401).json({
        message: 'Login failed',
        error: message || 'email or password dont match'
    })
}

export default app
