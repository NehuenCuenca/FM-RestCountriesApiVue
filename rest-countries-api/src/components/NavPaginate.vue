<template>
  <nav id="paginate-countries">
    <a
      v-for="(page, index) in pages"
      :key="index"
      @click="$emit('onChangePage', Number(page))"
      class="page"
      :class="(index+1 === actualPage) ? 'active' : '' "
    >
      {{ page }}
    </a>
  </nav>
</template>

<script>
export default {
  name: "NavPaginate",
  props: {
    pages: {
      type: Array,
      required: true,
    },
    actualPage: {
      type: Number,
    }
  },
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

a.page {
  cursor: pointer;
  font-size: 2.5rem;
  height: auto;
}

.active {
  background-color: cadetblue;
  padding: 0.4rem;
  border-radius: 1rem;
}
</style>
