const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, trim: true},
    email: {type: String, unique: true, trim: true},
    password: {type: String, required: true},
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, obj) => {
            delete obj._id
            delete obj.password
            delete obj.createdAt
            delete obj.updatedAt

            return obj
        },
        versionKey: false,
        virtuals: true
    }
});

module.exports = mongoose.model('user', userSchema);