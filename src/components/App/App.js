import React from 'react';
import './App.css';

import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: 'Jammming Playlist',
      playlistTracks: [],
    };

    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.changePlayListName = this.changePlayListName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);


  }

  // method triggered when the '+' is clicked on any track from the search results panel.
  // The method will first check if the playlist already has the track
  // If not, then it will add the track to the playlist
  addTrack(addedTrack) {

    const isInPlaylist = {IDS: 0};

    for(  let playlistTracksIndex = 0;
          playlistTracksIndex < this.state.playlistTracks.length;
          playlistTracksIndex++ ) {
      if(this.state.playlistTracks[playlistTracksIndex].id === addedTrack.id) {isInPlaylist.IDS = 1}
    }

    if(isInPlaylist.IDS === 0){
      this.setState({playlistTracks: this.state.playlistTracks.concat(addedTrack)})
    }
  }

  // Method triggered when the '-' is clicked on any track from the playlist panel
  // The method creates a new playlist without the clicked track
  removeTrack(TrackToDelete) {

    const updatedPlaylist = [];

    this.state.playlistTracks.forEach(element => {
      if(element.id !== TrackToDelete.id) {
        updatedPlaylist.push(element)}
    })

      this.setState({playlistTracks: updatedPlaylist})
  }

  // Change the playlist name by the one typed in the playlist panel
  changePlayListName(playlistName){
    this.setState({playlistName: playlistName});
  }

  // creates an array which contains the uri of each track in the playlist.
  // calls the postNewPlaylist from Spotify.js which:
    // 1. gets the userID if needed
    // 2. creates the playlist in the users's spotify account
    // 3. populate the created playlist with the tracks in the playlist
  savePlaylist(){
    const TracksUriToSave = this.state.playlistTracks.map(track => {
      return track.uri
    });

    Spotify.postNewPlaylist(this.state.playlistName, TracksUriToSave);

  }

  // Method that get the search results from the spotify API (in util)
  // Then push the results into the search results panel
  search(keyword){
    Spotify.search(keyword).then(tracks => {
      this.setState({searchResults: tracks})})
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
            onSearch={this.search}
          />
          <div className="App-playlist">

            <SearchResults
            searchResults={this.state.searchResults}
            onAdd={this.addTrack}
            sign='+'
            />

            <Playlist
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onAdd={this.removeTrack}
            sign='-'
            changePlayListName={this.changePlayListName}
            clickSave={this.savePlaylist}
            />

          </div>
        </div>
      </div>
    );
  }
}

export default App;
