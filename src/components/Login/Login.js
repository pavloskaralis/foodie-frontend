import React, { Component } from 'react'
import history from '../../history'
import axios from 'axios'
import './Login.css'


class Login extends Component {
    state = {
        username: '',
        password: '',
        error: false
    }

    handleInput = (e) => this.setState({[e.target.id]: e.target.value});
    
    handleLogIn = (e) => {
        e.preventDefault();
        axios.post('https://foodie-list-app-backend.herokuapp.com/user/login', {
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            localStorage.token = response.data.token;
            this.setState({
                username: '',
                password: ''
            });
            history.push("/shopping-lists");
            this.props.resetApp();
        }).catch(err => {
            console.log(err);
            this.setState({error: true})
        })
    }

    render () {
        return (
            <div>
                <div className='background'>
                <form onSubmit={this.handleLogIn}>
                    <div className='header'>Member Log In</div>
                    <div className='form-group'>
                    <input type="text" className='form-control' value={this.state.username} onChange={this.handleInput} placeholder="username" id="username"/>
                    </div>
                    <div className='form-group'>
                    <input type="text" className='form-control' value={this.state.password} onChange={this.handleInput} placeholder="password" id="password"/>
                    </div>
                    <button type="submit">LOG IN</button> 
                    {this.state.error ? <div>Invalid username or password.</div> : <div className="invis">Invisible text</div>}
                    <div className='members'>
                        Not a member yet? Not a problem. <br/>
                        Click <a href="/#signup">here</a> to create your free account.
                    </div>            
                </form>
                </div>
            </div>
        )
    }
}

export default Login
