<template>
  <header>
    <NavBar :currentTheme="currentTheme" @onSetCurrentTheme="setCurrentTheme" />
  </header>
  <main class="container">
    <section class="filters-section">
      <FilterByCountry @filterCountriesResult="handleFilter" />
      <FilterByRegion @changeRegion="applyFilter" />
    </section>

    <template v-if="!msgErrorAPI && allCountries.length>0">
      <GridCountriesList :countries="mapPagesCountries[actualPage] || []" />

      <NavPaginate 
        :pages="Object.keys(mapPagesCountries).length"
        :actualPage="actualPage"
        @onChangePage="changePage"
      />
    </template>
    <h4 class="title-error" v-else>{{ msgErrorAPI }}</h4>
  </main>
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
      allCountries: [],
      mapPagesCountries: [],
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
        this.allCountries = [...data];

        // this.mapPagesCountries = paginateCountries(data) || [];
        this.applyFilter(data);
      } catch (error) {
        // console.warn(error);
        this.msgErrorAPI = `${error.message}: Service unavailable. Try later :(`;
      }
    },
    handleFilter(country) {
      const filteredCountriesByInput = this.allCountries.filter(({ name }) =>
        name.common.toLowerCase().includes(country)
      );
      // console.log(mapPagesInputCountry);
      this.applyFilter(filteredCountriesByInput);
    },
    applyFilter(filters = []) {
      if (filters.length === 0) {
        this.changePage(null);
        this.mapPagesCountries = [];
        this.msgErrorAPI = "No countries matched :(";
        return;
      }

      this.msgErrorAPI = "";
      this.changePage(1);
      this.mapPagesCountries = paginateCountries(filters) || [];
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
  --display-font: 'Tahoma';
  --default-font: sans-serif, 'Arial';
}

:root.dark-theme {
  --background-color-primary: hsl(208, 23%, 22%);
  --background-color-secondary: hsl(207, 26%, 17%);
  --accent-color: hsl(200, 15%, 8%);
  --text-primary-color: white;
}

/* RESETS */
*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

p {
  overflow-wrap: break-word;
}

a { 
  color:inherit;
  text-decoration: none;
}

button{
  background-color: transparent;
  border: none;
  cursor: pointer;
}

ul,ol { 
  list-style-type: none;
  padding: 0
}

html {
  font-family: var(--default-font);
  width: 100%;
  scroll-behavior: smooth;
}

header {
  width: 100%;
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

/* Firefox (uncomment to work in Firefox, although other properties will not work!)  */
/** {
  scrollbar-width: thin;
  scrollbar-color: #007193 #DFE9EB;
}*/

/* Chrome, Edge and Safari */
*::-webkit-scrollbar {
  height: 10px;
  width: 10px;
}
*::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: #DFE9EB;
}

*::-webkit-scrollbar-track:hover {
  background-color: #B8C0C2;
}

*::-webkit-scrollbar-track:active {
  background-color: #B8C0C2;
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: dimgray;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: dimgray;
}

*::-webkit-scrollbar-thumb:active {
  background-color: slategrey;

}


#app {
  text-align: center;
  color: var(--text-primary-color);
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: var(--background-color-secondary);
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

.filters-section {
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: center;
  align-items: center;
}

.title-error {
  color: red;
  font-size: 2rem;
  letter-spacing: 1px;
  word-spacing: 5px;
  text-shadow: 2px 2px 10px black;
}

body:has(.modal-container) {
  overflow: hidden;
}

@media (width >= 768px) {
  .filters-section {
    justify-content: space-between;
  }
}
</style>
