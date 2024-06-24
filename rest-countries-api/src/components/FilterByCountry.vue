<template>
  <form @submit.prevent="onInputCountry" class="filter-by-country-form">
    <input
      type="text"
      placeholder="🔍 Search for a country..."
      class="filter-by-country-form__input"
      v-model="inputCountry"
      @input="$emit('filterCountriesResult', inputCountry.toLowerCase())"
    />
  </form>

  <ModalCountry
    :country="country"
    :msgError="msgError"
    v-if="isModalOpen"
    @onCloseModal="toggleModal"
  />
</template>

<script>
import countriesApi from "../api/countriesApi";
import ModalCountry from "../components/ModalCountry.vue";

export default {
  name: "FilterByCountry",
  emits: ['filterCountriesResult'],
  data() {
    return {
      inputCountry: "",
      isModalOpen: false,
      country: null,
      msgError: null,
    };
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
      if (!this.isModalOpen) { //Si cierra el modal, borro el country
        this.country = null;
        this.msgError = null;
      }
    },
    async getCountryByName(country) {
      try {
        const {
          data: [countryResponse],
        } = await countriesApi.get(`/name/${country}`);
        this.country = countryResponse;
        this.toggleModal();
      } catch (error) {
        const {
          response: { data },
        } = error;
        console.error(data.message);
        this.country = null;
        this.msgError = data.message;
        this.toggleModal();
      }
    },
    onInputCountry() {
      this.getCountryByName(this.inputCountry);
    },
  },
  components: {
    ModalCountry,
  },
};
</script>

<style scoped>
/* .filter-by-country-form{} */

.filter-by-country-form__input {
  /* max-width: 80%; */
  font: normal normal clamp(1.2rem, 7vw, 1.5rem) var(--default-font);
  padding: 1rem 2rem;
  border-radius: 5px;
  outline: none;
  border: none;
  color: var(--text-primary-color);
  background-color: var(--background-color-primary);
  box-shadow: 2px 2px 5px var(--accent-color);
}

.filter-by-country-form__input::placeholder {
  font: normal normal clamp(1rem, 5vw, 1.4rem) var(--default-font);
}
</style>
