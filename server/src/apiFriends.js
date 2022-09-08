const express = require("express");
const Friends = require("./entities/friends.js");
const Users = require("./entities/users.js");
var datastore = require('nedb');
const { resolve } = require("path");
const { default: friends } = require("./entities/friends.js");


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
    db.friends = new datastore("./src/friends.db");//les messages seront stockés dans ce fichier
    db.friends.loadDatabase();
    const friends = new Friends.default(db);
    db.users.loadDatabase();
    const users = new Users.default(db);

    //Ajouter un ami
    router

    .post("/friends/Add_by_login/:user_id/:friend_login", async (req, res) => {
        try{
            //verifier que le potentiel ami est inscrit dans la BD
            await users.exists(req.params.friend_login)
            .then((rep)=>{
                //si il existe alors l'ajouter a notre liste d'amis
                friends.create_friend(req.params.user_id, req.params.friend_login)
                    .then((friend) => {
                        res.status(201).send(friend)
                    })
                    .catch((err) =>{
                        res.status(500).send(err)
                        return;
                    });
            })
            .catch((err) =>{
                res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                })
                return
            });
        }
        catch (e) {
            // Toute autre erreur
            return res.sendStatus(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    })
    //Afficher tous les amis d'un user 
    router
    .route("/friends/Add_by_login/:user_id")
    .get(async (req, res) => {
        console.log(req.params)
        try {
            await friends.get_friends(req.params.user_id)
                .then((amis) => {
                    res.status(201).send(amis)
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
   

    //supprimer un ami
    router
    .route("/friends/Add_by_login/:user_id/:friend_login")
    .delete(async (req, res) => {
        try{
            await friends.delete(req.params.friend_login)
            .then((ami) => {
                res.status(201).send(ami)
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

