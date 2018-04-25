<template>
  <div class="container">
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
import { mapGetters, mapActions } from "vuex"

export default {
  data() {
    return {
      userData: {
        filter: ""
      }
    }
  },
  methods: {
    ...mapActions(["filteredcourses"]),
    search() {
      let filter = this.userData.filter.toString().toLowerCase()
      this.filteredcourses(filter)
    }
  }
}
</script>

<style>
</style>
