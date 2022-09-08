import React, { Component } from 'react';
import './css/Landing.css';
import Login from './Login';
import SignIn from './SignIn';
class Landing extends Component{
    constructor(props){
        super(props)
        this.state={landingPage:"Landing"}
        this.changLandingePage=this.changeLandingPage.bind(this)
        console.log("Landing Page")
    }
    changeLandingPage (page) {
        this.setState({
            landingPage: page
        })
    }
    render(){
        return( this.state.landingPage === "Landing"  ?
            <div className='Landing'>
                    <div className='left_landing'>
                        <img src={require('./pictures/image.jpeg')} className="left_pic"  alt="landing_pic"/>
                    </div>
                    <div className='right_landing'>
                        <h1>
                            Bienvue sur Birdy !!!
                        </h1>
                        <button className='boutton_connex' onClick={()=>this.changeLandingPage("Connexion")}>Se Connecter</button>
                        <h2>
                            Vous n'êtes pas encore inscrit ? Rejoignez-nous !
                        </h2>
                        <button className='boutton_inscrip' onClick={()=>this.changeLandingPage('Inscription')}>S'inscrire</button>
                    </div>
            </div>:
                <div>
                
                {this.state.landingPage==="Connexion" ?             
                        <Login getConnected= {this.props.getConnected.bind(this)} changeLandingPage={this.changeLandingPage.bind(this)}/>
    
                    :
                    <SignIn register= {this.props.register.bind(this)} changeLandingPage={this.changeLandingPage.bind(this)}/>
                }</div>
                )
    }
}
export default Landing;