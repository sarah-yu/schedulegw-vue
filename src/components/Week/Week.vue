<template lang="html">
  <div class="week">
    <!-- <p v-if="totalHours" class="week__total-hours">{{ totalHours }} Hours</p> -->
    <div class="week__days">
      <div v-for="(day, index) in days" class="week__day">
        <h3>{{ day }}</h3>
        <app-courses :day="index"></app-courses>
      </div>
    </div>
  </div>
</template>

<script>
import Courses from './Courses.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] // for generating and labeling columns for days of the week
    }
  },
  computed: {
    ...mapGetters(['newSchedule']),
    totalHours() {
      return this.newSchedule.reduce((acc, curr) => {
        return acc + parseInt(curr.hours)
      }, 0)
    }
  },
  components: {
    appCourses: Courses
  }
}
</script>

<style lang="scss" scoped>
.week {
  flex: 2;
  height: 90vh;
  padding: 3rem;

  &__header,
  &__total-hours {
    text-align: center;
  }

  &__days {
    display: flex;
    justify-content: space-around;
  }

  &__day {
    width: 14%;

    h3 {
      display: flex;
      justify-content: center;
      color: var(--color-grey-dark-2);
      font-size: var(--font-s);
    }
  }
}
</style>
