const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { validateKey } = require('../keyValidator');

router.post('/', (req, res) => {
    validateKey(req, res, authController.authenticate);
});

router.post('/validate', (req, res) => {
    validateKey(req, res, authController.validateToken);
});

module.exports = router;