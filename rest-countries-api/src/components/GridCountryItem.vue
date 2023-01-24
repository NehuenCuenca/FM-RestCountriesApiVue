<template>
  <li class="grid-country-item">
    <img :src="country.flags.png" alt="country-flag" />
  </li>
</template>

<script>
export default {
  name: "GridCountryItem",
  props: {
    country: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
li.grid-country-item {
  font-size: 1.3rem;
  color: black;
  background-color: bisque;
  cursor: pointer;
  outline: 2px solid black;
}

.grid-country-item img {
  /* border: 2px solid black; */
  width: 100%;
  height: 10rem;
  object-fit: fill;
  object-position: center center;
}
</style>
