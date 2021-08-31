<template>
  <div class="container mt-5">
    <!-- data-panel -->
    <div
      class="container mt-5"
      style="min-height: 100vh"
    >
      <!--search bar-->
      <SearchBar
        :movies-parent="favorites"
        style="z-index: -1"
      />
      <div
        id="data-panel"
        class="row"
      >
        <!-- print movie list here -->
        <MovieCard
          v-for="movie in filteredFavorites"
          :key="movie.id"
          :initial-movie="movie"
          :is-favorite="isFavorite(movie.id)"
          @showModal="showModal(movie)"
          @after-delete-favorite="afterDeleteFavorite"
        />
      </div>
    </div>

    <!-- Modal -->
    <Modal
      :movie-modal="movieToShow"
      :initial-display="display"
      :initial-mode="mode"
    />
  </div>
</template>

<script>
import MovieCard from "../components/MovieCard.vue";
import SearchBar from "../components/SearchBar.vue";
import Modal from "../components/Modal.vue";
import { bus } from "../main";

const STORAGE_KEY_FAVORITE_MOVIES = "favorite-movies";

const filters = {
  filterTitle: (movies) => (title) =>
    movies.filter((movie) => movie.title.toLowerCase().includes(title)),
  exists: (id) => (movies) => movies.some((movie) => movie.id === id),
};

export default {
  name: "Favorites",
  components: {
    MovieCard,
    SearchBar,
    Modal,
  },
  data() {
    return {
      favorites: [],
      titleToSearch: "",
      movieToShow: {},
      display: "column",
      mode: "light",
    };
  },
  computed: {
    filteredFavorites: {
      get() {
        return this.titleToSearch
          ? filters.filterTitle(this.favorites)(this.titleToSearch)
          : this.favorites;
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
    this.fetchFavorites();
    this.display = this.$route.params.display;
    this.mode = this.$route.params.mode;
    bus.$on("changeDisplay", this.changeDisplay);
  },
  mounted() {
    this.$on("search", this.searchMovies);
  },
  methods: {
    showModal(movie) {
      this.movieToShow = movie;
      this.$bvModal.show("show-modal");
    },
    fetchFavorites() {
      this.favorites =
        JSON.parse(localStorage.getItem(STORAGE_KEY_FAVORITE_MOVIES)) || [];
    },
    isFavorite(id) {
      return filters.exists(id)(this.favorites);
    },
    afterDeleteFavorite(movieId) {
      this.favorites = this.favorites.filter((movie) => movie.id !== movieId);
    },
    searchMovies(title) {
      this.titleToSearch = title;
    },
    changeDisplay(display) {
      this.display = display;
    },
  },
};
</script>

<style>
.card__btn {
  margin-right: 10px;
}
</style>