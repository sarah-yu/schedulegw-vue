<template lang="html">
  <div class="schedules">
    all your schedules are here
    
    <ul>
      <li v-for="schedule in schedules">{{ schedule.name }}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getSchedules']),
    schedules() {
      return this.getSchedules
    }
  },
  created() {
    this.$store.dispatch('loadSchedules')
  }
}
</script>

<style lang="scss">
</style>
