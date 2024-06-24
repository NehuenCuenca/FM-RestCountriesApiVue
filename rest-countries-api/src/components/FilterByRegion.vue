<template>
  <form class="filter-by-region-form">
    <select class="filter-by-region-select" 
      name="filter-by-region" @change="onChangeRegion">
      <option value="" class="filter-by-region-select__option">Filter by Region</option>
      <option v-for="(region, index) in regions" :key="index" :value="region" class="filter-by-region-select__option">
        {{ region }}
      </option>
    </select>
  </form>
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
.filter-by-region-form{
  padding: .5rem 1rem;
  box-shadow: 2px 2px 5px var(--accent-color);
  position: relative;
  appearance: none;
  -webkit-appearance: none;
  border-radius: 0.25rem;
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);
  cursor: pointer;
}

.filter-by-region-select {
  color: var(--text-primary-color);
  background-color: var(--background-color-primary);
  font: normal normal clamp(1.2rem, 5vw, 1.4rem) var(--default-font);
  padding: .5rem 2rem .5rem .5rem;
  border-radius: 5px;
  outline: none;
  border: none;
}

.filter-by-region-select__option{
  color: var(--text-primary-color);
  font: normal normal clamp(1rem, 5vw, 1rem) var(--default-font);
  background-color: transparent;
}

</style>
