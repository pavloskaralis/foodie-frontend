import React, { Component } from 'react'
import axios from 'axios'
import './Show.css'

class Show extends Component {
    state = {
        title: '',
        users: [],
        items: []
    }

    componentDidMount = () => {
        window.scrollTo(0, 0);
        axios.get('https://foodie-list-app-backend.herokuapp.com/list/id/' + this.findID())
        .then(response => this.setState({
            title: response.data.title,
            users: response.data.users,
            items: response.data.items
        }));
    }

    findID = () => {
        const url = window.location.href
        const splitUrl = url.split('/');
        const listID = splitUrl[splitUrl.length - 1];
        return listID
    }

    //put route
    toggleCross = (index) => {
        const updatedItem = {
            name: this.state.items[index].name,
            quantity: this.state.items[index].quantity,
            crossed: !this.state.items[index].crossed
        }
        const updatedItems = [
            ...this.state.items.slice(0, index), 
            updatedItem, 
            ...this.state.items.slice(index + 1)
        ];
        axios.put('https://foodie-list-app-backend.herokuapp.com/list/id/' + this.findID(), {...this.state, items: updatedItems})
        .then(response => this.setState({items:response.data.items}));
    }

    //put route
    deleteItem = (index) => {
        const updatedItems = [
            ...this.state.items.slice(0,index), 
            ...this.state.items.slice(index + 1)
        ];
        axios.put('https://foodie-list-app-backend.herokuapp.com/list/id/' + this.findID(), {...this.state,items: updatedItems})
        .then(response => this.setState({items:response.data.items}));
    }

    render () {
        return (
            <div>
                <div>
                    <div className='header1'>{this.state.title}</div>
                    <div className='descriptionCreate'>
                        You can manage your list here. <br/>
                        If you want to check off an item use <span>✓</span> <br/>
                        If you need to delete an item use <span>X</span>
                    </div>
                </div>

                <div className='back'>
                    {this.state.items.map((item, index) => {
                        return (
                            <div className= 'container3' key={index}>
                                <div className={item.crossed ? "strike" : ""}>{item.name} — {item.quantity}</div>
                                <div className='complete' onClick={()=> this.toggleCross(index)}>✓</div>
                                <div className='delete' onClick={()=> this.deleteItem(index)}>X</div>  
                            </div>
                        )
                    })}
                </div>

                <div className='header1'>
                    Return To 
                </div>
                <div className='container4'>
                    <a className='return' href={"/share-list/" + this.findID()}>Share Shopping List</a>
                    <a className='return' href={"/update-list/" + this.findID()}>Update Shopping List</a>
                    <a className='return' href="/shopping-lists/">Back To Shopping Lists</a>
                </div>

            </div>
        )
    }
}
    

export default Show
