import React from 'react';
import './Track.css';



class Track extends React.Component{

  constructor(props){
    super(props);
    this.handleAddTrack = this.handleAddTrack.bind(this);
  }

  signChange() {
    if(this.props.sign === '+'){return '+'}
    else {return '-'}
  }

  handleAddTrack() {
    this.props.onAdd(this.props.track);

  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a className="Track-action" onClick={this.handleAddTrack}>{this.signChange()}</a>
      </div>
    )
  }
}

export default Track;
