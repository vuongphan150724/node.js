const categoryServices = require('../services/CategoryServices');

exports.getAll = async() => {
    const categories = await categoryServices.getAll();
    return categories;
}

// exports.create = async(name) => {
//     const category = await categoryServices.create(name);
//     return category;
// }

exports.create = async(name) => {
    try {
        const category = await categoryServices.create(name);
        return category;
    } catch (error) {
        console.log(error)
    }
}

exports.update = async(id, name) => {
    try {
        const category = await categoryServices.update(id, name);
        return category;
    } catch (error) {
        console.log(error)
    }
}

exports.delete = async(id) => {
    try {
        const category = await categoryServices.delete(id);
        return category;
    } catch (error) {
        console.log(error)
    }
}