<template>
  <li class="grid-country-item">
    <img
      :src="country.flags.png"
      :alt="`${country.name.common} flag`"
      @click="toggleModal"
    />
    <div class="basic-info">
      <h4 id="country-name">{{ country.name.common }}</h4>
      <span><b>Population</b>: {{ populationWithCommas }}</span>
      <span><b>Region</b>: {{ country.region }}</span>
      <span><b>Capital</b>: {{ showCapitalOrNone }}</span>
    </div>
  </li>

  <ModalCountry
    :country="country"
    v-if="isModalOpen"
    @onCloseModal="toggleModal"
  />
</template>

<script>
import ModalCountry from "./ModalCountry.vue";

export default {
  name: "GridCountriesItem",
  props: {
    country: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
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
    showRegionAndSubRegion() {
      return `${this.country.region || "No region"} ➡ ${
        this.country.subregion || "No subregion"
      } `;
    },
    showLanguages() {
      if (!this.country.languages) return "No specified";
      return Object.values(this.country.languages).join(", ") + ".";
    },
    showCurrencies() {
      if (!this.country.currencies) return "No specified.";
      const shortCurrencies = Object.keys(this.country.currencies);
      const mapCurrencies =
        shortCurrencies
          .map((shortC) => {
            return this.country.currencies[`${shortC}`].name;
          })
          .join(", ") + ".";
      return mapCurrencies;
    },
  },
  components: {
    ModalCountry,
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
  cursor: pointer;
}

#country-name {
  margin: 1rem 0 1.4rem 0;
  font-size: 1.1rem;
  text-align: start;
  font-weight: bold;
}

.grid-country-item .basic-info {
  padding: 0 1rem;
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: start;
}
</style>
