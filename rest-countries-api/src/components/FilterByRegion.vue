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
    async onChangeRegion(event) {
      const regionSelected = event.target.value 
      if( regionSelected.length === 0 ) return

      const countries = await this.getCountriesByRegion( regionSelected )
      console.log(countries);
    },
  },
};
</script>

<style></style>
