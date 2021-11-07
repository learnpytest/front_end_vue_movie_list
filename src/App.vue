<template>
  <div
    id="app"
    :theme="mode"
  >
    <Navbar />
    <main
      role="main"
      class="mt-5"
    >
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
  data() {
    return {
      mode: "light",
    };
  },
  mounted() {
    this.$on("changeMode", this.switch);
  },
  methods: {
    switch(mode) {
      this.mode = mode;
    },
  },
};
</script>
<style>
[theme="light"] {
  --bg-color: #f1fffa;
  --nav-box: #c2948a;
  --text-color: #4c5454;
  --btn-visibility: #ff715b;
  --styled-card-inside: #ddeae6;
  --styled-card-outline: #c8d5d1;
}

[theme="dark"] {
  --bg-color: #253f4e;
  --nav-box: #215373;
  --text-color: #fcd0a1;
  --btn-visibility: #253f4e;
  --styled-card-inside: #235789;
  --styled-card-outline: lightcyan;
}

#app {
  background-color: var(--bg-color);
}

.navbar {
  background-color: var(--nav-box);
  color: var(--text-color);
}
.navbar a {
  color: var(--text-color);
  margin-left: 10px;
  border-radius: 8px;
  transform: scale(1);
}
.navbar a:hover {
  cursor: pointer;
  color: var(--text-color);
  transform: scale(1.1);
  transition: transform 0.2s ease-out;
}
.router-link-exact-active {
  background-color: var(--btn-visibility);
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.5);
  font-weight: 900;
}

strong.largersize { 
  font-size: 1.5em; 
  }

div.card {
  border: 1px solid var(--styled-card-outline);
  background-color: var(--styled-card-inside);
  color: var(--text-color);
}
.b-icon {
  cursor: pointer;
}
</style>

