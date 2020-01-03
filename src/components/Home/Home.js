import React, { Component } from 'react'
import history from '../../history'
import axios from 'axios'
import './Home.css'


class Home extends Component {
    state = {
        username: '',
        password: '',
        error: false
    }
  
    handleInput = (e) => this.setState({[e.target.id]: e.target.value});

    handleSignUp = (e) => {
        e.preventDefault();
        if(this.state.username && this.state.password){
            axios.post('http://foodie-list-app-backend.herokuapp.com/user/signup', {
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
    }

    render () {
        return (
            <div>
            <div>
                <img src='https://i.imgur.com/oSp3s1B.jpg' alt="banner"/>
            </div>

            <div>
                <div className='title'>Shopping Made Easy</div>
                
                <div className='description'>
                    Forget about paper lists. Introducing Foodie an app that makes shopping convenient and easy.
                </div>
                <div className='description2'>
                    Foodie allows you to create, name, and share your shopping list with family and friends for any occasion.
                </div>
            </div>

            <div className= 'container'>
            <div className='row'> 
                <div className="col-xs-6 col-sm-4">
                    <div>
                        <img className='birthday' src='https://i.imgur.com/7AffIid.png' alt="icon"></img>
                    </div>
                    <div className='info'>
                        Create shopping lists for any occasion. No matter what it is we've got you covered!
                    </div>
                </div>
                <div className="col-xs-6 col-sm-4">
                    <div>
                        <img className='apple' src='https://i.imgur.com/jjobpii.png' alt="icon"></img>
                    </div>
                    <div className='info'>
                        We don't stop at food :) Build a custom shopping list that meets your shopping needs.
                    </div>
                </div>
               
                <div className="col-xs-6 col-sm-4">
                    <div>
                        <img className='share' src='https://i.imgur.com/qDSeTtP.png' alt="icon"></img>
                    </div>
                    <div className='info'>
                        Make shopping easier. Share your shopping list with your friends and family. 
                    </div>
                </div>
                </div>
            </div>
            <div>
            <div className='description2'>
            You're running to the store after work but realize you left your list at home (ugh). <br></br>
            Instead of standing in the dairy aisle wondering how much milk you have left, next time use your phone as your personal grocery shopping assistant.<br></br> The newest and latest grocery shopping list apps take out all the work for you.
                </div>
                
            </div>
          
            {!this.props.isLoggedIn && <form onSubmit={this.handleSignUp} id="signup">
                <div className = 'registration'>Create Free Account</div>
                <div className='form-group'>
                <input type="text" className='form-control' value={this.state.username} onChange={this.handleInput} placeholder="username" id="username"/>
                </div>
                <div className='form-group'>
                <input type="text" className='form-control'  value={this.state.password} onChange={this.handleInput} placeholder="password" id="password"/>
                </div>
                <button type="submit">SIGN UP</button> 
                {this.state.error ? <div>Username already exists.</div> : <div className="invis">Invisible text</div>}
                <div className='ifMember'>
                    Already a member? <br/>
                    Click <a  className='click' href="/login">here</a> to log in.
                </div>            
            </form>}
        </div>
        )
    }
}

export default Home
