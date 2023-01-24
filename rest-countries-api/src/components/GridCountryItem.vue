<template>
  <li class="grid-country-item">
    <img
      :src="country.flags.png"
      :alt="`${country.name.common} flag`"
      @click="openModal"
    />
    <div class="basic-info">
      <h4 id="country-name">{{ country.name.common }}</h4>
      <span><b>Population</b>: {{ populationWithCommas }}</span>
      <span><b>Region</b>: {{ country.region }}</span>
      <span><b>Capital</b>: {{ showCapitalOrNone }}</span>
    </div>
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
  methods: {
    openModal() {
      console.log('openModal');
    }
  },
  computed: {
    populationWithCommas() {
      return this.country.population
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    showCapitalOrNone() {
      if (!this.country.capital) return "No specified";
      return this.country.capital[0];
    },
  },
};
</script>

<style scoped>
li.grid-country-item {
  font-size: 1.3rem;
  border-radius: 0.3rem;
}

.grid-country-item img {
  width: 100%;
  height: 8rem;
  border-radius: 0.3rem 0.3rem 0 0;
  object-fit: fill;
  object-position: center center;
}

#country-name {
  margin: 0 0 1.4rem 0;
  font-size: 1.1rem;
  text-align: start;
  font-weight: bold;
}

.grid-country-item .basic-info {
  padding: 1rem;
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
