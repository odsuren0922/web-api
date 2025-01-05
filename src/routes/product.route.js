const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/product.controller');

/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 */
router.post('/create', productControllers.create);

/**
 * @swagger
 * /product/all:
 *   get:
 *     summary: Retrieve a list of all products
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   category:
 *                     type: string
 *                   price:
 *                     type: number
 */
router.get('/all', productControllers.all);

/**
 * @swagger
 * /product/getByCategory/{category}:
 *   get:
 *     summary: Get products by category
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Category of the products to retrieve
 *     responses:
 *       200:
 *         description: A list of products in the specified category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   category:
 *                     type: string
 *                   price:
 *                     type: number
 *       404:
 *         description: Category not found
 */
router.get('/getByCategory/:category', productControllers.getByCategory);

module.exports = router;
