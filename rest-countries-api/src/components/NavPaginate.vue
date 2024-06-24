<template>
<!-- https://s3-alpha.figma.com/hub/file/2723787398/e1a96bd6-f56d-4522-9efe-c612a7f5b075-cover.png -->
  <nav class="countries-pagination">
    <button type="button" @click="onClickPage(1)" class="direction-button">Initial</button>
    
    <button type="button" @click="onClickPage($props.actualPage-1)" class="direction-button">◀</button>
    <button type="button" class="page-button page-button_active">{{$props.actualPage}}</button>
    <button type="button" @click="onClickPage($props.actualPage+1)" class="direction-button">▶</button>
    
    <button type="button" @click="onClickPage($props.pages)" class="direction-button">Last ({{ $props.pages }})</button>
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

  emits: ['onChangePage'],

  methods: {
    onClickPage(page) {
      const outOfLimitPage = page <= 0 || page > this.$props.pages
      const onSamePage = page === this.$props.actualPage
      if(outOfLimitPage || onSamePage) return

      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.$emit('onChangePage', Number(page))
    }
  },

  computed: {
    haveMoreThanFourPages () { 
      return this.$props.pages > 4
    },
  },

  created() {
    console.log(this.$props);
  },

  // data() { },

};
</script>

<style scoped>
.countries-pagination{
  color: var(--text-primary-color);
  font: normal normal 400 clamp(1.2rem, 5vw, 1.6rem) var(--default-font);
  display: flex;
  gap: .5rem;
}
.direction-button,
.page-button,
.countries-pagination__filler-text{
  color: var(--text-primary-color);
  font: normal normal 400 clamp(1.2rem, 5vw, 1.5rem) var(--default-font);
}
.direction-button,
.page-button{
  padding: .2rem .5rem;
  border-radius: 10px;
  transition: background .3s ease;
}
.page-button_active, .page-button:hover, .direction-button:hover{
  background-color: var(--accent-color);
}
</style>