const db = require('../config/db');

// GET /products?category=Loans   (category is optional)
const listProducts = async (req, res) => {
    const { category } = req.query;
    try {
        const result = category
            ? await db.query(
                'select slug, category, icon, title, tagline, description, highlights, stats, cta_label from products where is_active = true and category = $1 order by id',
                [category]
            )
            : await db.query(
                'select slug, category, icon, title, tagline, description, highlights, stats, cta_label from products where is_active = true order by id'
            );

        return res.status(200).send({ products: result.rows, message: 'Retrieval Success' });
    } catch (err) {
        return res.status(500).send({ message: 'Database Error!' });
    }
};

// GET /products/:slug
const getProduct = async (req, res) => {
    const { slug } = req.params;
    try {
        const result = await db.query(
            'select slug, category, icon, title, tagline, description, highlights, stats, cta_label from products where slug = $1 and is_active = true',
            [slug]
        );

        if (result.rows.length === 0)
            return res.status(404).send({ message: 'Product not found!' });

        return res.status(200).send({ product: result.rows[0], message: 'Retrieval Success' });
    } catch (err) {
        return res.status(500).send({ message: 'Database Error!' });
    }
};

// POST /products/apply   (authMiddleware required — req.user.user_id)
const applyProduct = async (req, res) => {
    const user_id = req.user.user_id;
    const { product_slug, amount, notes } = req.body;

    if (!product_slug)
        return res.status(400).send({ message: 'Insufficient details!' });

    try {
        const product = await db.query('select slug from products where slug = $1 and is_active = true', [product_slug]);
        if (product.rows.length === 0)
            return res.status(404).send({ message: 'Product not found!' });

        const result = await db.query(
            'insert into product_applications (user_id, product_slug, amount, notes) values ($1, $2, $3, $4) returning id, status, created_at',
            [user_id, product_slug, amount || null, notes || null]
        );

        return res.status(201).send({ application: result.rows[0], message: 'Application Submitted!' });
    } catch (err) {
        return res.status(500).send({ message: 'Database Error!' });
    }
};

// GET /products/applications/mine   (authMiddleware required — req.user.user_id)
const myApplications = async (req, res) => {
    const user_id = req.user.user_id;
    try {
        const result = await db.query(
            `select a.id, a.product_slug, p.title, p.category, a.amount, a.notes, a.status, a.created_at
             from product_applications a
             join products p on p.slug = a.product_slug
             where a.user_id = $1
             order by a.created_at desc`,
            [user_id]
        );

        return res.status(200).send({ applications: result.rows, message: 'Retrieval Success' });
    } catch (err) {
        return res.status(500).send({ message: 'Database Error!' });
    }
};

module.exports = { listProducts, getProduct, applyProduct, myApplications };
