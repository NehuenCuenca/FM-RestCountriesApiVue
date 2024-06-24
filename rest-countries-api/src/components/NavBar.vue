<template>
  <nav class="navbar">
    <span class="navbar__title">Where in the world?</span>
    <button
    class="navbar__theme-toggler" 
      @click="$emit('onSetCurrentTheme', (currentTheme === 'light-theme') ? 'dark-theme' : 'light-theme')">
      {{ oppositeTheme }}
    </button>
  </nav>
</template>

<script>
export default {
  props: {
    currentTheme: {
      type: String,
      required: true,
    }
  },
  computed: {
    oppositeTheme() {
      return (this.currentTheme === 'light-theme') 
      ? '🌚 Dark mode' 
      : '🌞 Light mode'
    }
  }
}
</script>

<style>
.navbar {
  width: 100%;
  padding: 2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background-color-primary);
  box-shadow: 2px 2px 5px var(--accent-color);
}
.navbar__title {
  font-weight: bold;
  letter-spacing: 1px;
  user-select: none;
  font: normal normal 700 clamp(1.1rem, 5vw, 1.5rem) var(--display-font)
}
.navbar__theme-toggler{
  color: var(--text-primary-color);
  padding: 0;
  font: normal normal 400 clamp(1.1rem, 5vw, 1.5rem) var(--default-font);
  text-transform: capitalize;
}

@media (width >= 768px) {
  .navbar {
    padding: 2rem;
  }

  .navbar__title {
    font-size: clamp(1.5rem, 7vw, 2rem);
  }
  .navbar__theme-toggler{
    font-size: clamp(1.5rem, 7vw, 1.8rem);
  }
}
</style>