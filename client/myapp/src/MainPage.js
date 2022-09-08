import React, { Component} from 'react';
import NavigationPannel from './NavigationPannel';
import PageMur from './PageMur';
import './css//MainPage.css';
import Profile from './Profile';
import ProfileFriend from './ProfileFriend';



class MainPage extends Component{
    constructor(props){

        super(props)
        this.state = {
            CurrentPage:"landing", 
            isConnected :false, 
            tweets : [], 
            friends:[], 
            profil : "", 
            friend_infos : "",
            status:""
        }
        this.getConnected = this.getConnected.bind(this);
        this.register = this.register.bind(this);
        this.setLogout = this.setLogout.bind(this);
        this.changePage = this.changePage.bind(this);
        this.goToFriendPage=this.goToFriendPage.bind(this);
        
    }
    //partie login
    getConnected = (profil) => {
        this.setState({
            isConnected : true,
            profil : profil,
            status : "",
            CurrentPage: "Accueil"
        
        })
        
    }
    
    //partie Enregistrement
    register = () => {
        console.log("account created!")
        this.setState({
            CurrentPage: "Connexion"
        })     
    }
    
   
    //partie logout
    setLogout= () => {
        this.setState({
            CurrentPage: "landing",
            isConnected :false
        })
        
    }
    goToFriendPage = (friend_inf) => {
        if(friend_inf._id===this.state.profil["_id"])
            this.setState({
                CurrentPage : "Profile",
                friend_infos : friend_inf
                
            }) 
        else{
          
            this.setState({
                CurrentPage : "Friend_Profile",
                friend_infos : friend_inf
                
            }) 
        }
       
       
    }
    changePage= (page) => {
        this.setState({
            CurrentPage: page
        })
    }
    render= ()=> {
        return (<div className="MainPage">
           

            {this.state.isConnected ? 
                    <div className="Accueil">  
                    <NavigationPannel 
                        status={this.state.status} 
                        register={this.register} 
                        getConnected={this.getConnected}  
                        setLogout={this.setLogout} 
                        isConnected={this.state.isConnected} 
                        changePage={this.changePage} 
                        user_id={this.state.profil["_id"]} 
                    />
                        {
                            this.state.CurrentPage==="Accueil" ?
                                <PageMur 
                                    id_user={this.state.profil["_id"]} 
                                    username= {this.state.profil["login"]} 
                                    lastname={this.state.profil["lastname"]} 
                                    firstname={this.state.profil["firstname"]} 
                                    goToFriendPage={this.goToFriendPage}
                                    CurrentPage={this.state.CurrentPage}
                                />
                            :
                            this.state.CurrentPage==="Friend_Profile" ?
                                <ProfileFriend 
                                id_user={this.state.profil["_id"]}
                                friend_id = {this.state.friend_infos["_id"]} 
                                firstname={this.state.friend_infos["firstname"]} 
                                lastname={this.state.friend_infos["lastname"]} 
                                username={this.state.friend_infos["login"]} 
                                friends={this.state.friends}
                                friends_of_friend={this.state.friends}
                                CurrentPage={this.state.CurrentPage}
                                goToFriendPage={this.goToFriendPage}
                                />
                            :
                                <Profile 
                                    id_user={this.state.profil["_id"]} 
                                    firstname={this.state.profil["firstname"]} 
                                    lastname={this.state.profil["lastname"]} 
                                    username={this.state.profil["login"]}
                                    friends={this.state.friends}
                                    CurrentPage={this.state.CurrentPage}
                                    goToFriendPage={this.goToFriendPage}
                                />
                        }
                    </div>
                    : 
                    <NavigationPannel  user_id={this.state.profil["_id"]}  register={this.register} getConnected={this.getConnected} setLogout={this.setLogout} isConnected={this.state.isConnected} changePage={this.changePage}/>
                }
            </div>)
    }
}
export default MainPage;