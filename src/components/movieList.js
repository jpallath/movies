import React, { Component } from "react";
import MovieItem from "../components/movieItem";
import { Link } from "react-router-dom";
import axios from "axios";

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "?api_key=3efae5ab7e05aea57a8d360f177b8bc4&language=en-US",
      movieAPILink: "https://api.themoviedb.org/3/list/",
      list: [],
      name: "",
      description: ""
    };
    this.getList = this.getList.bind(this);
  }
  componentDidMount() {
    this.getList();
  }
  getList = () => {
    let listId = this.props.id ? this.props.id : this.props.match.params.id;
    let call = `${this.state.movieAPILink}${listId}${this.state.key}`;
    axios.get(call).then(res => {
      let { name, description } = res.data;
      let listItems = res.data.items.slice(0, 6);
      this.setState({ list: listItems, name: name, description: description });
    });
  };

  render() {
    let { name, description } = this.props;
    name ? null : ({ name, description } = this.state);
    let { list } = this.state;
    let listItems = list.map(movie => <MovieItem {...movie} key={movie.id} />);
    // let movieItems = movies.map((movie, index) => (
    //   <MovieItem {...movie} key={index} />
    // ));
    return (
      <div className="movielist row col sm12">
        {this.props.id ? (
          <Link to={`/list/${this.props.id}`}>
            <h1>{name}</h1>
          </Link>
        ) : (
          <h1>{name}</h1>
        )}
        <p>{description ? description : "here we be"}</p>
        <div className="movieItems row">{listItems}</div>
      </div>
    );
  }
}

export default MovieList;
