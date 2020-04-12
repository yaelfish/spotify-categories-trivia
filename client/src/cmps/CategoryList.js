import React, { Component } from 'react';
import CategoryPreview from './CategoryPreview';

export default class CategoryList extends Component {

    onCategoryChoose = (id, name) => {
        this.props.onCategoryChoose(id, name);
    }

    render() {
        const {categories, username} = this.props;
        return (
            <div>
                <h2>Hi {username}<br/> Please select a category to start playing</h2>
                <div className="cards-container container">
                {categories.map(category => {
                    return <CategoryPreview
                        key={category.id}
                        category={category}
                        onCategoryChoose={this.onCategoryChoose}
                    />
                })}
                </div>
            </div>
        )
    }
}
