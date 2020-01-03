import React, { Component } from 'react'
import history from '../../history.js'
import axios from 'axios'
import './Share.css'

class Share extends Component {
    state = {
        title: '',
        users: [],
        items: [],
        username: '',
        result: ''
    } 

    componentDidMount = () => {
        axios.get('http://foodie-list-app-backend.herokuapp.com/list/id/' + this.findID())
        .then(response => this.setState({
            title: response.data.title,
            users: response.data.users,
            items: response.data.items,
        }))
    }

    findID = () => {
        const url = window.location.href
        const splitUrl = url.split('/');
        const listID = splitUrl[splitUrl.length - 1];
        return listID
    }

    handleInput = (e) => this.setState({[e.target.id]: e.target.value});

    //put route
    handleUpdate = (e) => {
        e.preventDefault();
        const list = {
            title: this.state.title,
            users: this.state.users,
            items: this.state.items
        }

        if (this.state.users.indexOf(this.state.username) !== -1){
            this.setState({
                username: '',
                result: 'User already added.'
            }); 
        } else {
            axios.get('http://foodie-list-app-backend.herokuapp.com/user/share/' + this.state.username)
            .then(response => {
                if (response.data.confirm){
                    const updatedUsers = [...list.users, this.state.username];
                    axios.put('http://foodie-list-app-backend.herokuapp.com/list/id/' + this.findID(), {...list, users: updatedUsers})
                    .then(response => this.setState({
                        users: response.data.users,
                        username: '',
                        result: `Shared with ${this.state.username}!`
                    }));
                } else {
                    this.setState({
                        username: '',
                        result: 'User not found.'
                    }); 
                }
            })
        }
    }

    render () {
        let shared = '';
        for(let i = 0; i < this.state.users.length; i ++){
            if (i === this.state.users.length - 1) {
                shared += `${this.state.users[i]}`
            } else if (i === this.state.users.length - 2){
                shared += `${this.state.users[i]} and `
            } else {
                shared += `${this.state.users[i]}, `
            }
        }
        return (
            <div id='signup'>
                <div>
                    <div className='title'> Share List</div>
                    <div className='description'>
                        Share your list with friends by adding their username. <br/>
                        This list is currently viewable by: <br/>
                        {shared}
                    </div> 
                </div>

                <form onSubmit={this.handleUpdate}>
                    <input type="text" onChange={this.handleInput} value={this.state.username} placeholder="username" id="username"/>
                    <button type="submit">Submit Changes</button>   
                    {this.state.result ? <div>{this.state.result}</div> : <div className="invis">invisible text</div>} 
                </form>

                <div className='container4'>
                    <a  className='return' href={"/shopping-lists/" + this.findID()}>Return To My List</a>
                    <a className='return' href="/shopping-lists/">Back To Shopping Lists</a>
                </div>
            </div>
        )
    }
}

export default Share
