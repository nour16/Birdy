import React, { Component } from 'react';
import './css/FormAddTweet.css'; 
import {Avatar} from "@material-ui/core"; 
import axios from 'axios'; 


class FormAddTweet extends Component{
    constructor(props){
        super(props)
        this.state = { 
            status : ""
        }
        this.addTweet = this.props.addTweet.bind(this)
        //creer une api Messages
        this.apiMessage = axios.create({
            withCredentials: true,
            //baseURL :"http://technoweb.Lip6.fr:444",
            baseURL :'http://localhost:4000',
        });
    }

    send(event){
        event.preventDefault()
        this.props.addTweet(event)
    }
    
    render(){
        return (<div className="FormAddTweet">
                    <form>
                        <div className="tweetBox_input">
                            <Avatar />
                            <input 
                                value ={this.props.content}
                                type="text" 
                                placeholder="  Quoi de neuf?" 
                                onChange={this.props.onChange.bind(this)}
                             />

                        </div>
                        
                    <button className="tweet_button" onClick={(event =>this.send(event))}>Tweeter</button>   
                    </form>
                   
                    
                </div>);
    }
    
}
export default FormAddTweet;