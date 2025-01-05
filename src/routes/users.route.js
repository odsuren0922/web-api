// routes/users.js
const express = require('express');
const router = express.Router();
const userControllers = require("../controllers/users.controller");

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registers a new user
 *     description: Creates a new user account with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Invalid input data.
 *       500:
 *         description: Internal server error.
 */
router.post('/register', userControllers.register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Logs in an existing user
 *     description: Authenticates the user with the provided credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully, returns user data.
 *       401:
 *         description: Unauthorized, invalid credentials.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', userControllers.login);

module.exports = router;
