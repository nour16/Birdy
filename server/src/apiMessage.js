const express = require("express");
const Messages = require("./entities/messages.js");
const Users = require("./entities/users.js");
var datastore = require('nedb');
const { resolve } = require("path");
const { default: messages } = require("./entities/messages.js");

function init(db) {
    const router = express.Router();
    // On utilise JSON
    router.use(express.json());
    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });
    //creer la bd
    db.messages = new datastore("./src/messages.db");//les messages seront stockés dans ce fichier
    db.messages.loadDatabase();
    const messages = new Messages.default(db);
    db.users.loadDatabase();
    const users = new Users.default(db);

    //creer un nouveau message
    router
    .route("/message")
    .post((req, res) => {
        const {author_id, author_login, author_lastname, author_firstname,content, date} = req.body;
        if (!content) {//message vide
            res.status(400).send("Empty message");
        } else {
            messages.create(author_id, author_login, author_lastname, author_firstname,content, date)
                .then((mes) => {
                    res.status(201).send(mes)
                })
                .catch((err) =>{

                    res.status(500).send(err)
                    return;
                });
        }
    });
    //Afficher tous les messages dans la base de données 
    router
    .route("/message")
    .get(async (req, res) => {
        console.log(req.data)
        try {
            await messages.get()
                .then((mes) => {
                    res.status(201).send(mes)
                })
                .catch((err) =>{
                    res.status(500).send(err)
                    return;
                });
                          
        }
        catch (e) {
            res.status(500).send(e);
        }
    })

    //Afficher que les messages d'un user particulier
    router
    .route("/message/:author_id")
    .get(async (req, res) => {
        try {
            await messages.get_messages_by_id(req.params.author_id)
                .then((mes) => {
                    res.status(201).send(mes)
                })
                .catch((err) =>{
                    res.status(500).send(err)
                    return;
                });
                          
        }
        catch (e) {
            res.status(500).send(e);
        }
    })
    //Afficher que les messages des amis d'un user
    router
    .route("/message/:author_id/:friend_login")
    .get(async (req, res) => {
        try {
            await users.get_by_login(req.params.friend_login).
            then(async (usr_friend)=>{
                await messages.get_messages_by_id(usr_friend._id)
                .then((mes) => {
                    res.status(201).send(mes)
                })
                .catch((err) =>{
                    res.status(500).send(err)
                    return;
                });
            })
            .catch((err) =>{
                res.status(500).send(err)
                return;
            });
                          
        }
        catch (e) {
            res.status(500).send(e);
        }
    })
    //supprimer un message
    router
    .route("/message")
    .delete(async (req, res) => {
        const {id} = req.body
        try{
            await messages.delete(id)
            .then((mes) => {
                res.status(201).send(mes)
            })
            .catch((err) =>{
                res.status(500).send(err)
                return;
            });
        }
        catch (e){
            res.status(500).send(e);
        }
    });

    return router;
}
exports.default = init;

