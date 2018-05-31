export const CHANGE_MOVIE = "CHANGE_MOVIE";

export function changeMovie(movieId) {
  return {
    type: CHANGE_MOVIE,
    movieId
  };
}
