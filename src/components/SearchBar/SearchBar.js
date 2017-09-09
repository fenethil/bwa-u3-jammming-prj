import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {keyword: ''};

    this.handleNewKeyword = this.handleNewKeyword.bind(this);
    this.newKeyWord = this.newKeyWord.bind(this);
  }

  newKeyWord(event){
    this.setState({keyword: event.target.value})
  }

  handleNewKeyword(){
    this.props.onSearch(this.state.keyword)
  }

  render () {
    return (
      <div className="SearchBar">
        <input  placeholder="Enter A Song, Album, or Artist"
                onChange={this.newKeyWord}
        />
        <a onClick={this.handleNewKeyword}>SEARCH</a>
        </div>
    )
  }
}

export default SearchBar;
