<template lang="html">
  <div class="week">
    <!-- <p v-if="totalHours" class="week__total-hours">{{ totalHours }} Hours</p> -->
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
  </div>
</template>

<script>
import Courses from './Courses.vue'
import { mapGetters, mapActions } from 'vuex'

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
    appCourses: Courses
  }
}
</script>

<style lang="scss" scoped>
.week {
  flex: 2;
  height: 90vh;
  padding: 3rem;

  &__total-hours {
    text-align: center;
  }

  &__days {
    display: flex;
    justify-content: space-around;
  }

  &__day {
    h3 {
      display: flex;
      justify-content: center;
      color: var(--color-grey-dark-2);
      font-size: var(--font-s);
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
