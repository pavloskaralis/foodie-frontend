import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import history from '../../history'
import axios from 'axios'
import Nav from '../Nav/Nav.js'
import Footer from '../Footer/Footer.js'
import Login from '../Login/Login.js'
import Home from '../Home/Home.js'
import Index from '../Index/Index.js'
import Show from '../Show/Show.js'
import Create from '../Create/Create.js'
import Update from '../Update/Update.js'
import Share from '../Share/Share.js'
import './App.css'

//app will keep state and methods for login/signup/logout
class App extends Component {
  state = {
    isLoggedIn: false,
    username: ''
  }

  componentDidMount = () => {
    if(localStorage.token) {
      axios.get('https://foodie-list-app-backend.herokuapp.com/user/verify/' + localStorage.token)
      .then(response => this.setState({
        isLoggedIn: true, 
        username: response.data.username, 
      }));
    } else {
      this.setState({isLoggedIn: false})
    }
  }

  handleLogOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    this.setState({
      isLoggedIn: false,
      username: '', 
    });
    history.push('/')
  }

  render () {
    return (
      <React.Fragment>
        <Nav isLoggedIn={this.state.isLoggedIn} handleLogOut={this.handleLogOut}/>        
        <Switch>
          {this.state.isLoggedIn && <>
            <Route path={'/shopping-lists/:id'} render={()=> <Show listID={this.state.listID}/>}/>
            <Route path={'/shopping-lists'} render={()=> <Index selectList={this.selectList} username={this.state.username}/>}/>
            <Route path={'/new-list'} render={()=> <Create username={this.state.username}/>}/>
            <Route path={'/update-list/:id'} render={()=> <Update username={this.state.username}/>}/>
            <Route path={'/share-list/:id'} render={()=> <Share username={this.state.username}/>}/>
            <Route path={'/'} exact render={()=> <Home resetApp={this.componentDidMount} handleSignUp={this.handleSignUp} isLoggedIn={this.state.isLoggedIn}/>}/>
          </>}
          {!this.state.isLoggedIn && <>
            <Route path={'/login'} render={()=> <Login resetApp={this.componentDidMount}/>}/>
            <Route path={'/'} exact render={()=> <Home resetApp={this.componentDidMount} handleSignUp={this.handleSignUp} isLoggedIn={this.state.isLoggedIn}/>}/>
          </>}
        </Switch>
        <Footer isLoggedIn={this.state.isLoggedIn} handleLogOut={this.handleLogOut}/>        
      </React.Fragment>            
    )
  }
}

export default App

  