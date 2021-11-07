<template>
  <!-- navigation -->
  <nav
    class="navbar nav-header navbar-expand-lg"
    style="z-index: 10; padding-left: 20px"
  >
    <router-link
      class="navbar-brand"
      :to="{ name: 'root', query:{source:'all'} }"
    >
      Movie List
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div
      id="navbarSupportedContent"
      class="collapse navbar-collapse"
    >
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link
            :to="{ name: 'movies', params: { display, mode }, query:{source:'all'} }"
            class="nav-link"
          >
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name:'movies', params: { display, mode }, query:{source:'favorites'} }"
            class="nav-link"
          >
            favorite
          </router-link>
        </li>
      </ul>
      <div
        class="b-icons-block b-icons--mode"
        style="margin-left: 20px"
      >
        <b-icon
          v-show="mode === 'light'"
          class="b-icon"
          icon="sun"
          variant="warning"
          font-scale="1.5"
          @click="changeMode('dark')"
        />
        <b-icon
          v-show="mode === 'dark'"
          class="b-icon"
          icon="moon"
          variant="warning"
          font-scale="1.5"
          @click="changeMode('light')"
        />
        {{ mode }}
      </div>
      <div
        class="b-icons-block b-icons--display"
        style="margin-left: 20px"
      >
        <b-icon
          v-show="display === 'column'"
          class="b-icon"
          icon="columns"
          variant="warning"
          font-scale="1.5"
          @click="changeDisplay('list')"
        />
        <b-icon
          v-show="display === 'list'"
          class="b-icon"
          icon="card-list"
          variant="warning"
          font-scale="1.5"
          @click="changeDisplay('column')"
        />
        {{ display }}
      </div>
    </div>
  </nav>
</template>

<script>
//test
import { bus } from "../main";

export default {
  name: "Navbar",
  data() {
    return {
      mode: "light",
      display: "column",
    };
  },
  methods: {
    changeMode(mode) {
      this.mode = mode;
      this.$parent.$emit("changeMode", mode);
      bus.$emit("changeMode", mode);
    },
    changeDisplay(display) {
      this.display = display;
      this.$route.params.display = display;
      bus.$emit("changeDisplay", display);
    },
  },
};
</script>
