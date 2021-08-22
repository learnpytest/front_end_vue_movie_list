<template>
  <div class="container mt-5">
    <!-- data-panel -->
    <div class="container mt-5">
      <!--search bar-->
      <SearchBar :movies-parent="movies" style="z-index: -1" />
      <div class="row" id="data-panel">
        <MovieCard
          v-for="movie in filteredMovies"
          :key="movie.id"
          :initial-movie="movie"
        />
      </div>
    </div>
    <Modal :movie-modal="movieToShow" />
  </div>
</template>

<script>
import MovieCard from "../components/MovieCard.vue";
import Modal from "../components/Modal.vue";
import SearchBar from "../components/SearchBar.vue";

const BASE_URL = "https://movie-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/movies/";
const POSTER_URL = BASE_URL + "/posters/";

const axios = require("axios");

const filters = {
  filterTitle: (movies) => (title) =>
    movies.filter((movie) => movie.title.toLowerCase().includes(title)),
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
      movieToShow: {},
      titleToSearch: "",
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
    showModal(movie) {
      this.movieToShow = movie;
      this.$bvModal.show("show-modal");
    },
    searchMovies(title) {
      this.titleToSearch = title;
    },
  },
  created() {
    this.fetchMovies();
  },

  mounted() {
    this.$on("showModal", this.showModal);
    this.$on("search", this.searchMovies);
  },
};
</script>
<style>
div.container {
  position: relative;
}
</style>