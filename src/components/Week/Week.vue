<template lang="html">
  <div class="week">
    <div class="week__days">
      <div class="week__hours">
        <div v-for="n in 14">
          {{ (n < 5 ? n + 7 + 'am' : n == 5 ? n + 7 + 'pm' : n - 5 + 'pm') }}
        </div>
      </div>
      <div
        v-for="(day, index) in days"
        class="week__day"
        v-if="!hideWeekend(index)"
        :style="width">
        <h3>{{ day }}</h3>
        <app-courses :day="index"></app-courses>
      </div>
    </div>

    <app-selected-courses></app-selected-courses>
  </div>
</template>

<script>
import Courses from './Courses.vue'
import SelectedCourses from './SelectedCourses.vue'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], // for generating and labeling columns for days of the week
      daysCount: 7
    }
  },
  computed: {
    ...mapGetters(['newSchedule']),
    totalHours() {
      return this.newSchedule.reduce((acc, curr) => {
        return acc + parseInt(curr.hours)
      }, 0)
    },
    width() {
      return {
        width: 100 / this.daysCount + '%'
      }
    }
  },
  methods: {
    hideWeekend(dayIndex) {
      if (dayIndex == 0 || dayIndex == 6) {
        let n = dayIndex + 1
        let day = `day${n}_start`

        let courses = this.newSchedule.filter(course => course[day] != null)

        if (courses.length < 1) {
          this.daysCount = 5
          return true
        } else {
          this.daysCount = 7
          return false
        }
      }
    }
  },
  components: {
    appCourses: Courses,
    appSelectedCourses: SelectedCourses
  }
}
</script>

<style lang="scss" scoped>
.week {
  flex: 2;
  min-height: 90vh;

  &__days {
    display: flex;
    justify-content: space-around;
    padding: 3rem;

  }

  &__day {
    h3 {
      display: flex;
      justify-content: center;
      color: var(--color-grey-dark-2);
      font-size: var(--font-s);
      font-weight: 400;
    }
  }

  &__hours {
    display: grid;
    grid-template-columns: 3rem;
    grid-auto-rows: 5rem;

    color: var(--color-grey-dark-2);
    font-size: var(--font-xs);
    margin-top: 3rem;
    margin-right: 1rem;
    position: relative;
  }
}
</style>
