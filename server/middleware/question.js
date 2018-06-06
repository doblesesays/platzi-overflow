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

export const questions = new Array(10).fill(question);

export const questionsMiddleware = (req, res, next) => {
    const id = req.params.id;
    req.questions = questions
    next();
}

export const questionMiddleware = (req, res, next) => {
    const id = req.params.id;
    req.question = questions.find(question => question._id === +id);
    next();
}