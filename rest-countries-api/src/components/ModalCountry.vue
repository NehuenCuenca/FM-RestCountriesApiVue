<template>
  <div class="modal-container" @click="onCloseShadow">
    <div class="modal-country" v-if="country">
      <button @click="$emit('onCloseModal')" id="close-modal">Back</button>
      <div class="good-info">
        <img :src="country.flags.png" :alt="`${country.name.common} flag`" />
        <span
          >📛 <u>Name:</u> {{ country.name.common }} ('{{
            country.flag
          }}')</span
        >
        <span>📍 <u>Capital:</u> {{ showCapitalOrNone }}</span>
        <span>🌏 <u>Region/Subregion:</u> {{ showRegionAndSubRegion }}</span>
        <span>💲 <u>Currencies:</u> {{ showCurrencies }}</span>
        <span>👅 <u>Languages:</u> {{ showLanguages }}</span>
        <span id="linkGoogleMap"
          ><a :href="country.maps.googleMaps" target="_blank"
            >👀 Look in Google Maps 🌐</a
          ></span
        >
      </div>
    </div>
    <div class="modal-country" id="modal-error" v-else>
        <button @click="$emit('onCloseModal')" id="close-modal">Close</button>
        <h3>Error: {{msgError}}.</h3>
        I don't know that country yet 😶
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalCountry",
  props: {
    country: {
      type: Object,
      required: true,
    },
    msgError: {
      type: String,
    }
  },
  methods: {
    onCloseShadow(e) {
      if(e.target.classList.contains('modal-container')){
        this.$emit('onCloseModal')
      }
    },
  },
  computed: {
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
};
</script>

<style>
.modal-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-country {
  width: 60%;
  height: 85vh;
  padding: 2rem 2rem;
  border-radius: 4rem 1rem;
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
.modal-country#modal-error {
  height: 30vh;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.1rem;
}
#modal-error h3 {
  color: var(--DarkGray);
}

.good-info span {
  font-size: 1.5rem;
}

.good-info img {
  width: 60%;
  height: 10rem;
  align-self: center;
  margin-bottom: 3vh;
  border: 2px solid var(--accent-color);
  box-shadow: 5px 5px 10px var(--accent-color);
}

.good-info #linkGoogleMap {
  align-self: center;
  margin-top: 3vh;
}

.good-info a {
  color: cyan;
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
  text-shadow: 1px 1px 5px black;
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
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
}
button#close-modal:hover {
  transition: all 0.3s ease;
  background-color: red;
  color: white;
}
</style>
