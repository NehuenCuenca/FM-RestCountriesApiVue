<template>
  <input
    type="text"
    placeholder="Search for a country..."
    id="filter-by-country"
  />
</template>

<script>
export default {
  name: "FilterByCountrie",
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
  color: white;
  font-size: .9rem;
}
</style>
