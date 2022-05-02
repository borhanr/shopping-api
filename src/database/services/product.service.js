class CategoryService {
    constructor(models) {
        this.models = models;
    }

    listProductsByCategoryId = async (categoryId) => {
        return await this.models.product.find({
            categoryId
        })
    }

    checkProductExistById = async (productId) => {
        const isExist = await this.models.product.findOne({
            _id: productId
        })
        return !!isExist;
    }

    getProductById = async (productId) => {
        return await this.models.product.findOne({
            _id: productId
        })
    }
}

module.exports = CategoryService;