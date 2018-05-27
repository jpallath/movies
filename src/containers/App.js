import React, { Component } from "react";
// import Header from "./Header";
// import Footer from "./Footer";
import Movies from "./Movies";
import MovieList from "../components/movieList";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="App">
            <Route exact path="/" render={props => <Movies />} />
          </div>
          <Route exact path="/list/:id" component={MovieList} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
