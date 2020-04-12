import React, { Component } from 'react';


export default class CategoryPreview extends Component {

    onCategoryChoose = () => {
        const {id, name} = this.props.category;
        this.props.onCategoryChoose(id, name);
    }
    
    render() { 

        const { name } = this.props.category;
        const image = this.props.category.icons["0"].url;

        return (
            <div className="card" onClick={this.onCategoryChoose}>
                <span>{name}</span>
                <img src={image} alt={name}></img>
            </div>
        )
    }
}

