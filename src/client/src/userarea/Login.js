import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'



class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            userData: {},
            errorBody: ""
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.exit = this.exit.bind(this);
    }
    handleChange(e) {
        const target = e.target;
        this.setState({ 
            userData: {
                ...this.state.userData,
                [target.id]: target.value
            } 
        });
    }
    login(){
        axios.post('api/user/login/', {
            email: this.state.userData.email,
            passwd: this.state.userData.passwd,
        })
        .then( res => {
            var data = res.data
            console.log(data)
            if(data.id){
                this.props.onLogon(data.user);
            } else {
                this.setState({errorBody: <li class="error-box">{data.error}</li> });
            }
        })
    }
    exit() {
        this.props.onExit()
    }



    render () {
        return (
            <div>
                <a className="close-btn" onClick={this.exit} href="#"><FontAwesomeIcon icon={faTimes} /></a>
                <div className="alert-container" >
                    <ul>
                        {this.state.errorBody}
                    </ul>
                </div>
                <div className="dialog-form-container">
                    <div className="form-header">
                        <h2>Login below!</h2>
                    </div>
                <form>
                    <div className="userarea-input-container"  >
                        <label className="userarea-label" for="email">Email</label>
                        <input className="userarea-field" id="email" type="text" data={this.state.email} onChange={this.handleChange} ></input>
                    </div>
                    <div className="userarea-input-container"  >
                        <label className="userarea-label" for="password">Password</label>
                        <input className="userarea-field" id="passwd" type="password" data={this.state.passwd} onChange={this.handleChange} ></input>
                    </div>
                    <div className="button form-button" onClick={this.login}><a>Submit</a></div>
                
                </form>
                </div>
            </div>
        )
    }
}

export default Login;