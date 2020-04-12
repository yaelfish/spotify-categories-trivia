import React, { Component } from 'react';
import { getRandomInt } from '../services/utils'
import musicService from '../services/musicService';
import CategoryList from '../cmps/CategoryList';
import CategoryPreview from '../cmps/CategoryPreview';

export default class MusicApp extends Component {
    state = {
        albums: [],
        artistsOptions: [],
        currAlbum: null,
        currArtist: null,
        isPlaying: false,
        round: 1,
        score: 0,
        tries: 0,
        combo: 0
    }

    componentDidMount() {
        this.authorize();
        this.loadAlbums();
    }

    authorize =() => {
        musicService.authorize();
    }

    loadAlbums = () => {
        musicService.query()
            .then(albums => this.setState({ albums: albums.feed.entry }))
            .catch((err) => this.props.history.push('/'));
    }

    startRound = async () => {
        const { round } = this.state;
        if (round === 1) this.resetScore();
        const randomAlbum = await this.getRandomAlbum();
        this.setState({ currAlbum: randomAlbum });
        const currArtist = await this.getCurrArtist();
        const artistsOptions = await this.getRandomArtists();

        this.setState({
            artistsOptions: artistsOptions,
            currArtist: currArtist,
            isPlaying: true
        });
    }

    resetScore = () => {
        this.setState({ score: 0 });
    }

    nextRound = () => {
        this.setState({ tries: 0 });

        if (this.state.round > 9) {
            alert('The End! Your score is: ' + this.state.score);
            this.setState({
                round: 1,
                isPlaying: false
            });
        } else {
            this.setState(prevState => ({ round: prevState.round + 1 }));
            this.startRound();
        }
    }



    roundTrials = (isCorrect) => {
        let { tries, combo, score } = this.state;
        if (tries === 2 && !isCorrect) {
            this.setState(prevState => ({
                score: prevState.score - 5,
                tries: 0,
                combo: 0
            }));
            return this.nextRound();
        }
        else if (!isCorrect) {
            this.setState(prevState => ({
                combo: 0,
                tries: prevState.tries + 1
            }));
        }
        else {
            switch (tries) {
                case 0:
                    score += 10;
                    combo += 1;
                    this.updateCombo(combo);
                    break;
                case 1:
                    score += 5;
                    break;
                case 2:
                    score += 2;
                    break;
                default:
                    score -= 5;
                    this.nextRound();
                    break;
            }
            this.setState({
                score: score,
                combo: combo,
                tries: 0
            });
        }
    }

    updateCombo = (combo) => {
        let { score } = this.state;
        switch (combo) {
            case 2:
                score = score + 10;
                break;
            case 5:
                score += 100;
                break;
            case 8:
                score += 1000;
                break;
            default:
                break;
        }
        console.log('combo, score', combo, score);
        this.setState({ score: score });
    }

    getRandomAlbum = () => {
        const albumsLength = this.state.albums.length;
        const randomIdxAlbum = getRandomInt(albumsLength);
        const album = this.state.albums[randomIdxAlbum];
        return album;
    }

    getCurrArtist = () => {
        if (!this.state.currAlbum) return;
        let currArtist = this.state.currAlbum['im:artist'].label;
        return currArtist;
    }

    getRandomArtists = () => {
        let artists = [];
        let currArtist = this.getCurrArtist();
        artists.push(currArtist);
        while (artists.length < 5) {
            let album = this.getRandomAlbum();
            let artist = album['im:artist'].label;
            if (!artists.includes(artist)) artists.push(artist);
        }

        this.setState({ artistsOptions: artists });
        return artists;
    }

    render() {
        let { isPlaying, currAlbum, currArtist, artistsOptions } = this.state;
        let visible = (isPlaying ? 'hidden' : 'visible')
        return (
            <div>
                <h1>Guess The Artist</h1>

                <ul className="flex justify-around">
                    <li>Round: {this.state.round}</li>
                    <li>Tries: {this.state.tries}</li>
                    <li>Score: {this.state.score}</li>
                </ul>

                <button onClick={this.startRound}
                    style={{ visibility: visible }}
                    className="start-btn"
                >
                    Start
                </button>

                {this.state.isPlaying && <CategoryPreview album={currAlbum} />}
                {this.state.isPlaying && <CategoryList
                    artistsOptions={artistsOptions}
                    currArtist={currArtist}
                    nextRound={this.nextRound}
                    roundTrials={this.roundTrials}
                />}
            </div>
        )
    }
}
