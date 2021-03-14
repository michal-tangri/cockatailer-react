const admins = require('../data/admins');
const bcrypt = require('bcrypt');

exports.authenticate = (req, res) => {
    const admin = admins.find(admin => admin.username === req.body.username);

    if (admin === undefined)
        return res.status(404).send('No such user').end();

    if (req.body.password === undefined)
        return res.status(400).send('You must provide a password').end();

    if (!bcrypt.compareSync(req.body.password, admin.password))
        return res.status(409).send('Invalid password').end();

    return res.status(200).send({ token: admin.token }).end();

}

exports.validateToken = (req, res) => {
    const token = req.body.token;

    if (token === undefined)
        return res.status(409).send({ valid: false, message: 'You must provide a valid token to validate it'}).end();

    const admin = admins.find(admin => admin.token === token);

    if (admin === undefined)
        return res.status(409).send( { valid: false, message: 'No known token matches the provided one'}).end();

    return res.status(200).send({ valid: true, message: ''});
}