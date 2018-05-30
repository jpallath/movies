import React, { Component } from "react";
import axios from "axios";
import "../styles/header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      popMovies: []
    };
    this.getMovieNav = this.getMovieNav.bind(this);
    this.showMenu = this.showMenu.bind(this);
  }
  componentDidMount() {
    this.getMovieNav();
  }

  getMovieNav = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=3efae5ab7e05aea57a8d360f177b8bc4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
      )
      .then(res => this.setState({ popMovies: res.data.results }));
  };

  showMenu = event => {
    event.preventDefault();
    let newState = this.state.showMenu;
    this.state.showMenu ? (newState = false) : (newState = true);
    this.setState({ showMenu: newState });
  };

  render() {
    let { popMovies } = this.state;
    let movieFilters = popMovies.map(movie => (
      <button key={movie.id}>{movie.original_title}</button>
    ));
    return (
      <div className="header">
        <div>Movie Selection!</div>
        <button onClick={this.showMenu}>Menu</button>
        {this.state.showMenu ? (
          <div className="menu">{movieFilters}</div>
        ) : null}
      </div>
    );
  }
}

export default Header;
