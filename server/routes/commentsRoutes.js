const express = require('express');
const router = express.Router();

const commentsController = require('../controllers/commentsController');
const { validateKey } = require('../keyValidator');

router.get('/unapproved', (req, res) => {
    validateKey(req, res, commentsController.getCommentsForApproval);
});

router.get('/:id', (req, res) => {
    validateKey(req, res, commentsController.getCommentsForCocktail);
});

router.post('/unapproved/:id', (req, res) => {
    validateKey(req, res, commentsController.approveComment);
});

router.delete('/unapproved/:id', (req, res) => {
    validateKey(req, res, commentsController.deleteComment);
});

router.post('/:id', (req, res) => {
    validateKey(req, res, commentsController.addCommentForCocktail);
});

module.exports = router;