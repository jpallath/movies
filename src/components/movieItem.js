import React, { Component } from "react";
import axios from "axios";

class MovieItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "?api_key=3efae5ab7e05aea57a8d360f177b8bc4&language=en-US",
      movieAPILink: "https://api.themoviedb.org/3/movie/",
      movie: {}
    };
    this.getMovie = this.getMovie.bind(this);
  }
  getMovie = () => {
    let call = `${this.state.movieAPILink}${this.props.id}${this.state.key}`;
    axios.get(call).then(res => {
      let movieData = res.data;
      this.setState({ movie: movieData });
    });
  };

  componentDidMount() {
    this.getMovie();
  }
  render() {
    let { title, overview, poster_path, imdb_id } = this.state.movie;
    let imdb_link = `https://www.imdb.com/title/${imdb_id}`;
    let image = `http://image.tmdb.org/t/p/w185//${poster_path}`;
    let seen = title
      ? "movieitem card col sm12"
      : "movieitem card col sm12 hidden";
    return (
      <div className={seen}>
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src={image} alt={title} />
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">
            {title}
            <i className="material-icons right">more_vert</i>
          </span>
          <p>
            <a href={imdb_link}>IMDB Page</a>
          </p>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            {title}
            <i className="material-icons right">close</i>
          </span>
          <p>{overview}</p>
        </div>
      </div>
    );
  }
}

export default MovieItem;
