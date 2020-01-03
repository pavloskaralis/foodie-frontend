import React, { Component } from 'react'
import history from '../../history.js'
import axios from 'axios'
import './Create.css'

class Show extends Component {
    state = {
        title: "",
        rows: 5,
        item1: "",
        quantity1: "",
        item2: "",
        quantity2: "",
        item3: "",
        quantity3: "",
        item4: "",
        quantity4: "",
        item5: "",
        quantity5: "",
        username: this.props.username

    }


    //create route
    handleSubmit = (e) => {
        e.preventDefault();
        const list = {
            title: this.state.title,
            users: [this.props.username],
            items: []
        };
        for(let i = 1; i <= this.state.rows; i++){
            if((this.state['item' + i]) && (this.state['quantity' + i])){
                const item = {
                    name: this.state['item' + i],
                    quantity: this.state['quantity' + i],
                    crossed: false
                }
                list.items.push(item);
            }
        }
        if(this.state.title){
            axios.post('http://localhost:3001/list', list)
            .then(() => history.push('/shopping-lists'))
        }
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

    render () {
        const rows = [];
        for(let i = 1; i <= this.state.rows; i ++){
            rows.push(
                <div key={i}>
                    <input type="text" onChange={this.handleInput} value={this.state.item} placeholder="item name" id={"item" + i}/>
                    <input type="text" onChange={this.handleInput} value={this.state.item} placeholder="quantity" id={"quantity" + i}/>
                </div>
            )
        }

        return (
            <div>
                <div>
                    <div className='header1'>Create New List</div>
                    <div className='descriptionCreate'>
                        Give your list a name and add items below. <br/>
                        If you run out of room just use <span>+</span> to add more lines.
                    </div>
                </div>

                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.handleInput} value={this.state.title} placeholder="shopping list title" id="title"/>
                    {rows}
                    <div className='plus' onClick={this.addInput}>+</div>
                    <button type="submit">Create List</button>
                </form>

            </div>
        )
    }
}

export default Show