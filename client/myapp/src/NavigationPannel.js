import React, { Component } from 'react';
import Landing from './Landing';
import Logout from './Logout';
import {twitter,accueil,profile} from './icons.js';
import './css/NavigationPannel.css'; 

class NavigationPannel extends Component{
    
    render(){
        return (
            this.props.isConnected === false  ?  <Landing status={this.props.status} register= {this.props.register} getConnected= {this.props.getConnected}/>
                 : 
            <div className='Sidebar'>
                <header>{twitter}</header> 
                <nav className="corps">
                <div className='options'>        
                    <button className="Accueil" onClick={()=>this.props.changePage("Accueil")}>{accueil}Accueil</button>
                    <button className="profile" onClick={()=>this.props.changePage("Profile")}>{profile}Profile</button>
                    <Logout user_id={this.props.user_id} setLogout= {this.props.setLogout.bind(this)}/>                            
                </div> 
                </nav>
            
            </div>    
        
        );
    }
} 
export default NavigationPannel;