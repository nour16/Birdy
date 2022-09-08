import React, { Component } from 'react';
import Tweet from './Tweet';
import './css/TweetsList.css'; 


class TweetsList extends Component{
    constructor(props){
        super(props) ;
        this.deleteTweet=this.props.deleteTweet;
    }
    render(){
        return (
            <div className="TweetsList">
                    {(this.props.search_content==='') 
                            ?
                            this.props.tweets.map((tweet,index)=> 
                                <Tweet  
                                    key = {tweet.date}
                                    user_id={this.props.id_user} 
                                    id = {tweet._id} 
                                    author_login = {tweet.author_login} 
                                    author_lastname={tweet.author_lastname} 
                                    author_firstname={tweet.author_firstname} 
                                    author_id={tweet.author_id} 
                                    content={tweet.content}  
                                    deleteTweet={this.deleteTweet} 
                                    goToFriendPage={this.props.goToFriendPage}
                                />
                            ) 
                            :        
                            this.props.tweets.filter((tweet)=> {
                                if(this.props.search_content===''){
                                    return tweet
                                }
                                else if(
                                    tweet.content.toLowerCase().includes(this.props.search_content.toLowerCase())
                                    
                                ){
                                    return tweet
                                }
                            }).map((tweet)=> (
                                <Tweet  
                                    key = {tweet.date}
                                    user_id={this.props.id_user} 
                                    id = {tweet._id} 
                                    author_login = {tweet.author_login} 
                                    author_lastname={tweet.author_lastname} 
                                    author_firstname={tweet.author_firstname} 
                                    author_id={tweet.author_id} 
                                    content={tweet.content}  
                                    deleteTweet={this.deleteTweet} 
                                    goToFriendPage={this.props.goToFriendPage}
                                />
                        
                            ))
                    }
                    
                </div>
                
                );
    }
    
}
export default TweetsList;