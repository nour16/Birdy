import React, { Component } from 'react';
import './css/Logout.css';
import axios from 'axios';

class Logout extends Component{
    constructor(props){
        super(props)

        this.api = axios.create({
            withCredentials: true,
            //baseURL :"http://technoweb.Lip6.fr:444",
            baseURL :'http://localhost:4000',
            timeout : 2000,
        });
    }
    deconnect= () => {
        this.api.delete('api/user/logout/'+this.props.user_id)
        .then(()=>{ 
            console.log("deconnexion")     
        })
        .catch((erreur) => {  
            console.log(erreur)
            
        })
        this.props.setLogout();
    }
    render(){
        return (<div className="Logout">
            <button className="logout_button" value ="Déconnexion" onClick={ (event =>this.deconnect())}>Déconnexion</button></div>);
    }
}
export default Logout;