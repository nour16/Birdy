import React, { Component } from 'react';
import './css/Feed.css'; 
import TweetsList from './TweetsList';
import FormAddTweet from './FormAddTweet';
import {FaUserFriends} from 'react-icons/fa';
import {FaSearch} from 'react-icons/fa';
import {BiWorld} from 'react-icons/bi';
import axios from 'axios';

class Feed extends Component{
    constructor(props){
        super(props)    
        this.state={
            userInput:'',
            key:'',
            status : "",
            search_content : "",
            filtrated : false,
            friend_tweets : [],
            tweets: []
        }
        this.apiMessage = axios.create({
            withCredentials: true,
            //baseURL :"http://technoweb.Lip6.fr:444",
            baseURL :'http://localhost:4000',
        })
        if(this.props.CurrentPage==="Accueil"){
            this.apiMessage.get('apiMessage/message').then((response)=>{
                this.setState({
                    tweets : response.data.sort((x,y)=>{
                        if(x.date > y.date){
                            return -1;
                        }
                        else{
                            return 1;
                        }
                    })
                })     
            })
            .catch((erreur) => {
                console.dir(erreur)   
            })
        }
        else{
            if(this.props.CurrentPage==="Friend_Profile"){
                this.apiMessage.get('apiMessage/message/'+this.props.friend_id)
                .then((res)=>{
                this.setState({
                    friend_tweets :  []
                })
                
                this.setState({friend_tweets : res.data})
                })
                .catch((erreur) => 
                    console.dir(erreur)   
                )
            }
            else{
            this.apiMessage.get('apiMessage/message/'+this.props.id_user)
                .then((res)=>{
                this.setState({
                    tweets :  []
                })
                
                this.setState({tweets : res.data})
                })
                .catch((erreur) => 
                    console.dir(erreur)   
                )
                }
        }
    }
    onChange(event){//contenu du tweet
        this.setState({
            userInput: event.target.value,
            key:Date.now()
           
        });
    }
   
    //afficher que les messages des nos amis
    getFriendsMessages=(event)=>{
        if(this.state.filtrated===false){
            let friends_mess = []
            this.setState({
                tweets : [],
                filtrated : true
            })
            //d'abord récuperer les amis
            axios.get('http://localhost:4000/apiFriends/friends/Add_by_login/'+this.props.id_user)
            .then((res)=>{
                this.setState({
                    friends : res.data
                })
                //pour chaque ami recuperer ses messages
                this.state.friends.map((friend,index)=> {
                    this.apiMessage.get('apiMessage/message/'+this.props.id_user+'/'+friend.friend_login)
                    .then((res)=>{
                            res.data.map((mes,index)=> {
                                friends_mess.push(mes)
                            })
                        this.setState({
                            tweets : friends_mess
                        })
                    })
                    .catch((erreur) => 
                        console.dir(erreur)   
                    )
                })
            })
            .catch((erreur) => 
                console.dir(erreur)   
            )
        }
        else{
            this.apiMessage.get('apiMessage/message')
            .then((res)=>{
                this.setState({
                    tweets :  []
                })
                this.setState({
                    tweets : res.data,
                    filtrated : false
                })
            })
            .catch((erreur) => 
                console.dir(erreur)   
            ) 
        }
    }

    //rechercher des messages par des mots clés
    onChangeSearch(event){
        this.setState({
            search_content: event.target.value,
            key:Date.now()
        })
        if (this.state.search_content===""){
            this.apiMessage.get('apiMessage/message')
            .then((res)=>{
                this.setState({
                    tweets :  []
                })
                this.setState({tweets : res.data})
            })
            .catch((erreur) => 
                console.dir(erreur)   
            ) 
        }
    }

    //ajouter un tweet
    addTweet=(event)=>{
        //event.preventDefault()
        //on poste un nouveau tweet
        this.apiMessage.post('apiMessage/message',
        {  
            author_id:this.props.id_user,  
            author_login: this.props.username, 
            author_lastname: this.props.lastname, 
            author_firstname: this.props.firstname, 
            content : this.state.userInput, 
            date : this.state.key
        })
        .then((response)=>{ 
            this.setState({
                userInput:'',
                status : '',
                key:'',
            })
            //Recuperer que les messages ecrits par le user
            if (this.props.CurrentPage==="Profile"){
                this.apiMessage.get('apiMessage/message/'+this.props.id_user
                ).then((res)=>{
                    this.setState({
                        tweets :  []
                    })
                    this.setState({tweets : res.data})
                })
                .catch((erreur) => 
                    console.dir(erreur)   
                ) 
            }
            else{
                //recuperer tous les messages
                this.apiMessage.get('apiMessage/message')
                .then((res)=>{
                    this.setState({
                        tweets :  []
                    })
                    this.setState({tweets : res.data})
                })
                .catch((erreur) => 
                    console.dir(erreur)   
                ) 
            }

        })
        .catch((erreur) => {
            console.dir(erreur)
            this.setState({
                status : "error"
            })        
        })
    
    } 
    deleteTweet(id_t){  
        this.apiMessage.delete('apiMessage/message',
        {  
            data: {id : id_t}
        })

        .then((response)=>{ 
            if (this.props.CurrentPage==="Profile"){
                this.apiMessage.get('apiMessage/message/'+this.props.id_user
                ).then((res)=>{
                    this.setState({
                        tweets :  []
                    })
                    this.setState({tweets : res.data})
                })
                .catch((erreur) => 
                    console.dir(erreur)   
                ) 
            }
            else{
                this.apiMessage.get('apiMessage/message')
                .then((res)=>{
                    this.setState({
                        tweets :  []
                    })
                    this.setState({tweets : res.data})
                })
                .catch((erreur) => 
                    console.dir(erreur)   
                ) 
                
            }
        })
        .catch((erreur) => {
            console.dir(erreur)
            this.setState({
                status : "error"
            })        
        })
      
    }
    send=(event) => {
        if (this.state.search_content===''){
            this.apiMessage.get('apiMessage/message')
            .then((res)=>{
                this.setState({
                    tweets :  []
                })
                this.setState({tweets : res.data})
            })
            .catch((erreur) => 
                console.dir(erreur)   
            ) 
        }
        
    }
    render(){
        //ordonner les tweets
        return (<div className="Feed">
                {
                (this.props.CurrentPage==="Accueil") 
                ?
                <div className='home_widg'>
                    <div className="Pannel">
                        <div className="widg_rech">
                            <div className="Recherche">
                                <FaSearch/>
                                <input 
                                    placeholder="Recherche Message ..."
                                    type="text" 
                                    onChange={this.onChangeSearch.bind(this)}
                                /> 
                            </div>
                            <button 
                                className="buttonR" 
                                onClick={(event)=>{this.send(event)}}
                            >
                                Rechercher
                            </button>
                        </div>  
                    </div>
                   
                    <button className='Friends_messages' onClick={this.getFriendsMessages}>
                    {
                    (this.state.filtrated===false)
                    ?
                        <FaUserFriends /> 
                    :
                        <BiWorld/>
                     }
                    </button> 
                    
                </div> 
                :        
                    <span></span>
                }
                {
                (this.props.CurrentPage==="Friend_Profile") 
                ?
                <span></span>
                :        
                    <FormAddTweet 
                        author_id={this.props.id_user} 
                        author_login={this.props.username} 
                        author_lastname={this.props.lastname} 
                        author_firstname={this.props.firstname}       
                        content={this.state.userInput} 
                        addTweet={this.addTweet.bind(this)} 
                        onChange={this.onChange.bind(this)} 
                    />
                }
                 {
                (this.props.CurrentPage==="Friend_Profile") 
                ?
                <TweetsList 
                    id_user={this.props.id_user}
                    tweets = {this.state.friend_tweets} 
                    goToFriendPage={this.props.goToFriendPage} 
                    deleteTweet={this.deleteTweet.bind(this)} 
                    search_content = {this.state.search_content}
                />
        
                :        
                <TweetsList 
                    id_user={this.props.id_user}
                    tweets = {this.state.tweets} 
                    goToFriendPage={this.props.goToFriendPage} 
                    deleteTweet={this.deleteTweet.bind(this)} 
                    search_content = {this.state.search_content}
                />
                 }
                </div>);
    }
}
export default Feed;