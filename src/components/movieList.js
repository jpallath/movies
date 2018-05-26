import React, { Component } from "react";
import MovieItem from "../components/movieItem";

import axios from "axios";

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "?api_key=3efae5ab7e05aea57a8d360f177b8bc4&language=en-US",
      movieAPILink: "https://api.themoviedb.org/3/list/",
      list: []
    };
    this.getList = this.getList.bind(this);
  }
  componentDidMount() {
    this.getList();
  }
  getList = () => {
    let call = `${this.state.movieAPILink}${this.props.id}${this.state.key}`;
    axios.get(call).then(res => {
      let listItems = res.data.items.slice(0, 5);
      this.setState({ list: listItems });
    });
  };

  render() {
    let { id, name, description } = this.props;
    let { list } = this.state;
    let listItems = list.map(movie => <MovieItem {...movie} key={movie.id} />);
    // let movieItems = movies.map((movie, index) => (
    //   <MovieItem {...movie} key={index} />
    // ));
    return (
      <div className="movielist row col sm12">
        <h1>{name}</h1>
        <p>{description ? description : "here we be"}</p>
        <div className="movieItems row">{listItems}</div>
      </div>
    );
  }
}

export default MovieList;
