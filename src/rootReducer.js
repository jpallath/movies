import { CHANGE_MOVIE } from "./actionCreators";
const initialState = {
  movieId: 550,
  link: "https://api.themoviedb.org/3/movie/",
  stash: "/lists?api_key=3efae5ab7e05aea57a8d360f177b8bc4&language=en-US&page=1"
};

export default function rootReducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case CHANGE_MOVIE:
      return {
        ...newState,
        movieId: action.movieId
      };
    default:
      return state;
  }
}
