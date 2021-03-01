import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


const React = require('react')

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {},
            errorBody: ""
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
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
    register(){
        axios.post('api/user/register/', {
            email: this.state.userData.email,
            passwd: this.state.userData.passwd,
            passwd2: this.state.userData.passwd2,
            name: this.state.userData.name,
        })
        .then( res => {
            var data = res.data
            if(!data.errors){
                this.props.onRegister(data.user);
            } else {
                var errors = []
                data.errors.forEach((error, index) => {
                    errors.push(<li key={index} class="error-box">{error}</li>)
                })
                this.setState({errorBody: errors})
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
                        <h2>Signing up is free!</h2>
                    </div>
                    <form>
                        <div className="input-container"  >
                            <label className="userarea-label" for="name">Name</label>
                            <input className="userarea-field" id="name" type="text" data={this.state.userData.name} onChange={this.handleChange} ></input>
                        </div>
                        <div className="userarea-input-container"  >
                            <label className="userarea-label" for="email">Email</label>
                            <input className="userarea-field" id="email" type="text" data={this.state.userData.email} onChange={this.handleChange} ></input>
                        </div>
                        <div className="userarea-input-container"  >
                            <label className="userarea-label" for="password">Password</label>
                            <input className="userarea-field" id="passwd"  type="password" data={this.state.userData.passwd} onChange={this.handleChange} ></input>
                        </div>
                        <div className="userarea-input-container"  >
                            <label className="userarea-label" for="password">Confirm Password</label>
                            <input className="userarea-field" id="passwd2"  type="password" data={this.state.userData.passwd} onChange={this.handleChange} ></input>
                        </div>
                        <div className="button form-button" onClick={this.register}><a>Submit</a></div>
                    </form>
                </div>
            </div>
            
        )
    };
}

export default Register;