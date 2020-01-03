import React, { Component } from 'react'
import history from '../../history.js'
import axios from 'axios'
import './Update.css'

class Update extends Component {
    state = {
        title: '',
        users: [],
        items: [],
        rows: ''
    }

    componentDidMount = () => {
        axios.get('https://foodie.sfo2.digitaloceanspaces.com/list/id/' + this.findID())
        .then(response => {
            const state = {
                title: response.data.title,
                users: response.data.users,
                items: response.data.items,
                rows: response.data.items.length
            }
            for(let i = 1; i <= state.rows; i ++){
                state['item' + i] = state.items[i - 1].name;
                state['quantity' + i] = state.items[i - 1].quantity;
            }
            this.setState(state)
        })
    }

    findID = () => {
        const url = window.location.href
        const splitUrl = url.split('/');
        const listID = splitUrl[splitUrl.length - 1];
        return listID
    }

    handleInput = (e) => this.setState({[e.target.id]: e.target.value});

    addInput = () => {
        const num = this.state.rows + 1;
        this.setState({
            ['input'+ num]:"",
            ['quantity' + num]:"",
            rows: num
        })
    }

    //put route
    handleUpdate = (e) => {
        e.preventDefault();
        const list = {
            title: this.state.title,
            users: this.state.users,
            items: this.state.items
        };
        const updatedItems = []; 
        for(let i = 1; i <= this.state.rows; i++){
            if((this.state['item' + i]) && (this.state['quantity' + i])){
                const item = {
                    name: this.state['item' + i],
                    quantity: this.state['quantity' + i],
                    crossed: false
                }
                updatedItems.push(item);
            }
        }
        if(this.state.title){
            axios.put('https://foodie.sfo2.digitaloceanspaces.com/list/id/' + this.findID(), {...list,items: updatedItems})
            .then(() => history.push('/shopping-lists/' + this.findID())) 
        }
    }

    //put or delete route  (conditional)
    deleteList = (e) => {
        e.preventDefault();
        const list = {
            title: this.state.title,
            users: this.state.users,
            items: this.state.items
        }
        const index = list.users.indexOf(this.props.username);
        const updatedUsers = [...list.users.slice(0,index), ...list.users.slice(index + 1)];
        //if shared, only removes user as to not delete for other users
        if (updatedUsers.length > 0) {
            console.log('removing')
            axios.put('https://foodie.sfo2.digitaloceanspaces.com/list/id/' + this.findID(), {...list,users: updatedUsers})
            .then(() => history.push('/shopping-lists/'))
        } else {
            console.log('deleting')
            axios.delete('https://foodie.sfo2.digitaloceanspaces.com/list/id/' + this.findID())
            .then(() => history.push('/shopping-lists/'))
        }
    }

    render () {
        const rows = [];
        for(let i = 1; i <= this.state.rows; i ++){
            rows.push(
                <div key={i}>
                    <input type="text" onChange={this.handleInput} value={this.state["item" + i]} placeholder="item name" id={"item" + i} />
                    <input type="text" onChange={this.handleInput} value={this.state["quantity" + i]} placeholder="quantity" id={"quantity" + i} />
                </div>
            )
        }

        return (
            <div>
                <div>
                    <div className='header1'>Update List</div>
                    <div className='descriptionCreate'>
                        Update your list here. <br/>
                        Change the title, items, or quantity that needs to be bought. <br/>
                        You can also add new items to your list. 
                    </div>
                </div>

                <form  onSubmit={this.handleUpdate}>
                    <input type="text" onChange={this.handleInput} value={this.state.title} placeholder="shopping list title" id="title"/>
                    {rows}
                    <div className="plus" onClick={this.addInput}>+</div>
                    <div>
                        <button className='button1' type="submit">Submit Changes</button>
                        <button className='button2' onClick={this.deleteList}>Delete List</button>
                    </div>     
                </form>

                <div className="container4">
                    <a className="return" href={"/shopping-lists/" + this.findID()}>Return To My List</a>
                    <a className="return" href="/shopping-lists/">Back To Shopping Lists</a>
                </div>
            </div>
        )
    }
}


export default Update
