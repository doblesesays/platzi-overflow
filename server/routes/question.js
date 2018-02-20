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

// GET /api/questions
app.get('/', (req, res) => {
    // setTimeout(() => {
    //     res.status(200).json(questions)
    // }, 2000);
    res.status(200).json(questions)
});

// GET /api/questions/:id
app.get('/:id', (req, res) => {
    const id = req.params.id;
    const q = questions.find(question => question._id === +id);
    res.status(200).json(q);
});

// POST /api/questions
app.post('/', (req, res) => {
    const question = req.body
    question._id = +new Date()
    question.user = {
        firstName: 'Genessis',
        lastName: 'Jimenez',
        email: 'genesis.jz.93@gmail.com',
        password: '123456'
    }
    question.createdAt = new Date()
    question.answers = []

    questions.push(question)

    res.status(201).json(question)

})

export default app

