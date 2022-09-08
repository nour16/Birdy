import React, { Component } from 'react';
import {Avatar} from "@material-ui/core"; 
import './css/Friend.css';
import {AiFillDelete} from 'react-icons/ai';
import axios from 'axios';

class Friend extends Component{
    constructor(props){
        super(props)
        this.state={
            key: this.props.id,
            id: this.props.id, 
            username: this.props.username , 
            srcProfilImg:this.props.srcProfilImg
        }   
        this.api= axios.create({
            withCredentials: true,
            //baseURL :"http://technoweb.Lip6.fr:444",
            baseURL :'http://localhost:4000',
        });
    }
    FriendProfil(event){
        event.preventDefault();
        //recuperer cet ami 
        this.api.get('api/user/'+this.state.username
        )
        .then((response)=>{ 
            this.props.goToFriendPage(response.data);
            
        })
        .catch((erreur) => {
            console.log(erreur)
      
        })
    }
    render =()=>{
        return(
            <div className='FriendContainer'>
                <Avatar className='avatar_friend' />
                
                { 
                (this.props.CurrentPage==="Friend_Profile" && this.state.id!==this.props.friend_id )  
                    ?
                    <span className='FriendUsername'>
                    {this.state.username}
                    </span>
                    :
                    <span className='FriendUsername'>
                    <button className="getFriendProfile" onClick = {this.FriendProfil.bind(this)}>{this.state.username} </button>
                    </span>
                    }
                {(this.props.CurrentPage==="Friend_Profile") 
                ?
                    <span></span>
                :
                    <button className="delete_friend" onClick={((event) => this.props.deleteFriend(this.state.username))}  ><AiFillDelete/></button>
                }
            </div>
        )
    }
}

export default Friend;