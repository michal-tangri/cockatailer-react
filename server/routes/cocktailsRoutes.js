const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() })

const cocktailsController = require('../controllers/cocktailsController');
const { validateKey } = require('../keyValidator');

router.get('/', (req, res) => {
    validateKey(req, res, cocktailsController.getAllCocktails);
});

router.get('/:id', (req, res) => {
    validateKey(req, res, cocktailsController.getSingleCocktail);
});

router.post('/', upload.single('file'), (req, res) => {
    validateKey(req, res, cocktailsController.saveCocktail);
});

router.delete('/:id', (req, res) => {
    validateKey(req, res, cocktailsController.removeCocktail);
});

module.exports = router;