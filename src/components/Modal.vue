<template>
  <div>
    <!-- The modal -->
    <b-modal
      id="show-modal"
      :title="movieModal.title"
      size="lg"
      v-bind="toggleModeStyle"
    >
      <template slot="modal-header">
        <h5>{{ movieModal.title }}</h5>
      </template>
      <div class="modal-body">
        <div class="row">
          <img :src="movieModal.image" alt="movie image" class="col-sm-8" />
          <div class="col-sm-4">
            <p>
              <em>release at: {{ movieModal.release_date }}</em>
            </p>
            <p>{{ movieModal.description }}</p>
          </div>
        </div>
      </div>
      <template slot="modal-footer">
        <b-button
          size="sm"
          variant="outline-danger"
          @click="$bvModal.hide('show-modal')"
        >
          Close
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { bus } from "../main";

export default {
  name: "Modal",
  props: {
    movieModal: {
      type: Object,
      required: true,
    },
    initialDisplay: {
      type: String,
      required: true,
    },
    initialMode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      movie: this.movieModal,
      display: this.initialDisplay,
      mode: this.initialMode,
    };
  },
  computed: {
    toggleModeStyle() {
      return {
        "header-bg-variant": this.mode,
        "body-bg-variant": this.mode,
        "footer-bg-variant": this.mode,
        "header-text-variant": this.mode === "light" ? "dark" : "light",
        "body-text-variant": this.mode === "light" ? "dark" : "light",
        "footer-text-variant": this.mode === "light" ? "dark" : "light",
      };
    },
  },
  created() {
    bus.$on("changeMode", (mode) => {
      this.mode = mode;
    });
  },
};
</script>