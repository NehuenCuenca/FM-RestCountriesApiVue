<template>
  <form @submit.prevent="onInputCountry">
    <input
      type="text"
      placeholder="Search for a country..."
      id="filter-by-country"
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
input {
  width: 20rem;
  font-size: 1rem;
  padding: 0.5rem 2rem 0.5rem 0.5rem;
  border-radius: 5px;
  outline: none;
  border: none;
}

::placeholder {
  color: var(--text-primary-color);
  font-size: 0.9rem;
}
</style>
