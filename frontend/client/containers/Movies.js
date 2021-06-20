const getMovies = (movies, type) => {
  switch (type) {
    case 'POPULAR':
      return movies
    case 'SHOW_COMPLETED':
      return movies.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return movies.filter(t => !t.completed)
  }
}

const mapStateToProps = state => {
  return {
    movies: getMovies(state.movies, state.type)
  }
}