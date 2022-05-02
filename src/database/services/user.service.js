class UserService {
    constructor(models) {
        this.models = models;
    }

    createUser = async (data) => {
        return await this.models.user.create(data)
    }

    checkUserExistByEmail = async (email) => {
        const isExist = await this.models.user.findOne({
            email
        })
        return !!isExist;
    }

    findUserByEmail = async (email) => {
        return await this.models.user.findOne({
            email
        })
    }

    findUserById = async (userId) => {
        return await this.models.user.findOne({
            _id: userId
        })
    }
}

module.exports = UserService;