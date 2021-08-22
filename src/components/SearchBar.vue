<template>
  <!--search bar-->
  <div class="row row-bar-search d-flex flex-column mb-3" id="search-bar">
    <form
      id="search"
      class="form-inline d-flex justify-content-center align-items-center"
      @submit.stop.prevent="search"
    >
      <div class="bg-blank" @click="myAutoComplete = false"></div>
      <label class="sr-only" for="search-input"></label>
      <input
        type="text"
        class="form-control mr-sm-2 mr-3"
        id="search-input"
        placeholder="search name ..."
        autocomplete="off"
        v-model="input"
        @focus="myAutoComplete = true"
      />

      <button
        type="submit"
        class="btn btn-info"
        style="z-index: 10; display: inline-block"
      >
        Search
      </button>
    </form>
    <!--  輸入搜尋關鍵字，並且如果有匹配項目自動完成清單才會顯示      -->
    <div
      v-show="inputMatched.length && myAutoComplete"
      style="z-index: 10; max-width: fit-content"
    >
      <ul
        style="list-style-type: none; white-space: nowrap"
        class="p-0 bg-light text-secondary"
      >
        <li v-for="(item, index) in inputMatched" :key="index">
          <a href="" @click.stop.prevent="onMatchedTitleClicked(item.title)">{{
            item.title
          }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  props: {
    moviesParent: {
      type: Array,
    },
  },
  data() {
    return {
      movies: this.moviesParent,
      myAutoComplete: false,
      isSearched: false,
      input: "",
      searchTerm: "",
      inputMatched: [],
    };
  },
  watch: {
    input() {
      //讓vue監聽使用者在搜尋欄改變關鍵字，或是this.input改變，則將顯示自動完成
      if (!this.input) {
        return (this.myAutoComplete = false);
      }
      this.myAutoComplete = true;
      this.searchAutoComplete();
    },
  },
  methods: {
    search() {
      this.myAutoComplete = false;
      this.searchTerm = this.input.trim().toLowerCase();
      this.isSearched = true;
      this.$parent.$emit("search", this.searchTerm);
    },
    searchAutoComplete() {
      //使用者在搜尋欄輸入關鍵字，會出現搜尋的自動完成
      const term = this.input.trim().toLowerCase();
      if (!term) return (this.myAutocomplete = false);
      //根據當前的狀態，是home還是favorite頁面，顯示對應的自動完成清單
      const matchedItems = this.moviesParent.filter((movie) =>
        movie.title.toLowerCase().startsWith(term)
      );
      if (matchedItems.length > 5) matchedItems.length = 5;
      this.inputMatched = matchedItems;
    },
    onMatchedTitleClicked(title) {
      //使用者在按下搜尋按鈕或enter後才會進行搜尋，並將搜尋結果顯示在畫面
      this.input = title;
      this.search();
    },
  },
};
</script>

<style>
* {
  z-index: 10;
}

.bg-blank {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -10;
}
input.form-control {
  display: inline-block;
  min-width: 200px;
  width: 20%;
  margin-right: 10px;
}
</style>