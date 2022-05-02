require('dotenv').config()
const mongoose = require('mongoose')

const databaseConnection = require('../connection')
let productsData = require('./products.json')
let categoriesData = require('./categories.json')

class SeedDatabase {
    constructor() {
        databaseConnection.connectMongodb()
        this.models = databaseConnection.getMongoModels()
    }

    async insertCategories(categories) {
        console.log(`Inserting ${categories.length} Categories:`)
        await this.models.category.insertMany(categories)
        console.log(`==========================================`)
    }

    async insertProducts(products) {
        console.log(`Inserting ${products.length} Products:`)
        await this.models.product.insertMany(products)
        console.log(`==========================================`)
    }

    endProcess() {
        databaseConnection.disconnectMongodb()
        process.exit()
    }

    // Convert id to objectId that are not recognized by the JSON file
    convertIdToObjectId(items) {
        return items.map((item) => {
            return {
                ...item,
                _id: new mongoose.Types.ObjectId(item._id),
                ...(item.categoryId && {categoryId: new mongoose.Types.ObjectId(item.categoryId)}),
                ...(item.parentId && {parentId: new mongoose.Types.ObjectId(item.parentId)}),
            }
        })
    }
}

async function main() {
    const seedDatabase = new SeedDatabase();

    try {
        categoriesData = seedDatabase.convertIdToObjectId(categoriesData)
        productsData = seedDatabase.convertIdToObjectId(productsData)

        await seedDatabase.insertCategories(categoriesData)
        await seedDatabase.insertProducts(productsData)
    } catch (e) {
        console.log(`Inserting data failed due to an error: ${e.message}`)
    } finally {
        seedDatabase.endProcess()
    }
}

main()