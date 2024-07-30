var express = require('express');
var router = express.Router();
const categoryController = require('../controller/CategoryController');

router.get('/api/categories', async function(req, res, next) {
    try {
        const result = await categoryController.getAll();
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(414).json({ error: error.message });
    }
})

router.post('/api/categories', async function(req, res, next) {
    try {
        let { name } = req.body;
        const category = await categoryController.create(name);
        res.status(200).json({ category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


//http://127.0.0.1:3000/catagories/api/categories:id
router.put('/api/categories/:id', async function(req, res, next) {
    try {
        let { id } = req.params;
        let { name } = req.body;
        const category = await categoryController.update(id, name);
        res.status(200).json({ category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.delete('/api/categories/:id', async function(req, res, next) {
    try {
        let { id } = req.params;
        await categoryController.delete(id);
        res.status(200).json({ status: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
router.get('/api/products/:id', async function(req, res, next) {
    try {
        const result = await productServices.getByID(req.params.id);
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(414).json({ error: error.message });
    }
})
module.exports = router;