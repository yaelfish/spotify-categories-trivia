import React, { Component } from 'react';
import utils from '../services/utils';

export default class ArtistList extends Component {

    state = {
        optionArtists: []
    }

    shuffleArtists = (artists) => {
        const shuffled = artists.sort(() => Math.random() - 0.5);
        return shuffled;
    }

    componentDidMount() {
        // this.getRandomArtists();
    }

    getRandomArtists = () => {
        let artists = [];
        let currArtist = this.props.artist;
        artists.push(currArtist);
        console.log(artists);
        
        while (artists.length < 5) {
            const artistsLength = this.props.artists.length;
            const randomIdxArtist = utils.getRandomInt(artistsLength);
            const randomArtist = this.props.artists[randomIdxArtist];
            if (!artists.includes(randomArtist)) artists.push(randomArtist);
        }

        this.setState({ optionArtists: artists });
        return artists;
    }
    
    getArtistsOptions = () => {
        const {artists} = this.props;
        this.shuffleArtists(artists);
    }

    onArtistSelect = (ev) => {
        const selectedArtist = ev.target.innerText;
        let isCorrect = false;
        if (selectedArtist === this.props.artist){
            isCorrect = true;
            console.log('win');
        } else {
            isCorrect = false;
            console.log('try again')
        }
        this.markRightAnswer(isCorrect);
        this.updateScore(isCorrect);   
    }

    markRightAnswer = (isCorrect) => {
        console.log(isCorrect);
        
    }

    updateScore = (isCorrect) => {
        this.props.updateScore(isCorrect);
    }

    render() {
        // geneate answers function
        let { artists, artist } = this.props;
        let shuffled = this.shuffleArtists(artists);
        let options = shuffled.slice(0,4);
        options.push(artist);
        shuffled = this.shuffleArtists(options);

        return (
            <div className="artist-list-container flex align-center justify-center">
                <ul>
                    {options.map(option => {
                    return <li 
                            onClick={this.onArtistSelect} 
                            key={utils.getRandomId()}
                            className="artist-option"
                            >
                        {option}
                           </li>
                    })} 
                </ul>
            </div>
        )
    }
}
