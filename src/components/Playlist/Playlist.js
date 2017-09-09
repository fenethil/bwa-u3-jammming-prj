import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList.js';

class Playlist extends React.Component{

  constructor(props) {
    super(props);
    this.handleChangeName = this.handleChangeName.bind(this);
  }

  handleChangeName(event) {
    this.props.changePlayListName(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input  placeholder= "Playlist Name"
                onChange={this.handleChangeName}/>
        <TrackList
          trackList={this.props.playlistTracks}
          onAdd={this.props.onAdd}
          sign={this.props.sign}/>
        <a  className="Playlist-save"
            onClick={this.props.clickSave}>
            SAVE TO SPOTIFY</a>
      </div>

    )

  }

};

export default Playlist;
