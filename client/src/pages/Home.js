import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
    render(){
        return <div>
            <h1>WELCOME TO <br /> GEUSS THE ARTIST</h1>
            <Link to={'/play'}>Press here or Game to Login and Start Playing!</Link>
        </div>
    }
}