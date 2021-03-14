/*jshint globalstrict: true, devel: true, node: true*/
'use strict';

const dotenv = require('dotenv')
const app = require('express')();
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const cors = require("cors");

const cocktailsRoutes = require('./routes/cocktailsRoutes');
const authRoutes = require('./routes/authRoutes');
const commentsRoutes = require('./routes/commentsRoutes');

dotenv.config();
app.use(cors());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res, nex) => {
    res.status(200).send({
        name: 'Express API for Cocktailer',
        version: '0.0.1',
        author: 'Michał Tangri',
    }).end();
});

app.use('/api/cocktails', cocktailsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comments', commentsRoutes);

app.listen(process.env.PORT || 9666, function () {
    console.log(`Application started on PORT: ${process.env.PORT || 9666}`);
});

process.on('SIGINT', function () {
    console.log("Application shutting down...");
    process.exit();
});