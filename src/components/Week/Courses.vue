<template lang="html">
  <div class="courses">
    <!--  HOUR GRID LINES -->
    <div v-for="n in 14" class="courses__hours"></div>
    <!--  COURSES BY DAY OF WEEK -->
    <app-course
      v-for="course in dayn_courses(day + 1)"
      :course="course"
      :day="day"
      :key="course.id"></app-course>
  </div>
</template>

<script>
import Course from './Course.vue'
import { mapGetters } from 'vuex'

export default {
  props: ['day'],
  computed: {
    ...mapGetters(['newSchedule'])
  },
  methods: {
    dayn_courses(n) {
      // place course in correct day(s) of week
      let dayn_start = `day${n}_start`
      let courses = this.newSchedule.filter(
        course => course[dayn_start] != null
      )
      return courses
    }
  },
  components: {
    appCourse: Course
  }
}
</script>

<style lang="scss">
.courses {
  display: grid;
  grid-template-columns: 98%;
  grid-auto-rows: 5rem;
  grid-template-areas:
    "eight"
    "nine"
    "ten"
    "eleven"
    "twelve"
    "one"
    "two"
    "three"
    "four"
    "five"
    "six"
    "seven"
    "eightpm"
    "ninepm";

  position: relative;
  margin-top: 2rem;

  &__hours {
    border-bottom: 1px solid var(--color-grey-light-1);
    z-index: -1;

    &:first-of-type {
      border-top: 1px solid var(--color-grey-light-1);
    }
  }
}
</style>
