const express = require('express')
const router = express.Router();
const { upload } = require('../middleware/upload')
const {
    getItem,
    getItems,
    createItem,
    deleteItem,
    updateItem,
    sales,
    orders
} = require('../controllers/shopController')

const requireAuth = require('../middleware/requireAuth')

// Require auth 
router.use(requireAuth);


//Find sells by the user
router.get('/sales', sales);

// Find orders by the user
router.get('/orders', orders);

// GET All Items
router.get('/', getItems);

// GET Single Item
router.get('/:id', getItem);

// POST Item
router.post('/',  upload.single("image"),  createItem);

// Delete Item
router.delete('/:id', deleteItem);

// Update Item
router.patch('/:id', updateItem);


module.exports = router;
