import React, { Component } from 'react';
import './css/Profile.css';
import Feed from './Feed';
import FriendsList from './FriendsList';
import axios from 'axios';


class Profile extends Component {
  constructor(props){
    super(props)
    this.state = {
      key: Date.now(), 
      id : this.props.id_user, 
      username : this.props.username, 
      friends:this.props.friends,
      friends_of_friend: [],
      add_button : "Ajouter",
      status:"",
      tab_id_friends:[]
    }
    console.log("Profile page")
    //ne garder que nos tweets
    
    this.addFriend=this.addFriend.bind(this)
    //creer une api friends
    this.apiFriends = axios.create({
      withCredentials: true,
      //baseURL :"http://technoweb.Lip6.fr:444",
      baseURL :'http://localhost:4000',
    });
     //recuperer la liste des amis
    
    this.apiFriends.get('apiFriends/friends/Add_by_login/'+this.props.friend_id)
    .then((res)=>{
        
        this.setState({friends_of_friend : res.data})
    })
    .catch((erreur) => 
        console.dir(erreur)   
    )      
  
    this.apiFriends.get('apiFriends/friends/Add_by_login/'+this.state.id)
    .then((res)=>{
      this.setState({friends : res.data}) 
      //pour verifier si on est amis ou non 
      for(var i=0;i<res.data.length;i++) {
        if (res.data[i].friend_login===this.props.username){
          this.setState({add_button: "Supprimer"})
          break
        }
       
      }
    })
    .catch((erreur) => 
        console.dir(erreur)   
    ) 
    //api messages
    this.apiMessage = axios.create({
      withCredentials: true,
      //baseURL :"http://technoweb.Lip6.fr:444",
      baseURL :'http://localhost:4000',
    });
  }
  

  deleteFriend(login_f){  
    this.apiFriends.delete('apiFriends/friends/Add_by_login/'+this.state.id+'/'+login_f)
    .then((response)=>{ 
        this.apiFriends.get('apiFriends/friends/Add_by_login/'+this.state.id
       ).then((res)=>{
            this.setState({
                friends :  []
            })
            this.setState({
                friends : res.data,
                add_button : "Ajouter"
            })
        })
    .catch((erreur) => 
        console.dir(erreur)   
    ) 
    })
    .catch((erreur) => {
        console.dir(erreur)
        this.setState({
            status : "error"
        })        
    })
  }
  addFriend=(event)=>{
    event.preventDefault() 
    //on ajoute un ami  dans la bd
    this.apiFriends.post('apiFriends/friends/Add_by_login/'+this.state.id+'/'+this.props.username
    )
    .then((response)=>{ 
        //on recupere tous les amis y compris le nouveau
        this.apiFriends.get('apiFriends/friends/Add_by_login/'+this.state.id)
        .then((res)=>{
            this.setState({
              username :this.state.username,
              key : this.state.friends.length + 1,
              friends :  [],
              add_button: "Supprimer"
            })
            this.setState({friends : res.data})
        })
        .catch((erreur) => 
            console.dir(erreur)   
        ) 
    })
    .catch((erreur) => {
      console.dir(erreur)   
    })
  } 
  render = () => {return(
    <div className='profile'>  
        <div className='profileRight'>
          <div className='profilRightTop'>
              <div className='profilCov'>
                <img className='profilCoverImg' alt="couverture" src={require('./pictures/cover.jpg')}/>
                <img className='profilUserImg' src={require('./pictures/profile.png') } alt="pdp"/>  
              </div>
              <div className='profileInfo'>
                <div className='profileInfoName'>
                  <h4>{this.props.firstname} {this.props.lastname}</h4>
                  <span>@{this.props.username}</span>
                </div>
                {
                (this.props.CurrentPage==="Profile") 
                ?
                <p className='abonnements'>{this.state.friends.length} abonnements</p>
                : <span></span>
                }              
                </div>
                { 
                  (this.props.CurrentPage==="Friend_Profile" && this.state.id!==this.props.friend_id )  
                  ?
                    (this.state.add_button==="Ajouter") 
                    ?
                      <button className='add_Friend' onClick={(event => this.addFriend(event))} ><b>Ajouter</b></button>
                    :
                      <button className='add_Friend' onClick={(event => this.deleteFriend(this.props.username))} ><b>Supprimer</b></button>
                  : <span></span>
                }         
                </div>
          <div className='profilRightBottom'>
            <Feed   id_user={this.props.id_user} CurrentPage={this.props.CurrentPage} friend_id={this.props.friend_id} firstname={this.props.firstname} lastname={this.props.lastname} username={this.props.username}/>
          </div>
        </div>
        <div className='rightbarprofile'>
          { 
            (this.props.CurrentPage==="Friend_Profile" && this.state.id!==this.props.friend_id )  
            ?
          <FriendsList friends_l ={this.state.friends_of_friend} CurrentPage={this.props.CurrentPage} deleteFriend={this.deleteFriend.bind(this)}  goToFriendPage={this.props.goToFriendPage}/>
          :
          <FriendsList friends_l ={this.state.friends} CurrentPage={this.props.CurrentPage} deleteFriend={this.deleteFriend.bind(this)}  goToFriendPage={this.props.goToFriendPage}/>
          }
          
        </div>
        </div>
  )}
}
export default Profile;



