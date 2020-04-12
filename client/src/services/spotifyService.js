import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

export default {
    setAccessToken,
    getCategories,
    getCategoryPlaylists,
    getPlaylistTracks  
};

async function setAccessToken(token) {
    const resToken = await spotifyApi.setAccessToken(token);
    return resToken;
}

async function getCategories() {
    const categories = await spotifyApi.getCategories();
    return categories;
}

async function getCategoryPlaylists(categoryId) {
    const categoryPlaylists = await spotifyApi.getCategoryPlaylists(categoryId);
    return categoryPlaylists;
}

async function getPlaylistTracks(userId, playlistId) {
    const tracks = await spotifyApi.getPlaylistTracks(userId, playlistId);
    return tracks;
}







