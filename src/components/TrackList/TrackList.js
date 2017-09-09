import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component{
  render() {

    return (
      <div className="TrackList">
          {
            this.props.trackList.map(track => {
            return (<Track
                    track={track}
                    key={track.id}
                    onAdd={this.props.onAdd}
                    sign={this.props.sign}
                    />)
            })
          }
      </div>
    )
  }
}

export default TrackList;
