const router = require('express').Router();
const { listProducts, getProduct, applyProduct, myApplications } = require('../controllers/productControllers');
const authMiddleware = require('../middleware/authMiddleware');

// Public — catalog browsing (navbar mega-menu / info pages)
router.get('/', listProducts);

// Protected — must come before '/:slug' so 'applications' isn't treated as a slug
router.get('/applications/mine', authMiddleware, myApplications);
router.post('/apply', authMiddleware, applyProduct);

// Public — single product detail
router.get('/:slug', getProduct);

module.exports = router;
