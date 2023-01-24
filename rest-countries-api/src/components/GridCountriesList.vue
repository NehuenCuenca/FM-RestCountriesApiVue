<template>
  <ul class="grid-countries-list">
    <GridCountryItem
      v-for="(country, index) in countries"
      :key="index"
      :country="country"
    />
  </ul>
</template>

<script>
import GridCountryItem from "./GridCountryItem.vue";

export default {
  name: "GridCountriesList",
  props: {
    countries: {
      type: Array,
      required: true,
    },
  },
  components: {
    GridCountryItem,
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
  grid-auto-rows: 17rem;
  gap: 20px;
}
</style>
