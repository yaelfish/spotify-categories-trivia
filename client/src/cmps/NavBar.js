import React from 'react';
import { NavLink } from 'react-router-dom'

export default function NavBar(props) {
    return <nav className="main-nav">
        <ul>
            <li><NavLink exact to='/' activeClassName="active-link">Home</NavLink></li>
            <li><NavLink to='/play' exact activeClassName="active-link">Game</NavLink></li>          
        </ul>
    </nav>
}
