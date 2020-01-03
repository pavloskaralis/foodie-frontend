import React, { Component } from 'react'
import axios from 'axios'
import './Index.css'

class Index extends Component {
    state = {
        username: this.props.username,
        lists: [],
        formType: "create",
        title: '',
        share: false,
        shareWith: ''
    }
    
    componentDidMount = () => {
        axios.get('https://foodie.sfo2.digitaloceanspaces.com/list/user/' + this.state.username)
        .then(response => this.setState({lists: response.data.lists}));
    }

    render () {
        return (
            <div> 
                
                <div>
                    <div className='header1'>My Shopping Lists</div>
                    <div className='description'>
                        Here are all of your shopping lists. <br/>
                        Click on the individual list to view, update, or share.
                    </div>
                </div>

                <div className='container2'>
               
                    {this.state.lists.map(list => {
                        return(
                            <div className="row">
                            <a className="col-md" id='listItems1' href={"/shopping-lists/" + list._id} key={list._id}>{list.title}</a>
                            </div>
                        )
                    })}
                
                </div>

                <div>
                    <button className='button2'><a className='newPost' href="/new-list">Add New List</a></button>
                </div>

            </div>
        )
    }
}

export default Index
