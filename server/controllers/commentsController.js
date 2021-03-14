var cocktails = require('../data/cocktails.json');
var comments = require('../data/comments.json');

const { nanoid } = require('nanoid');

const fs = require('fs');

exports.getCommentsForApproval = (req, res) => {
    const commentsForApproval = comments.filter(comment => comment.approved === false);

    return res.status(200).send(commentsForApproval).end();
}

exports.getCommentsForCocktail = (req, res) => {
    const cocktailId = req.params.id;

    if (cocktails.find(cocktail => cocktail.id === cocktailId) === undefined)
        return res.status(404).send( "No such cocktail in database").end()

    const cocktailComments = comments.filter(comment => comment.cocktailId === cocktailId && comment.approved === true);

    return res.status(200).send(cocktailComments).end();

}

exports.approveComment = (req, res) => {
    const index = comments.findIndex(comment => comment.commentId === req.params.id)
    if (index === -1)
        return res.status(404).send('No such comment').end();

    comments[index].approved = true;

    fs.writeFileSync('./data/comments.json', JSON.stringify(comments));

    return res.status(200).send('Comment approved').end();
    
}

exports.deleteComment = (req, res) => {
    const index = comments.findIndex(comment => comment.commentId === req.params.id)
    if (index === -1)
        return res.status(404).send('No such comment').end();

    comments = comments.filter(comment => comment.commentId !== req.params.id);
    fs.writeFileSync('./data/comments.json', JSON.stringify(comments));

    return res.status(200).send('Comment deleted').end();
    
}


exports.addCommentForCocktail = (req, res) => {
    const cocktailId = req.params.id;

    if (cocktails.find(cocktail => cocktail.id === cocktailId) === undefined)
        return res.status(404).send({ error: true, message: "No such cocktails in database"}).end()

    const name = req.body.name;
    const content = req.body.content;
    const rating = req.body.rating === undefined ? 0 : parseInt(req.body.rating);

    if (name === undefined || content === undefined)
        return res.status(400).send({error: true, message: 'Name and content are required'}).end();

    comments.push({
        commentId: nanoid(10),
        cocktailId: cocktailId,
        name: name,
        content: content,
        rating: rating,
        approved: false
    });

    fs.writeFileSync('./data/comments.json', JSON.stringify(comments));
    
    return res.status(200).send('Comment added to database').end();
}
