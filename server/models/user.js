import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
})

UserSchema.plugin(uniqueValidator);

export default mongoose.model('User', UserSchema);