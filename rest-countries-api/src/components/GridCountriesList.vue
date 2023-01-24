<template>
  <ul class="grid-countries-list">
    <!-- ABSTRAER EL COUNTRY -->
    <li class="grid-country-item">Some countrie</li>
    <li class="grid-country-item">Some countrie</li>
    <li class="grid-country-item">Some countrie</li>
    <li class="grid-country-item">Some countrie</li>
    <li class="grid-country-item">Some countrie</li>
    <li class="grid-country-item">Some countrie</li>
    <li class="grid-country-item">Some countrie</li>
    <li class="grid-country-item">Some countrie</li>
    <li class="grid-country-item">Some countrie</li>
    <li class="grid-country-item">Some countrie</li>
  </ul>
</template>

<script>
export default {
    name: 'GridCountriesList'
};
</script>

<style>
ul.grid-countries-list {
  width: 80%;
  height: auto;
  margin: 0;
  padding: 1rem;
  list-style-type: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 3vh 1vw;
}

li.grid-country-item {
  font-size: 1.3rem;
  color: black;
  background-color: bisque;
}
</style>
