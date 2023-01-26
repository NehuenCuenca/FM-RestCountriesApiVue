<template>
  <NavBar :currentTheme="currentTheme" @onSetCurrentTheme="setCurrentTheme" />
  <div class="container">
    <div id="filters">
      <FilterByCountry />
      <FilterByRegion @changeRegion="applyFilter" />
    </div>

    <GridCountriesList :countries="countries" />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import FilterByCountry from "./components/FilterByCountry.vue";
import FilterByRegion from "./components/FilterByRegion.vue";
import GridCountriesList from "./components/GridCountriesList.vue";
import countriesApi from "@/api/countriesApi";

export default {
  name: "App",
  components: {
    NavBar,
    FilterByCountry,
    FilterByRegion,
    GridCountriesList,
  },
  data() {
    return {
      countries: [],
      currentTheme: "light-theme",
    };
  },
  created() {
    this.getAllCountries();
  },
  methods: {
    setCurrentTheme(theme) {
      console.log(theme);
      this.currentTheme = theme;
      document.documentElement.className = theme;
    },
    async getAllCountries() {
      const { data } = await countriesApi.get("/all");
      this.countries = data || [];
    },
    applyFilter(filters = []) {
      this.countries = filters;
    },
  },
  computed: {
    firstTenCountries() {
      return this.countries.slice(0, 10);
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
</style>
