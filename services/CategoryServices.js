const categoryModel = require('../models/CategoryModels');

exports.getAll = async() => {
    const categories = await categoryModel.find({})
    return categories;
}

exports.create = async(name) => {
    const model = new categoryModel({ name });
    await model.save();
    return model;
}

exports.update = async(id, name) => {
    const model = await categoryModel.findByIdAndUpdate(id, { name });
    return model;
}

exports.delete = async(id) => {
    await categoryModel.deleteOne({ _id: id });
    return model;
}