<template>
  <ul class="countries-list">
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
.countries-list {
  width: 100%;
  padding: 0 2rem;
  list-style-type: none;
  display: grid;
  align-content: center;
  justify-content: space-between;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(200px, 250px));
  gap: 4rem;
}

@media (width >= 1024px) {
  .countries-list{
    justify-content: space-between;
  }
}

</style>
