import express from 'express'

const app = express.Router()

const question = {
    _id: 1,
    title: 'reutilizar componente',
    description: 'esta es la descripcion de mi pregunta',
    createdAt: new Date(),
    icon: 'devicon-android-plain',
    answers: [],
    user: {
        firstName: 'Genessis',
        lastName: 'Jimenez',
        email: 'genesis.jz.93@gmail.com',
        password: '123456'
    }
}

const questions = new Array(10).fill(question);

// /api/questions
app.get('/', (req, res) => res.status(200).json(questions));

// /api/questions/:id
app.get('/:id', (req, res) => res.status(200).json(question));

export default app

