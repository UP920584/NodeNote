import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Login from './Login'
import Register from './Register'

class Userarea extends React.Component {
    constructor(loggedIn) {
        super(loggedIn);
        this.state = {
            body: "",
            dialog: "",
            loggedIn: this.props.loggedIn
        }
        
        this.renderGuestComponent = this.renderGuestComponent.bind(this)
        this.renderLoggedInComponent = this.renderLoggedInComponent.bind(this)
        this.logon = this.logon.bind(this)
        this.logout = this.logout.bind(this)
        this.closeDialog = this.closeDialog.bind(this)
    }
    componentDidMount(){
        if(this.state.loggedIn){
            this.renderLoggedInComponent()
        } else {
            this.renderGuestComponent()
        }
    }
    closeDialog(){
        this.setState({dialog: ""})
    }
    renderGuestComponent(){
        this.setState({
            body:(
                <div className="guest-container">
                    <div className="guest-buttons">
                    <div className="button" onClick={(e) => this.setState({
                            dialog: 
                                <div className="dialog-container fade-in">
                                    <Login onExit={this.closeDialog} onLogon={this.logon}/>
                                </div>
                        })}><a href="#"  >Login</a></div>
                        <div className="button" onClick={(e) => this.setState({
                            dialog: 
                                <div className="dialog-container fade-in">
                                    <Register onExit={this.closeDialog} onRegister={this.logon}/>
                                </div>
                        })}><a href="#" >Register</a></div>
                    </div>
                </div>
            
            )
        })
        
    }
    renderLoggedInComponent(){
        this.setState({
            body: (
                <div className="dash-container">
                        <div className="button"><a href="#" onClick={this.logout} >Logout</a></div>  
                </div>
            )
        })

    }
    logon(data) {
        this.setState({
            loggedIn: true,
            dialog: ""
        })
        this.renderLoggedInComponent();
        this.props.onAuth()
        
    }
    
    logout() {
        axios.get('api/user/logout').then(res => {
            this.loggedIn = false;
            this.props.onAuth()
            this.renderGuestComponent();
        })
    }

    render(){
        return(
            <div className="userarea">
                {this.state.body}
                
                {this.state.dialog}
                
            </div>
            
        )
    }
}

export default Userarea;