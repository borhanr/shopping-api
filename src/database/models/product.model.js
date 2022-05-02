const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String, trim: true},
    categoryId: {type: Schema.Types.ObjectId, ref: 'category'},
    price: {type: String},
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, obj) => {
            delete obj._id
            delete obj.categoryId
            delete obj.createdAt
            delete obj.updatedAt

            return obj
        },
        versionKey: false,
        virtuals: true
    },
});

module.exports = mongoose.model('product', productSchema);