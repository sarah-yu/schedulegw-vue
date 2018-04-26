<template>
  <div class="filters">
    <input v-model="keyword" type="text">
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
  computed: {
    ...mapGetters(['filter']),
    keyword: {
      get() {
        return this.filter
      },
      set(value) {
        let keyword = value.toString().toLowerCase()
        this.$store.dispatch('filterCourses', keyword)
      }
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
