import React, { Component } from 'react'
import './Footer.css'

class Footer extends Component {
    render () {
        return (
            <footer>
                <div className='footerDiv'>
                    {<a className='footer' href="/">Home</a>}
                    {this.props.isLoggedIn ? <a className='footer' href="/shopping-lists">Shopping Lists</a> : <a className='footer' href="/login">Log In</a>}
                    {this.props.isLoggedIn && <a className='footer'  href="/new-list">New List</a>}
                    {this.props.isLoggedIn ? <a className='footer' href="/" onClick={this.props.handleLogOut}>Log Out</a> : <a className='footer' href="/#signup">Register</a> }
                </div>
            </footer>
        )
    }
}

export default Footer
