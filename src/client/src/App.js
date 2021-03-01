import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Userarea from './userarea/Userarea'
import Workspace from './workspace/Workspace'
import './App.css';

class App extends Component {
  initialised = false;

  state = {
    loggedIn: "",
    userarea: "",
    body: ""
  }

  constructor() {
    super();
    
    this.auth = this.auth.bind(this)
    this.render = this.render.bind(this)
  }
  componentDidMount(){
    this.auth()
    
  }
  auth(){
    console.log("authing")
    axios.get('api/auth').then( res => {
      this.setState({
        userarea: <Userarea loggedIn={true} onAuth={this.auth} />,
        body: <Workspace id={res.data.id} />
      })
    }).catch( res => {
      this.setState({
        userarea: <Userarea loggedIn={false} onAuth={this.auth} />,
        body: <div className="workspace-placeholder"><h2>Register or Login to start taking notes!</h2></div>
      })
    })
    
  }

  render() {

    return (
      <div className="App">
        <div className="userarea-container">
          {this.state.userarea}
        </div>
        <div className="workspace-container"> 
          {this.state.body}
        </div>
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

export default App;