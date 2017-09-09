import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList.js';

class SearchResults extends React.Component{
  render () {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList
        trackList={this.props.searchResults}
        onAdd={this.props.onAdd}
        sign={this.props.sign}
        />
      </div>
    )
  }
}

export default SearchResults;
