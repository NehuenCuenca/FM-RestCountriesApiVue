<template>
  <NavBar :currentTheme="currentTheme" @onSetCurrentTheme="setCurrentTheme" />
  <div class="container">
    <div id="filters">
      <FilterByCountry />
      <FilterByRegion @changeRegion="applyFilter" />
    </div>

    <GridCountriesList
      :countries="countries[actualPage] || []"
      v-if="!msgErrorAPI"
    />
    <h4 class="title-error" v-else>{{ msgErrorAPI }}</h4>

    <NavPaginate
      :pages="Object.keys(countries)"
      :actualPage="actualPage"
      @onChangePage="changePage"
    />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import NavPaginate from "./components/NavPaginate.vue";
import FilterByCountry from "./components/FilterByCountry.vue";
import FilterByRegion from "./components/FilterByRegion.vue";
import GridCountriesList from "./components/GridCountriesList.vue";
import countriesApi from "@/api/countriesApi";
import paginateCountries from "./helpers/paginate";

export default {
  name: "App",
  components: {
    NavBar,
    NavPaginate,
    FilterByCountry,
    FilterByRegion,
    GridCountriesList,
  },
  data() {
    return {
      countries: [],
      currentTheme: "dark-theme",
      msgErrorAPI: "",
      actualPage: 1,
    };
  },
  created() {
    this.getAllCountries();
    this.setCurrentTheme(this.currentTheme);
  },
  methods: {
    changePage(page) {
      if (page === this.actualPage) return;

      this.actualPage = page;
    },

    setCurrentTheme(theme) {
      this.currentTheme = theme;
      document.documentElement.className = theme;
    },

    async getAllCountries() {
      try {
        const { data } = await countriesApi.get("/all");
        this.msgErrorAPI = "";

        this.countries = paginateCountries(data) || [];
      } catch (error) {
        // console.warn(error);
        this.msgErrorAPI = `${error.message}: Service unavailable. Try later :(`;
      }
    },

    applyFilter(filters = []) {
      this.changePage(1);
      this.countries = paginateCountries(filters) || [];
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,700&display=swap");

:root {
  --background-color-primary: hsl(0, 0%, 100%);
  --background-color-secondary: hsl(0, 0%, 98%);
  --accent-color: hsl(0, 0%, 52%);
  --text-primary-color: black;
}

:root.dark-theme {
  --background-color-primary: hsl(208, 23%, 22%);
  --background-color-secondary: hsl(207, 26%, 17%);
  --accent-color: hsl(200, 15%, 8%);
  --text-primary-color: white;
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

html {
  box-sizing: border-box;
  font-family: "JetBrains Mono", monospace;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-primary-color);
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: var(--background-color-secondary);
}

nav#nav-bar {
  background-color: var(--background-color-primary);
  box-shadow: 2px 2px 5px var(--accent-color);
}

.container {
  width: 100%;
  height: auto;
  min-height: 40rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  row-gap: 8vh;
  padding: 2rem 0;
}

#filters {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-error {
  color: red;
  font-size: 2rem;
  letter-spacing: 1px;
  word-spacing: 5px;
  text-shadow: 2px 2px 10px black;
}

.grid-country-item {
  background-color: var(--background-color-primary);
  box-shadow: 1px 1px 11px var(--accent-color);
}
.modal-country {
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);
}

input#filter-by-country {
  color: var(--text-primary-color);
  background-color: var(--background-color-primary);
  box-shadow: 1px 1px 10px var(--accent-color);
}

select#filter-by-region {
  color: var(--text-primary-color);
  background-color: var(--background-color-primary);
  box-shadow: 1px 1px 10px var(--accent-color);
}

@media (max-width: 425px) {
  #filters {
    width: 80%;
    min-width: 20rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    row-gap: 5vh;
  }
}
</style>
