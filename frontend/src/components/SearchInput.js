import React from 'react';

export class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearch = () => {
    console.log('Searching for:', this.state.searchTerm);
  };

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission on Enter
      this.handleSearch();
    }
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={this.state.searchTerm}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown} 
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}
