<template>
  <ul class="grid-countries-list">
    <GridCountriesItem
      v-for="(country, index) in countries"
      :key="index"
      :country="country"
    />
  </ul>
</template>

<script>
import GridCountriesItem from "./GridCountriesItem.vue";

export default {
  name: "GridCountriesList",
  props: {
    countries: {
      type: Array,
      required: true,
    },
  },
  components: {
    GridCountriesItem,
  },
};
</script>

<style scoped>
ul.grid-countries-list {
  width: 95%;
  height: auto;
  margin: 0;
  padding: 1rem;
  list-style-type: none;
  display: grid;
  align-content: center;
  justify-content: center;
  grid-template-columns: repeat(4, 15rem);
  grid-auto-rows: 18rem;
  gap: 20px;
}
</style>
