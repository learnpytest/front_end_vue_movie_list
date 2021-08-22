<template>
  <div class="container mt-5">
    <!-- data-panel -->
    <div class="container mt-5" style="height: 100vh">
      <!--search bar-->
      <SearchBar :movies-parent="favorites" style="z-index: -1" />
      <div class="row" id="data-panel">
        <!-- print movie list here -->
        <div
          :class="display === 'column' ? 'col-sm-3' : 'col-12'"
          v-for="movie in filteredFavorites"
          :key="movie.id"
        >
          <!-- Column -->
          <div class="card mb-2" v-if="display === 'column'">
            <img class="card-img-top" :src="movie.image" alt="Card image cap" />
            <div class="card-body movie-item-body">
              <h5 class="card-title">{{ movie.title }}</h5>
            </div>
            <!-- "More" button -->
            <div class="card-footer">
              <b-button
                class="card__btn"
                @click="showModal(movie)"
                variant="info mr-2"
                >More</b-button
              >

              <!--     Favorite button           -->
              <button
                class="card__btn btn btn-danger btn-delete-favorite"
                @click="deleteFavorite(movie.id)"
              >
                -
              </button>
            </div>
          </div>

          <!-- List -->
          <div
            class="col-sm-10 card d-flex flex-row align-items-center"
            v-if="display === 'list'"
            style="margin: 0 auto"
          >
            <div class="card-body movie-item-body">
              <h5 class="card-title m-0">{{ movie.title }}</h5>
            </div>
            <!-- "More" button -->
            <div class="card-footer" style="border: none">
              <b-button
                class="card__btn"
                @click="showModal(movie)"
                variant="info mr-2"
                >More</b-button
              >

              <!--     Favorite button           -->
              <button
                class="card__btn btn btn-danger btn-delete-favorite"
                @click="deleteFavorite(movie.id)"
              >
                -
              </button>
            </div>
          </div>
        </div>
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
import SearchBar from "../components/SearchBar.vue";
import Modal from "../components/Modal.vue";
import { bus } from "../main";

const STORAGE_KEY_FAVORITE_MOVIES = "favorite-movies";

const filters = {
  filterTitle: (movies) => (title) =>
    movies.filter((movie) => movie.title.toLowerCase().includes(title)),
};

export default {
  name: "Favorites",
  components: {
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
  methods: {
    showModal(movie) {
      this.movieToShow = movie;
      this.$bvModal.show("show-modal");
    },
    fetchFavorites() {
      this.favorites =
        JSON.parse(localStorage.getItem(STORAGE_KEY_FAVORITE_MOVIES)) || [];
    },
    deleteFavorite(id) {
      this.favorites = this.favorites.filter((movie) => movie.id !== id);
    },
    searchMovies(title) {
      this.titleToSearch = title;
    },
    changeDisplay(display) {
      this.display = display;
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
};
</script>

<style>
.card__btn {
  margin-right: 10px;
}
</style>