const productServices = require('../services/ProductServices');

exports.getAll = async(query) => {
    const products = await productServices.getAll(query);
    return products;
}

exports.create = async(name, description, old_price, new_price, image, viewed) => {
    try {
        const product = await productServices.create(name, description, old_price, new_price, image, viewed);
        return product;
    } catch (error) {
        console.log(error)
    }
}

exports.update = async(id, name, description, old_price, new_price, image, viewed) => {
    try {
        const product = await productServices.update(id, name, description, old_price, new_price, image, viewed);
        return product;
    } catch (error) {
        console.log(error)
    }
}

exports.delete = async(id) => {
    try {
        const product = await productServices.delete(id);
        return product;
    } catch (error) {
        console.log(error)
    }
}
module.exports.getByID = async(id) => {
    try {
        const product = await productModel.findById(id);
        return product;
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw new Error('Failed to fetch product by ID');
    }
};