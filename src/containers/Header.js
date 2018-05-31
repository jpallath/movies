import React, { Component } from "react";
import axios from "axios";
import "../styles/header.css";
import { connect } from "react-redux";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      firstTime: true,
      popMovies: []
    };
    this.getMovieNav = this.getMovieNav.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.changeList = this.changeList.bind(this);
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
    let newState = this.state;
    this.state.firstTime
      ? (newState.firstTime = false)
      : (newState.firstTime = null);
    this.state.showMenu
      ? (newState.showMenu = false)
      : (newState.showMenu = true);
    this.setState({
      showMenu: newState.showMenu,
      firstTime: newState.firstTime
    });
  };

  changeList = id => {
    this.props.dispatch({ type: "CHANGE_MOVIE", movieId: id });
    this.setState({ showMenu: false });
  };

  render() {
    let { popMovies } = this.state;
    let movieFilters = popMovies.map(movie => (
      <button key={movie.id} onClick={() => this.changeList(movie.id)}>
        {movie.original_title}
      </button>
    ));
    return (
      <div className="header">
        <div>Movie Selection!</div>
        <button onClick={this.showMenu}>Menu</button>

        {this.state.showMenu ? (
          <div className="menu shown">{movieFilters}</div>
        ) : (
          <div className="menu hidden" value={this.state.firstTime}>
            {movieFilters}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    movieId: reduxState.movieId
  };
}

export default connect(mapStateToProps)(Header);
