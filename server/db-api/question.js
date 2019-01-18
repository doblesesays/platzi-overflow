import Debug from 'debug'
import { Question, Answer } from '../models'

const debug = new Debug('platzi - overflow:db-api:question')

export default {
    findAll: (sort = '-createdAt') => {
        debug('find all questions')
        return Question.find()
            .populate('answers')
            .sort(sort)
    },

    findById: (_id) => {
        debug(`find one question with id ${_id}`)
        return Question.findOne({ _id })
            .populate('user')
            .populate({
                path: 'answers',
                options: { sort: '-createdAt' },
                populate: {
                    path: 'user',
                    model: 'User',
                }
            })
    },

    create: (q) => {
        debug(`creating question ${q}`)
        const question = new Question(q);
        return question.save();
    },

    createAnswer: async (q, a) => {
        const answer = new Answer(a);
        const savedAnswer = await answer.save();
        q.answers.push(savedAnswer);
        await q.save();
        return savedAnswer;
    }
}