import axios from 'axios';
import React, {Component} from 'react';
import './css/SignIn.css';

class SignIn extends Component{
    constructor(props){
        super(props)
        this.state = { 
            login : "", 
            password :"",
            lastname:"",
            firstname:"", 
            status :""
        }

        //creer un api user
        this.api = axios.create({
            withCredentials: true,
            baseURL :'http://localhost:4000',
        });
    }
    updateLogin(e){
        this.setState({
            login : e.target.value
        }) 
    }
    updatePassword(e){
        this.setState({
            password : e.target.value
        }) 
    }
    updateFirstName(e){
        this.setState({
            firstname : e.target.value
        }) 
    }
    updateLastName(e){
        this.setState({
            lastname : e.target.value
        }) 
    }
    send = () => {
        this.api.post('api/user',{
            login : this.state.login, 
            password : this.state.password, 
            lastname : this.state.lastname,
            firstname : this.state.firstname
        })
        .then((response)=> {
            this.setState({
                status : "utilisateur crée "
            }) 
        })
        .catch((erreur) => {
            if (erreur.response.status===400){
                this.setState({
                    status : "Missing fields"
                }) 
            }
            else if(erreur.response.status===401){
                this.setState({
                    status : "Login existant"
                }) 
            }
            else{
                this.setState({
                    status : "erreur"
                })
            }
            })
    }
    render(){
        return (<div className="signIn">
        <div className='sub-signIn'>
            <div className='imgs-sign'>
                <img src={require('./pictures/twitter.png')} className='birdy-img' alt="birdy_img"/>
            </div>
            <h1>Rejoignez Birdy</h1>
            <div className='form-signIn'>
                <form action="/Inscription" method="POST" >
                    <div className="ids">
                        <label >Prenom</label>
                        <input id="Prenom" type="text" placeholder='Entrez votre Prenom' 
                        onChange={this.updateFirstName.bind(this)} required/>
                    </div>
                    <div className="ids">
                        <label>Nom</label>
                        <input id="NomF" name="Nom" type="text" placeholder='Entrez votre Nom'
                         onChange={this.updateLastName.bind(this)}/>
                    </div>
                    <div className="field">
                        <label >Login</label>
                        <input id="login" name="login" type="text" placeholder='Entrez votre nom utilisateur' 
                        onChange={this.updateLogin.bind(this)}/>
                    </div>
                    <div className="field">
                        <label >Mot de passe</label>
                        <input id="password" name="password" type="password" placeholder='Entrez votre mot de passe' 
                        onChange={this.updatePassword.bind(this)}/>
                    </div>
                    <div className="field" >
                        <span id='SignInSpan' onClick={(event=>this.send())}>Enregistrer</span>
                        <span id='SignInSpan' onClick={()=>this.props.changeLandingPage("Landing")}>Annuler</span>
                        {
                            (this.state.status==="Missing fields") 
                            ?
                            <span style={{color:"red"}}>Champs manquants!</span>
                            : <span></span>
                        }
                        {
                            (this.state.status==="Login existant") 
                            ?
                            <span style={{color:"red"}}>Login déjà utilisé!</span>
                            : <span></span>
                        }
                        {
                            (this.state.status==="erreur") 
                            ?
                            <span style={{color:"red"}}>Erreur!</span>
                            : <span></span>
                        }
                        {
                            (this.state.status==="utilisateur crée ") 
                            ?
                            <div>
                            <div className= "succès" style={{color:"black"}}>Compte crée avec succès! Vous pouvez vous connecter</div>
                            <button className='boutton_connexi' onClick={()=>this.props.changeLandingPage("Connexion")}>Se Connecter</button>
                            </div>
                            : <span></span>
                        }
                        
                    </div>
                </form>
            </div>
        </div>
    </div>)
    }
}

export default SignIn;