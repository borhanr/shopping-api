class CategoryService {
    constructor(models) {
        this.models = models;
    }

    listCategories = async () => {
        return await this.models.category.find({
            parentId: null
        })
    }

    getCategoryById = async (categoryId) => {
        return await this.models.category.findOne({
            _id: categoryId
        })
    }

    checkCategoryExistById = async (categoryId) => {
        const isExist = await this.models.category.findOne({
            _id: categoryId
        })
        return !!isExist;
    }

}

module.exports = CategoryService;