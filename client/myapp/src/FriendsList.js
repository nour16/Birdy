import React, { Component } from 'react';
import Friend from './Friend';
import './css/FriendsList.css'
import './css/Profile.css'; 


class FriendsList extends Component{
    constructor(props){
        super(props)  
        this.deleteFriend=this.props.deleteFriend;
    }
  
    render(){
        return (<div className="FriendsList">
                    <h4 >Listes des Amis</h4>
                    <div className='List_f'>
                        {this.props.friends_l.map((friend,index)=> (
                            <Friend key ={friend._id} id={friend._id}
                             username={friend.friend_login} 
                            
                              CurrentPage={this.props.CurrentPage} 
                              deleteFriend={this.deleteFriend}
                              goToFriendPage={this.props.goToFriendPage} />
                        )) 
                        } 
                    </div> 
                </div>);
    }
    
}
export default FriendsList;