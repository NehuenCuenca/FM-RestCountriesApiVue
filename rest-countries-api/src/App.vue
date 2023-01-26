<template>
  <NavBar />
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
    };
  },
  created() {
    this.getAllCountries();
  },
  methods: {
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
  --DarkBlue: hsl(209, 23%, 22%);
  --VeryDarkBlue: hsl(207, 26%, 17%);
  --VeryDarkBlue2: hsl(200, 15%, 8%);
  --DarkGray: hsl(0, 0%, 52%);
  --VeryLightGray: hsl(0, 0%, 98%);
  --White: hsl(0, 0%, 100%);
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
  color: var(--White);
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: var(--VeryDarkBlue);
}

nav#nav-bar {
  background-color: var(--DarkBlue);
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
  background-color: var(--DarkBlue);
}
.modal-country {
  background-color: var(--DarkBlue);
  color: var(--White);
}

input#filter-by-country {
  color: var(--White);
  background-color: var(--DarkBlue);
}

select#filter-by-region {
  color: var(--White);
  background-color: var(--DarkBlue);
}
</style>
