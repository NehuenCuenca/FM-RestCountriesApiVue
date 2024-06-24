<template>
  <div class="modal-container" @click="onCloseShadow">
    <div class="modal-body" v-if="country">
      <button @click="$emit('onCloseModal')" class="close-modal-button">Back</button>
      <div class="country-info">
        <img class="country-info__flag" :src="country.flags.png" :alt="`${country.name.common} flag`" />

        <ul class="country-info-list">
          <li class="country-info-list-item">
            <i class="country-info-list-item__emoji">📛</i>
            <span class="country-info-list-item__title"><u>Name:</u> {{ country.name.common }} ('{{ country.flag }}')</span>
          </li>
          <li class="country-info-list-item">
            <i class="country-info-list-item__emoji">📍</i>
            <span class="country-info-list-item__title"><u>Capital:</u> {{ showCapitalOrNone }}</span>
          </li>
          <li class="country-info-list-item">
            <i class="country-info-list-item__emoji">🌏</i>
            <span class="country-info-list-item__title"><u>Region/Subregion:</u> {{ showRegionAndSubRegion }}</span>
          </li>
          <li class="country-info-list-item">
            <i class="country-info-list-item__emoji">📐</i>
            <span class="country-info-list-item__title"><u>Area:</u> {{ showAreaOrNone }} km²</span>
          </li>
          <li class="country-info-list-item">
            <i class="country-info-list-item__emoji">💲</i>
            <span class="country-info-list-item__title"><u>Currencies:</u> {{ showCurrencies }}</span>
          </li>
          <li class="country-info-list-item">
            <i class="country-info-list-item__emoji">👅</i>
            <span class="country-info-list-item__title"><u>Languages:</u> {{ showLanguages }}</span>
          </li>
          <a class="link-to-google-maps" :href="country.maps.googleMaps" target="_blank"
            >👀 Look in Google Maps 🌐</a
          >
        </ul>
      </div>
    </div>

    <div class="modal-country modal-error" v-else>
      <button @click="$emit('onCloseModal')" class="close-modal">Close</button>
      <h3>Error: {{ msgError }}.</h3>
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
    },
  },
  methods: {
    onCloseShadow(e) {
      if (e.target.classList.contains("modal-container")) {
        this.$emit("onCloseModal");
      }
    },
  },
  computed: {
    showCapitalOrNone() {
      if (!this.country.capital) return "No specified";
      return this.country.capital[0];
    },
    showAreaOrNone() {
      if (!this.country.area) return "No specified";
      return this.country.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
}

.modal-body {
  background-color: var(--background-color-primary);
  width: 90%;
  height: 85vh;
  padding: 2rem 1.5rem;
  border-radius: 0.3rem;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.country-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  row-gap: 1vh;
}

.country-info__flag {
  min-height: 20vh;
  max-height: 30vh;
  width: 90%;
  align-self: center;
  margin-bottom: 4vh;
  border: 2px solid var(--accent-color);
  box-shadow: 5px 5px 10px var(--accent-color);
}


.country-info-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2rem;
}

.country-info-list-item {
  width: 100%;
  display: flex;
  align-items: flex-start;
  column-gap: .5rem;
  font: normal normal 400 clamp(1.5rem, 7vw, 1.8rem) var(--default-font);
}

.country-info-list-item__emoji {
  width: 3rem;
  font-style: normal;
  font-size: 1.6rem;
}

.country-info-list-item__title{
  text-align: start;
}


.link-to-google-maps {
  color: steelblue;
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
  transition: color .3s ease;
}
a:hover, a:visited {
  color: darkcyan;
}

.close-modal-button {
  position: sticky;
  top: 0%;
  left: 90%;
  margin-bottom: 1rem;
  font: normal normal 400 clamp(1.4rem, 5vw, 1.7rem) var(--default-font);
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  background-color: red;
  color: white;
}

@media (width >= 1280px){
  .modal-body {
    width: 60%;
    padding: 2rem;
  }

  .country-info__flag {
    width: 70%;
  }
}
</style>
