const path = require('path');
const api = require('./api.js');
const apiMessage = require('./apiMessage.js');
const apiFriends = require('./apiFriends.js');
const cors = require('cors');


// Détermine le répertoire de base
const basedir = path.normalize(path.dirname(__dirname));
console.debug(`Base directory: ${basedir}`);
express = require('express');
const app = express()//serveur
const session = require("express-session");

app.use(cors({
    credentials: true,
    origin: true
}))

app.use(session({
    secret: "technoweb rocks",

}));

//création de la db
const db = {};
app.use('/api', api.default(db));
app.use('/apiMessage',apiMessage.default(db))
app.use('/apiFriends',apiFriends.default(db))

// Démarre le serveur
app.on('close', () => {
});

exports.default = app;

