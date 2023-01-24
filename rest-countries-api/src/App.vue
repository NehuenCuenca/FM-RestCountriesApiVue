<template>
  <NavBar />
  <div class="container">
    <div id="filters">
      <FilterByCountry />
      <FilterByRegion @changeRegion="applyFilter"/>
    </div>

    <GridCountriesList :countries="firstTenCountries"/>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import FilterByCountry from "./components/FilterByCountry.vue";
import FilterByRegion from "./components/FilterByRegion.vue";
import GridCountriesList from "./components/GridCountriesList.vue";
import countriesApi from '@/api/countriesApi'

export default {
  name: "App",
  components: {
    NavBar,
    FilterByCountry,
    FilterByRegion,
    GridCountriesList,
  },
  data(){
    return {
      countries: [],
    }
  },
  created() {
    this.getAllCountries()
  },
  methods: {
    async getAllCountries() {
      const { data } = await countriesApi.get('/all')
      this.countries = data || []
    },
    applyFilter( filters = [] ){
      this.countries = filters
    }
  },
  computed: {
    firstTenCountries() {
      return this.countries.slice(0,10) 
    }
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

html {
  box-sizing: border-box;
  font-family: sans-serif;
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
  color: #2c3e50;
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: #486684;
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
</style>
