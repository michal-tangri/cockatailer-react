const fs = require('fs');
const { nanoid } = require('nanoid');

var cocktails = require('../data/cocktails.json');

exports.getAllCocktails = (req, res) => {
    return res.status(200).send(cocktails).end();
}

exports.getSingleCocktail = (req, res) => {
    const cocktail = cocktails.find(cocktail => cocktail.id === req.params.id)
    if (cocktail === undefined)
        return res.status(404).send('Provided cocktail ID does not exist.').end();
    return res.status(200).send(cocktail).end();
}

exports.saveCocktail = (req, res) => {

    const file = req.file;

    if (file.mimetype !== 'application/json')
        return res.status(400).send('Invalid file format. Must provide JSON.')
    
    const newCocktails = JSON.parse(file.buffer.toString());

    for (let cocktail of newCocktails) {
        cocktails.push({
            id: nanoid(12),
            photo: cocktail.photo,
            name: cocktail.name,
            alcohol: cocktail.alcohol,
            glass: cocktail.glass,
            ingredients: cocktail.ingredients,
            instructions: cocktail.instructions
        });
    }

    fs.writeFileSync('./data/cocktails.json', JSON.stringify(cocktails));

    return res.status(200).send({ error: false, message: 'Cocktails successfully added to database.'}).end();
}

exports.removeCocktail = (req, res) => {
    const index = cocktails.findIndex(cocktail => cocktail.id === req.params.id)
    if (index === -1)
        return res.status(404).send('No such cocktail').end();

    cocktails = cocktails.filter(cocktail => cocktail.id !== req.params.id);
    fs.writeFileSync('./data/cocktails.json', JSON.stringify(cocktails));

    return res.status(200).send('Cocktail deleted').end();
    
}