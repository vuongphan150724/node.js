const { query } = require('express');
const productModel = require('../models/ProductModels');

exports.getAll = async(query) => {
    console.log(query);

    let limit = 50;
    if (query && Object.keys(query).length !== 0) {
        const { catID, keyword, productType, viewed, limit } = query;
        let queries = {};
        if (keyword) { queries.name = { $regex: new RegExp(keyword, 'i') }; }
        if (catID) { queries.categoryID = catID; }
        if (productType) { queries.productType = productType; }
        console.log(queries);
        if (viewed == 1) {
            products = await productModel.find(queries).sort({ viewed: -1 }).limit(limit).populate('categoryID', '_id name');

        } else {
            products = await productModel.find(queries).limit(limit).populate('categoryID', '_id name');
        }
    } else {
        products = await productModel.find({}).limit(limit).populate('categoryID', '_id name');
    }
    return products;
}

exports.getByID = async(id) => {
    try {
        const product = await productModel.findById(id);
        return product;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw new Error('Failed to fetch product by ID');
    }
};

exports.create = async(name, description, old_price, new_price, image, viewed) => {
    const model = new productModel({ name, description, old_price, new_price, image, viewed });
    await model.save();
    return model;
}

exports.update = async(id, name, description, old_price, new_price, image, viewed) => {
    const model = await productModel.findByIdAndUpdate(id, { name, description, old_price, new_price, image, viewed });
    return model;
}

exports.delete = async(id) => {
    await productModel.deleteOne({ _id: id });
    return model;
}
exports.getByID = async(id) => {
    try {
        const product = await productModel.findById(id);
        return product;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw new Error('Failed to fetch product by ID');
    }
};