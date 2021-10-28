import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        unique: true
    },
    roles: [{
        ref: 'Role',
        type: Schema.Types.ObjectId
    }]

}, {
    timestamps: true,
    versionKey: false
});

userSchema.statics.encryptPassword = async password => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
        // return password
    } catch (err) {
        console.log('err', err);
    }


};
userSchema.statics.comparePassword = async(password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}



export default model('User', userSchema);