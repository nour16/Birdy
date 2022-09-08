const express = require("express");
const Users = require("./entities/users.js");
var datastore = require('nedb');
const { resolve } = require("path");

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
    db.users = new datastore("./src/users.db");//les utilisateurs seront stockés dans ce fichier
    db.users.loadDatabase();
    const users = new Users.default(db);
    //pour se  connecter
    router.post("/user/login", async (req, res) => {
        try {
            const { login, password } = req.body;
            // Erreur sur la requête HTTP
            if (!login || !password) {
                res.status(400).json({
                    status: 400,
                    message: "Requête invalide : login et password nécessaires"
                });
                return;
            }
            await users.exists(login)
            .then((rep)=>{
                console.log("user existant")
            })
            .catch((err) =>{
                res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                })
                return
            });
             users.checkpassword(login, password)
            .then((user_ok) =>{

                //login
                req.session.regenerate(function (err) {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Erreur interne"
                        });
                    }
                
                    else {
                        // C'est bon, nouvelle session créée
                        req.session.user = user_ok
                        res.status(200).json({
                            status: 200,
                            message: "Login et mot de passe accepté",
                            body :req.session.user

                        })
                    }
                });
                
            })
            
            .catch((err) =>{
                // Faux password : destruction de la session et erreur
                req.session.destroy((err) => { });
                res.status(403).json({
                    status: 403,
                    message: "mot de passe invalide(s)"
                })
                return
            }) ;

        }
        catch (e) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    });

    //logout
    router.delete("/user/logout/:user_id", (req, res, next) =>{
        req.session.destroy((err) => {
            if(err){
                res.status(400).json({
                    status: 400,
                    message: "Incapable de se deconnecter"
                  
                });
            }
            else{
                res.status(200).json({
                    status: 200,
                    message: "deconnexion reussie"
                  
                });
            }
        })
        
    })

    //inscription d'un nouveau user
    router.post("/user", (req, res) => {
        const { login, password, lastname, firstname } = req.body;
        if (!login || !password || !lastname || !firstname) {
            res.status(400).send("Missing fields");
        } else {
            users.create(login, password, lastname, firstname)
                .then((user) => 
                    res.status(201).send(user)
                )
                .catch((err) =>{
                    if(!err){
                        res.status(401).send("Login existant")
                    }
                    else{
                        res.status(500).send(err)
                    }
                    return;
                });
        }
    });

    router.get("/user/get/:user_id", async (req, res) => {
        try {
            await users.get(req.params.user_id)
                .then((user) => {
                    res.status(201).send(user)
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

    router.get("/user/:login", async (req, res) => {
        try {
            await users.get_by_login(req.params.login)
                .then((user) => {
                    res.status(201).send(user)
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

    return router;
}
exports.default = init;

