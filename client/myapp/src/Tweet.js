import React, { Component } from 'react';
import {Avatar} from "@material-ui/core"; 
import {AiFillDelete} from 'react-icons/ai';
import './css/Tweet.css'; 
import axios from 'axios';

class Tweet extends Component{
    constructor(props){
        super(props)
        this.state={
            id: this.props.id, 
            content: this.props.content ,
            key: this.props.id
        }

        this.api= axios.create({
            withCredentials: true,
            //baseURL :"http://technoweb.Lip6.fr:444",
            baseURL :'http://localhost:4000',
        });
    }
    
    getFriendProfil(event){
        event.preventDefault();
        //recuperer cet ami
       
        this.api.get('api/user/get/'+this.props.author_id
        )
        .then((response)=>{ 
            this.setState({
                status : ""
            }) 
            const user_infos = response.data
            this.props.goToFriendPage(user_infos);
        })
        .catch((erreur) => {
            this.setState({
                status : "error"
            });
      
    })

    }
    
    render(){
        return (<div className="Tweet">
                    <div className="tweet_avatar">
                        <Avatar/>
                    </div>    
                    <div className="tweet_Body">
                        <div className="tweet_header">
                            <div className="tweet_headerText">
                                <h3>< button 
                                        className = "buttFriendProfile"
                                        onClick = {this.getFriendProfil.bind(this)}
                                    >
                                    {this.props.author_firstname} {this.props.author_lastname}
                                    </button>
                               
                                <span className='tweet_headerSpecial'>@{this.props.author_login}</span>
                                </h3>
                            </div>
                            <div className="tweet_description">
                                <p>{this.state.content}</p>
                            </div>
                            
                        </div>                    
                        </div>         
                        
                            
                           
                        {
                        (this.props.user_id===this.props.author_id) 
                        ?
                        <button className="delete" onClick={() => this.props.deleteTweet(this.state.id)}  ><AiFillDelete/></button>
                        : <span></span>
                        }
                    
                        
                   
                </div>);
    
    }
}
export default Tweet;