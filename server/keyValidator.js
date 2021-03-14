exports.validateKey = (req, res, next) => {
    if (req.query.apikey === process.env.API_KEY)
        return next(req, res);
    return res.status(401).send('Please provide a valid API key as a URL parameter.').end();
}