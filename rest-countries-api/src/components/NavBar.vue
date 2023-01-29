<template>
  <nav id="nav-bar">
    <span>Where in the world?</span>
    <button
    id="changeTheme" 
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
      ? '🌚 Dark theme' 
      : '🌞 Light theme'
    }
  }
}
</script>

<style>
nav {
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
}
nav span {
  font-weight: bold;
  letter-spacing: 1px;
  user-select: none;
}
button#changeTheme{
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: var(--text-primary-color);
  padding: 0;
}
nav > *  {
  font-size: 1.1rem;
}

@media (max-width: 425px) {  
  nav#nav-bar { 
    width: 100%;
  }
}
</style>