const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartProductsSchema = new Schema({
    productId: {type: Schema.Types.ObjectId, ref: 'product'},
    count: {type: Number, default: 1, min: 1},
}, {
    toJSON: {
        transform: (doc, obj) => {
            delete obj._id
            delete obj.productId
            delete obj.createdAt
            delete obj.updatedAt

            return obj
        },
        versionKey: false,
        virtuals: true
    }
})

// Create a virtual field in the products field
cartProductsSchema.virtual('product', {
    ref: 'product',
    localField: 'productId',
    foreignField: '_id',
    justOne: true
});

const cartSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'user', unique: true},
    products: [cartProductsSchema],
}, {
    timestamps: true,
    toJSON: {
        transform: (doc, obj) => {
            delete obj._id
            delete obj.userId
            delete obj.createdAt
            delete obj.updatedAt

            return obj
        },
        versionKey: false,
        virtuals: true
    }
});

// Populate product field in products array
cartSchema.pre('findOne', function (next) {
    this.populate('products.product');
    next();
})

module.exports = mongoose.model('cart', cartSchema);