<template>
  <div class="filters">
    <label for="filter">Filter</label>
      <input
        type="text"
        id="filter"
        class="form-control"
        v-model="userData.filter"
        @input="search">
        <p>{{ userData.filter }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      userData: {
        filter: ''
      }
    }
  },
  methods: {
    ...mapActions(['filteredcourses']),
    search() {
      let filter = this.userData.filter.toString().toLowerCase()
      this.filteredcourses(filter)
    }
  }
}
</script>

<style lang="scss">
.filters {
  min-height: 15vh;
  border-bottom: 1px solid var(--color-grey-light-2);

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
