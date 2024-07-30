var express = require('express');
var router = express.Router();
const productController = require('../controller/ProductController');
const productServices = require('../services/ProductServices');
const authen = require('../middleware/authen');


router.get('/api/products', async function(req, res, next) {
    try {
        const result = await productController.getAll(req.query);
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(414).json({ error: error.message });
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

router.post('/api/products', async function(req, res, next) {
    try {
        let { name, description, old_price, new_price, image, viewed } = req.body;
        const product = await productController.create(name, description, old_price, new_price, image, viewed);
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.put('/api/products/:id', async function(req, res, next) {
    try {
        let { id } = req.params;
        let { name, description, old_price, new_price, image, viewed } = req.body;
        const product = await productController.update(id, name, description, old_price, new_price, image, viewed);
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.delete('/api/products/:id', async function(req, res, next) {
    try {
        let { id } = req.params;
        await productController.delete(id);
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
});

module.exports = router;