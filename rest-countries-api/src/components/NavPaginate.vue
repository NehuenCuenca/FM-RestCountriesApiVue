<template>
  <nav id="paginate-countries">
    <button
      v-for="(page, index) in pages"
      :key="index"
      @click="onClickPage(page)"
      class="page"
      :class="(page == actualPage) ? 'active' : '' "
    >
      {{ page }}
    </button>
  </nav>
</template>

<script>
export default {
  name: "NavPaginate",
  props: {
    pages: {
      type: Number,
      required: true,
    },
    actualPage: {
      type: Number,
    }
  },
  methods: {
    onClickPage(page) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.$emit('onChangePage', Number(page))
    }
  }
};
</script>

<style scoped>
nav#paginate-countries {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  column-gap: 1rem;
}

.page {
  cursor: pointer;
  font-size: 2rem;
  height: auto;
  border: none;
  background: none;
  color: var(--primary-text-color);
}

.page:hover {
  transition: color 200ms ease;
  color: cadetblue;
}

.active {
  background-color: cadetblue;
  padding: 0.4rem;
  border-radius: 1rem;
}

.page.active:hover {
  color: inherit;
}
</style>
