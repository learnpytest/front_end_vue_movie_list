<template>
  <!-- navigation -->
  <nav
    class="navbar nav-header navbar-expand-lg"
    style="z-index: 10; padding-left: 20px"
  >
    <router-link class="navbar-brand" :to="{ name: 'root' }"
      >Movie List</router-link
    >
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'movies' }" class="nav-link"
            >Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'favorites' }" class="nav-link"
            >favorite</router-link
          >
        </li>
      </ul>
      <div class="b-icons-block" style="margin-left: 20px">
        <b-icon
          icon="moon"
          variant="warning"
          font-scale="1.5"
          v-show="mode === 'light'"
          @click="changeMode('dark')"
        ></b-icon>
        <b-icon
          icon="sun"
          variant="warning"
          font-scale="1.5"
          v-show="mode === 'dark'"
          @click="changeMode('light')"
        ></b-icon>
        Switch Mode
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
    };
  },
  methods: {
    changeMode(mode) {
      this.mode = mode;
      this.$parent.$emit("changeMode", mode);
      bus.$emit("changeMode", mode);
    },
  },
};
</script>
