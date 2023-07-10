const express = require('express')
const router = express.Router();
const {
    getItems, 
    deleteItem, 
    createItem
} = require('../controllers/cartController')
const requireAuth = require('../middleware/requireAuth');


router.use(requireAuth);

router.get('/', getItems)

router.delete('/:id', deleteItem)

router.post('/:id', createItem);

module.exports = router;
