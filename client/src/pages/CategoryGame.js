import React, { Component } from 'react';
import AudioPlayer from '../cmps/AudioPlayer';
import ArtistList from '../cmps/ArtistList';
import storageService from '../services/storageService';

export default class CategoryGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            trackPlaying: null,
            artists: [],
            tracks: [],
            round: 1,
            score: 0
        }
    }

    componentDidMount() {
        this.loadDataFromLS();
        let { tracks } = this.props;
        tracks = this.shuffleTracks(tracks);
        this.setState({ tracks });
    }

    loadDataFromLS = async () => {
        let currRound = await storageService.load('round');
        let currScore = await storageService.load('score');
        if(currRound){
            this.setState({ round: currRound, score: currScore });
        }
    }

    pickASong = () => { // pick a song ?
        let { tracks, round } = this.state;
        if (tracks[round].track.preview_url) {
            this.setState({ trackPlaying: tracks[round] }, this.setArtistsOptions);
        };
    }

    nextRound = () => {
        let isGameOver = this.checkIfGameOver();
        if(isGameOver){
            storageService.store('score', 0);
            storageService.store('round', 1);
            alert(`Game Over! Your score is: ${this.state.score}. Choose a category to start new round`);
            this.props.onGoBack();
            return;
        }
        else {
            this.setState(prevState => ({ round: prevState.round + 1 }), this.updateRoundInLS);
            this.pickASong();
        }
    }

    updateRoundInLS = () => {
        storageService.store('round', this.state.round);
    }

    checkIfGameOver = () => {
        if(this.state.round >= 10){
            return true;
        }
        else return false
    }

    shuffleTracks = (tracksToShuffle) => {
        const sorted = tracksToShuffle.sort(() => Math.random() - 0.5);
        let shuffled = sorted.splice(0, 10);
        return shuffled;
    }

    setArtistsOptions = () => {
        let currArtist = this.getCurrArtist();
        let allArtists = this.getAllArtists();
        this.setState({ artists: allArtists, currArtists: currArtist })
    }

    getAllArtists = () => {
        let { tracks } = this.props;
        let allArtists = [];
        tracks.map(track => {
            return allArtists.push(track.track.artists[0].name);
        });
        return allArtists;
    }

    getCurrArtist = () => {
        let { trackPlaying } = this.state;
        let currArtist = trackPlaying.track.artists;
        let currArtists;
        if (currArtist.length === 1) {
            currArtists = trackPlaying.track.artists[0].name;
        }
        else {
            currArtists = [];
            currArtist.forEach(artist => {
                currArtists.push(artist.name);
            });
            currArtists = currArtists.join(' & ');
        }
        return currArtists;
    }

    updateScore = (isCorrect) => {
        let addScore = isCorrect ? 1 : 0;
        this.setState(prevState => ({ score: prevState.score + addScore }), this.updateScoreInLS);
        this.nextRound();
    }

    updateScoreInLS = () => {
        storageService.store('score', this.state.score);
    }

    render() {
        let { artists, trackPlaying, currArtists, score, round } = this.state;
        let { name } = this.props.currCategory;

        return (<div className="container">
            <button onClick={this.props.onGoBack} className="back-btn">Go Back</button>
            <h2 className="title-category">{name} Category </h2>
            <div className="flex justify-between">
                <span>Round: {round} / 10</span>
                <span>Score: {score}</span>
            </div>

            {!trackPlaying && <button onClick={this.pickASong}>Start</button>}
            {trackPlaying && <>
                <AudioPlayer
                    src={trackPlaying.track.preview_url}
                />
                <ArtistList
                    artists={artists}
                    artist={currArtists}
                    updateScore={this.updateScore}
                /></>
            }
        </div>)
    }
}