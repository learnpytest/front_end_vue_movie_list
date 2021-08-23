<template>
  <!-- print movie list here -->

  <div :class="display === 'column' ? 'col-sm-3' : 'col-12'">
    <!--Columns-->
    <div
      v-if="display === 'column'"
      class="card mb-2"
    >
      <img
        class="card-img-top"
        :src="movie.image"
        alt="Card image cap"
      >
      <div class="card-body movie-item-body">
        <h5 class="card-title">
          {{ movie.title }}
        </h5>
      </div>
      <!-- "More" button -->
      <div class="card-footer">
        <b-button
          class="card__btn"
          variant="info mr-2"
          @click="emitShowModal"
        >
          More
        </b-button>

        <!--     Favorite button           -->
        <b-button
          v-if="getFavorite()"
          variant="danger mr-2"
          class="card__btn btn-delete-favorite"
          @click="deleteFavorite"
        >
          -
        </b-button>
        <b-button
          v-else
          variant="warning"
          class="card__btn btn-add-favorite"
          @click="addFavorite"
        >
          +
        </b-button>
      </div>
    </div>

    <!-- Lists -->
    <div
      v-if="display === 'list'"
      class="col-sm-10 card d-flex flex-row align-items-center"
      style="margin: 0 auto"
    >
      <div class="card-body movie-item-body">
        <h5 class="card-title m-0">
          {{ movie.title }}
        </h5>
      </div>
      <!-- "More" button -->
      <div
        class="card-footer"
        style="border: none"
      >
        <b-button
          class="card__btn"
          variant="info mr-2"
          @click="emitShowModal"
        >
          More
        </b-button>

        <!--     Favorite button           -->
        <b-button
          v-if="getFavorite()"
          variant="danger mr-2"
          class="card__btn btn-delete-favorite"
          @click="deleteFavorite"
        >
          -
        </b-button>
        <b-button
          v-else
          variant="warning"
          class="card__btn btn-add-favorite"
          @click="addFavorite"
        >
          +
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from "../main";

const STORAGE_KEY_FAVORITE_MOVIES = "favorite-movies";
const filters = {
  findMovie: (id) => (movies) => movies.find((movie) => movie.id === id),
};

export default {
  props: {
    initialMovie: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      movie: this.initialMovie,
      favorites: [],
      display: "column",
    };
  },
  watch: {
    favorites: {
      handler: function () {
        this.saveLocalStorage(this.favorites);
      },
      deep: true,
    },
  },
  created() {
    this.fetchFavorite();
    this.display = this.$route.params.display;
    bus.$on("changeDisplay", this.changeDisplay);
  },
  methods: {
    emitShowModal() {
      this.$parent.$emit("showModal", this.movie);
    },
    fetchFavorite() {
      this.favorites =
        JSON.parse(localStorage.getItem(STORAGE_KEY_FAVORITE_MOVIES)) || [];
    },
    saveLocalStorage(data) {
      localStorage.setItem(STORAGE_KEY_FAVORITE_MOVIES, JSON.stringify(data));
    },
    getFavorite() {
      return filters.findMovie(this.movie.id)(this.favorites);
    },
    addFavorite() {
      this.fetchFavorite();
      this.favorites.push(this.movie);
    },
    deleteFavorite() {
      this.fetchFavorite();
      this.favorites = this.favorites.filter(
        (movie) => movie.id !== this.movie.id
      );
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