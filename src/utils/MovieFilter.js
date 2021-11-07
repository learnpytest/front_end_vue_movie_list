const movieFilter = {
  filterTitle: (movies) => (title) =>
    movies.filter((movie) => movie.title.toLowerCase().includes(title)),
  exists: (id) => (movies) => movies.some((movie) => movie.id === id),
  findMovie: (id) => (movies) => movies.find((movie) => movie.id === id),
  filterMovie: (id) => (movies) => movies.filter((movie) => movie.id !== id),
};

export default movieFilter