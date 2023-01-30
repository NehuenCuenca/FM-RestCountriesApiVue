<template>
  <select
    name="filter-by-region"
    id="filter-by-region"
    @change="onChangeRegion"
  >
    <option value="">Filter by region</option>
    <option v-for="(region, index) in regions" :key="index" :value="region">
      {{ region }}
    </option>
  </select>
</template>

<script>
import countriesApi from "@/api/countriesApi";
export default {
  name: "FilterByRegion",
  data() {
    return {
      regions: ["Africa", "Asia", "America", "Oceania", "Europe"]
    };
  },
  methods: {
    async getCountriesByRegion(region) {
      const { data } = await countriesApi.get(`/region/${region}`);
      return data
    },
    async getAllCountries() {
      try {
        const { data } = await countriesApi.get("/all");
        return data
      } catch (error) {
        console.warn(error);
        alert(`${error}`)
      }
    },
    async onChangeRegion() {
      const regionSelected = event.target.value 
      let countries = [];

      if( regionSelected.length === 0 ) {
        countries = await this.getAllCountries()
      } else {
        countries = await this.getCountriesByRegion( regionSelected )
      }

      this.$emit('changeRegion', countries)
    },
  }
};
</script>

<style>
select {
  font-size: .9rem;
  padding: .5rem 2rem .5rem .5rem;
  border-radius: 5px;
  outline: none;
  border: none;
}
</style>
