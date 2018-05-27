import React, { Component } from "react";
import MovieList from "../components/movieList";
import axios from "axios";
import "../styles/movies.css";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link:
        "https://api.themoviedb.org/3/movie/550/lists?api_key=3efae5ab7e05aea57a8d360f177b8bc4&language=en-US&page=1",
      lists: []
    };
    this.getMovieForList = this.getMovieForList.bind(this);
  }
  componentDidMount() {
    this.getMovieForList();
  }
  getMovieForList = () => {
    axios.get(this.state.link).then(res => {
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

export default Movies;