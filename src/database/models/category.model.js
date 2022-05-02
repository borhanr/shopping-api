const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    parentId: {type: Schema.Types.ObjectId, ref: 'category', default: null},
    name: {type: String, trim: true},
    isShow: {type: Boolean, default: true},
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, obj) => {
            delete obj._id
            delete obj.isShow
            delete obj.parentId
            delete obj.createdAt
            delete obj.updatedAt

            return obj
        },
        versionKey: false,
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

// Create a virtual field to get category child for a hierarchy structure
categorySchema.virtual('child', {
    ref: 'category',
    localField: '_id',
    foreignField: 'parentId'
});

// Populate category child
categorySchema.pre(['find', 'findOne'], function (next) {
    this.populate('child');
    next();
})

module.exports = mongoose.model('category', categorySchema);