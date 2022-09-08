import React, { Component } from 'react';
//import Sidebar from './Sidebar';
import Feed from './Feed';
import './css/PageMur.css';


class PageMur extends Component{
    
    render(){
        console.log("Accueil")
        return (<div className="PageMur">
            
                
                <Feed 
                    id_user={this.props.id_user} 
                    username={this.props.username} 
                    lastname={this.props.lastname} 
                    firstname={this.props.firstname}
                    goToFriendPage={this.props.goToFriendPage}
                    CurrentPage={this.props.CurrentPage}
                 />
            
            </div>);
    }
}
export default PageMur;