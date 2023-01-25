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

  <div class="modal-container" v-if="isModalOpen">
    <div class="modal-country">
      <button @click="toggleModal" id="close-modal">Close</button>
      <div class="good-info">
        <img :src="country.flags.png" :alt="`${country.name.common} flag`">
        <span>📛 <u>Name:</u> {{ country.name.common }} ('{{country.flag}}')</span>
        <span>📍 <u>Capital:</u> {{ showCapitalOrNone }}</span>
        <span>🌏 <u>Region/Subregion:</u> {{ showRegionAndSubRegion }}</span>
        <span>💲 <u>Currencies:</u> {{ showCurrencies }}</span>
        <span>👅 <u>Languages:</u> {{ showLanguages }}</span>
        <span id="linkGoogleMap"><a :href="country.maps.googleMaps" target="_blank">👀 Look in Google Maps 🌐</a></span>
      </div>
    </div>
  </div>
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
      return `${(this.country.region) || 'No region'} ➡ ${(this.country.subregion || 'No subregion')} `;
    },
    showLanguages() {
      if (!this.country.languages) return "No specified";
      return Object.values(this.country.languages).join(', ') + '.'; 
    },
    showCurrencies() {
      if (!this.country.currencies) return "No specified.";
      const shortCurrencies = Object.keys(this.country.currencies)
      const mapCurrencies = shortCurrencies.map( shortC => {
        return this.country.currencies[`${shortC}`].name
      }).join(', ') + '.' 
      return mapCurrencies
    }
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

.modal-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0,0,0, 0.5);
}

.modal-country {
  width: 60%;
  height: 85vh;
  padding: 2rem 2rem;
  border-radius: 1rem 4rem;
  overflow-y: auto;
  overscroll-behavior: contain;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.modal-country .good-info {
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  row-gap: 1vh;
}

.good-info span {
  font-size: 1.5rem;
}

.good-info img {
  width: 60%;
  height: 10rem;
  align-self: center;
  margin-bottom: 3vh;
  border: 1px solid white;
}


.good-info #linkGoogleMap {
  align-self: center;
  margin-top: 3vh;
}

.good-info a {
  color: cyan;
  font-size: 1.5rem;
  text-decoration: none;
}
a:hover {
  color: darkcyan;
  transition: color 300ms ease;
}
a:visited {
  color: darkcyan;
}

button#close-modal {
  position: sticky;
  top: 0%;
  left: 93%;
  font-size: 1.3rem;
  padding: .5rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
}
button#close-modal:hover {
  transition: all 0.3s ease;
  background-color: red;
  color: white;
}
</style>
