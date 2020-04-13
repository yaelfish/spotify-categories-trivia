import React, { Component } from 'react';
import spotifyService from '../services/spotifyService';
import utils from '../services/utils';
import CategoryList from '../cmps/CategoryList';
import CategoryGame from './CategoryGame';
import storageService from '../services/storageService';

class spotifyGameApp extends Component {
    constructor() {
        super();
        const params = utils.getHashParams();
        const token = params.access_token;
        if (token) {
            spotifyService.setAccessToken(token);
        }
        this.state = {
            loggedIn: token ? true : false,
            nowPlaying: false,
            tracks: [],
            categories: [],
            currCategory: '',
            username: ''
        }
    }

    componentDidMount() {
        this.checkForUserName();
        this.loadCategories();
    }

    checkForUserName = async () => {
        let userName = await storageService.load('username');
        if (userName) {
            this.setState({ username: userName });
        } 
        else {
            userName = prompt('Hi there! Whats your name?');

            storageService.store('username', userName);
            this.setState({ username: userName });
        }
    }

    loadCategories = async () => {
        let categories = await spotifyService.getCategories();
        this.setState({ categories: categories.categories.items });
    }

    resetGame = () => {
        this.setState(prevState => ({ nowPlaying: !prevState.nowPlaying}));
    }

    handleChange = async (e) => {
        let input = e.target.value;
        
        if (input === ''){
            storageService.store('username', input);
            this.checkForUserName();
        }
        this.setState({ username: input });
    }

    

    loadCategoryPlaylistsAndTracks = async (id, name) => {
       
        try {
            let categoryPlaylistsQuery = await spotifyService.getCategoryPlaylists(id);
            let categoryPlaylists = categoryPlaylistsQuery.playlists.items;
            let randomPlaylistIdx = utils.getRandomInt(categoryPlaylists.length);
            let playlistName = categoryPlaylists[randomPlaylistIdx].name;
            
            // in case of playlist dedicated to a single artist - cast lots again
            // if (playlistName.includes('This Is')) {
            //     this.loadCategoryPlaylistsAndTracks(id, name);
            // }

            let randomPlaylistId = categoryPlaylists[randomPlaylistIdx].id;
            let playListOwner = categoryPlaylists[randomPlaylistIdx].owner.id;
            let playlistTracks = await spotifyService.getPlaylistTracks(playListOwner, randomPlaylistId);
            
            this.setState({
                nowPlaying: true,
                currPlaylist: playlistName,
                currCategory: { id, name },
                categoryPlaylists: categoryPlaylists,
                tracks: playlistTracks.items
            });
        } 
        catch(error) {
            console.error(error);
            // alert(error);
            alert('No playlists for this category right now, please choose another category.');
            return;
        }
    }

    render() {

        const { categories, loggedIn, nowPlaying, tracks, currCategory, currPlaylist, username } = this.state;
        
        return (
            <div className="App">
                {!loggedIn && <a href='http://localhost:8888' > Login to Spotify </a>}
                <div className="username">
                    <select defaultValue={username}
                        onChange={this.handleChange}
                    >
                        <option value={username}>{username}</option>
                        <option value="">Sign Out</option>
                    </select>
                </div>      
                {nowPlaying && <CategoryGame
                    currCategory={currCategory}
                    currPlaylist={currPlaylist}
                    tracks={tracks}
                    onGoBack={this.resetGame}
                />}
                {loggedIn && !nowPlaying && categories.length && <CategoryList
                    categories={categories}
                    username={username}
                    onCategoryChoose={this.loadCategoryPlaylistsAndTracks}
                />}
            </div>
        );
    }
}

export default spotifyGameApp;
