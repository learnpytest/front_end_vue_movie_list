<template>
  <div
    class="container mt-5"
    style="min-height: 100vh"
  >
    <!-- data-panel -->
    <div class="container mt-5">
      <!--search bar-->
      <SearchBar
        :movies-parent="movies"
        style="z-index: -1"
      />
      <div
        id="data-panel"
        class="row"
      >
        <MovieCard
          v-for="movie in filteredMovies"
          :key="movie.id"
          :initial-movie="movie"
          :is-favorite="isFavorite(movie.id)"
          @showModal="showModal(movie)"
          @after-add-favorite="afterAddFavorite"
          @after-delete-favorite="afterDeleteFavorite"
        />
      </div>
    </div>
    <Modal
      :movie-modal="movieToShow"
      :initial-display="display"
      :initial-mode="mode"
    />
  </div>
</template>

<script>
import MovieCard from "../components/MovieCard.vue";
import Modal from "../components/Modal.vue";
import SearchBar from "../components/SearchBar.vue";

const BASE_URL = "https://movie-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/movies/";
const POSTER_URL = BASE_URL + "/posters/";

const STORAGE_KEY_FAVORITE_MOVIES = "favorite-movies";

const axios = require("axios");

const filters = {
  filterTitle: (movies) => (title) =>
    movies.filter((movie) => movie.title.toLowerCase().includes(title)),
  exists: (id) => (movies) => movies.some((movie) => movie.id === id),
  findMovie: (id) => (movies) => movies.find((movie) => movie.id === id),
  filterMovie: (id) => (movies) => movies.filter((movie) => movie.id !== id),
};

export default {
  components: {
    MovieCard,
    Modal,
    SearchBar,
  },
  data() {
    return {
      movies: [],
      favorites: [],
      movieToShow: {},
      titleToSearch: "",
      display: "column",
      mode: "light",
    };
  },
  computed: {
    filteredMovies: {
      get() {
        return this.titleToSearch
          ? filters.filterTitle(this.movies)(this.titleToSearch)
          : this.movies;
      },
    },
  },
  watch: {
    favorites: {
      handler: function () {
        localStorage.setItem(
          STORAGE_KEY_FAVORITE_MOVIES,
          JSON.stringify(this.favorites)
        );
      },
      deep: true,
    },
  },
  created() {
    this.fetchMovies();
    this.fetchFavorite();
    this.$route.params.display = this.display;
    this.mode = this.$route.params.mode;
  },

  mounted() {
    this.$on("search", this.searchMovies);
  },
  methods: {
    fetchMovies() {
      //用 axios 接入 API 資料
      axios
        .get(INDEX_URL)
        .then((response) => {
          // map() 運算原始資料，回傳新的陣列
          // 這裡在 {} 外加 ()，可以自動 return 物件
          this.movies = response.data.results.map((movie) => ({
            // 展開原本的 movie，再複寫要修改的內容
            ...movie,
            image: POSTER_URL + movie.image,
          }));
        })
        .catch((error) => console.log(error));
    },
    fetchFavorite() {
      this.favorites =
        localStorage.getItem(STORAGE_KEY_FAVORITE_MOVIES) !== undefined
          ? JSON.parse(localStorage.getItem(STORAGE_KEY_FAVORITE_MOVIES))
          : [];
    },
    afterAddFavorite(movieId) {
      const movie = filters.findMovie(movieId)(this.movies);
      this.favorites.push(movie);
    },
    afterDeleteFavorite(movieId) {
      this.favorites = filters.filterMovie(movieId)(this.favorites);
    },
    isFavorite(id) {
      return filters.exists(id)(this.favorites);
    },
    showModal(movie) {
      this.movieToShow = movie;
      this.$bvModal.show("show-modal");
    },
    searchMovies(title) {
      this.titleToSearch = title;
    },
  },
};
</script>
<style>
div.container {
  position: relative;
}
</style>