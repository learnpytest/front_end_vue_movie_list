<template>
  <!-- print movie list here -->
  <!--Columns-->
  <div class="col-sm-3">
    <div class="card mb-2">
      <img class="card-img-top" :src="movie.image" alt="Card image cap" />
      <div class="card-body movie-item-body">
        <h5 class="card-title">{{ movie.title }}</h5>
      </div>
      <!-- "More" button -->
      <div class="card-footer">
        <b-button class="card__btn" @click="emitShowModal" variant="info mr-2"
          >More</b-button
        >

        <!--     Favorite button           -->
        <b-button
          variant="danger mr-2"
          class="card__btn btn-delete-favorite"
          v-if="getFavorite()"
          @click="deleteFavorite"
        >
          -
        </b-button>
        <b-button
          variant="warning"
          class="card__btn btn-add-favorite"
          v-else
          @click="addFavorite"
        >
          +
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
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
      display: "columns",
    };
  },
  created() {
    this.fetchFavorite();
  },
  watch: {
    favorites: {
      handler: function () {
        this.saveLocalStorage(this.favorites);
      },
      deep: true,
    },
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
  },
};
</script>
<style>
.card__btn {
  margin-right: 10px;
}
</style>