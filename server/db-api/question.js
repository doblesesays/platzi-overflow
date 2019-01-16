import Debug from 'debug'
import { Question } from '../models'

const debug = new Debug('platzi - overflow:db-api:question')

export default {
    findAll: async () => {
        debug('find all questions')
        return await Question.find().populate('answers')
    }
}