import React, { Component } from "react";
import MovieList from "../components/movieList";
import axios from "axios";
import "../styles/movies.css";
import { connect } from "react-redux";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
    this.getMovieForList = this.getMovieForList.bind(this);
  }
  componentDidMount() {
    this.getMovieForList(this.props.movieId);
  }
  componentDidUpdate() {
    this.getMovieForList(this.props.movieId);
  }
  getMovieForList = value => {
    axios.get(`${this.props.link}${value}${this.props.stash}`).then(res => {
      this.setState({ lists: res.data.results.slice(0, 3) });
    });
  };
  render() {
    let { lists } = this.state;
    let list = [];
    if (lists.length > 0) {
      list = lists.map(list => <MovieList key={list.id} {...list} />);
    }
    return <div className="movies">{list}</div>;
  }
}

function mapStateToProps(reduxState) {
  return {
    movieId: reduxState.movieId,
    link: reduxState.link,
    stash: reduxState.stash
  };
}

export default connect(mapStateToProps)(Movies);
