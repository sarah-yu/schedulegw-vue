<template lang="html">
  <div class="schedules">
    <app-schedule
      v-for="schedule in schedules"
      :schedule="schedule"
      :key="schedule.id"
    >
    </app-schedule>
    <div
      class="schedules__no-schedules-found"
      v-if="noSchedulesFound">
      <p>You don't have any saved schedules.</p>
    </div>
  </div>
</template>

<script>
import Schedule from './Schedule.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getSchedules']),
    schedules() {
      return this.getSchedules.reverse()
    },
    noSchedulesFound() {
      if (this.getSchedules.length == 0) {
        return true
      }
    }
  },
  created() {
    this.$store.dispatch('loadSchedules')
  },
  components: {
    appSchedule: Schedule
  }
}
</script>

<style lang="scss">
.schedules {
  min-height: 100vh;
  background-color: var(--color-grey-light-1);
  padding: 2rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
</style>
