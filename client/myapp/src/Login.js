import React, { Component } from 'react';
import './css/Login.css';
import axios from 'axios';

class Login extends Component{
    constructor(props){
        super(props)
        this.state = { 
            login : "", 
            password :"",
            status : ""
        }
        //creer un api user
        this.api = axios.create({
            withCredentials: true,
            //baseURL :"http://technoweb.Lip6.fr:444",
            baseURL :'http://localhost:4000',
            timeout : 2000,
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
    send= () => {
        this.api.post('api/user/login',
            {login: this.state.login,
            password : this.state.password},
            )
        
        .then((response)=>{ 
            this.setState({
                status : ""
            }) 
            //se connecter
            const user_infos = response.data["body"];
            //recuperer les messages sur la page de profil
            this.props.getConnected(user_infos);
        })
        .catch((erreur) => {
            
            console.log(erreur)
            this.setState({
                status : "error"
            });
          
        })
    }
    render(){
        return (<div className="login">
            <div className='sub-login'>
                <div className='img-count'>
                    <img src={require('./pictures/roundAccount.jpg')} className='acc-img' alt="acc_img"/>
                </div>
                <h1 className="title-class">Connectez-vous à Birdy</h1>
                <form className="login-form" action="/Connexion" method="POST">
                    <div className="login-field">
                        <label >Login</label>
                        <input id="login" name="login" placeholder='Entrez votre login' 
                        onChange={this.updateLogin.bind(this)} value={this.state.login} required/>
                    </div>
                    <div className="login-field">
                        <label >Mot de passe</label>
                        <input id="password" name="password" type="password" placeholder='Entrez votre mot de passe' 
                        onChange={this.updatePassword.bind(this)} value={this.state.password} required/>
                    </div>
                    {
                        (this.state.status==="error") 
                        ?
                        <span style={{color:"red"}}>Erreur d'authentification</span>
                        : <span></span>
                    }
                    <div className="login-field">
                        <span id='LoginSpan' onClick={ (event =>this.send()) }>Connexion</span>
                        <span id='LoginSpan' onClick={()=>this.props.changeLandingPage("Landing")}>Annuler</span>
                    </div>
                </form>
            </div>
        </div>)}
}
export default Login;