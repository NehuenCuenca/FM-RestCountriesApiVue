<template>
  <li class="grid-country-item">
    <img
      :src="country.flags.png"
      :alt="`${country.name.common} flag`"
      @click="toggleModal"
      class="grid-country-item__flag-image"
    />
    <div class="country-info">
      <h4 class="country-info__name">{{ country.name.common }}</h4>
      <span><b>Population:</b> {{ populationWithCommas }}</span>
      <span><b>Region:</b> {{ country.region }}</span>
      <span><b>Capital:</b> {{ showCapitalOrNone }}</span>
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

.grid-country-item {
  background-color: var(--background-color-primary);
  border-radius: 0.3rem;
  box-shadow: 1px 1px 5px rgba(0,0,0, 0.1);
}

.grid-country-item__flag-image {
  width: 100%;
  height: 9rem;
  border-radius: 0.3rem 0.3rem 0 0;
  object-fit: fill;
  object-position: center center;
  cursor: pointer;
}

.country-info {
  padding: .5rem 1rem 2rem 1rem;
  font: normal normal 400 clamp(1.1rem, 5vw, 1.2rem) var(--default-font);
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  text-align: start;
  gap: 5px;
}

.country-info__name {
  margin: 1rem 0;
  font: normal normal 600 clamp(1.5rem, 5vw, 1.6rem) var(--display-font);
  text-align: start;
  word-break: no-break;
}

</style>
