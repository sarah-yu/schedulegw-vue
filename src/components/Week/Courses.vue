<template lang="html">
  <div class="courses">
    <!--  HOUR GRID LINES -->
    <div v-for="n in 14" class="courses__hours">
      {{ day == 0 ? (n < 5 ? n + 7 + 'am' : n == 5 ? n + 7 + 'pm' : n - 5 + 'pm') : '' }}
    </div>
    <!--  COURSES BY DAY OF WEEK -->
    <app-course v-for="course in dayn_courses(day + 1)" :course="course" :day="day" :key="course.id"></app-course>
  </div>
</template>

<script>
import Course from './Course.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['day'],
  computed: {
    ...mapGetters(['newSchedule'])
  },
  methods: {
    ...mapActions({
      addConflict: 'addConflict'
    }),
    dayn_courses(n) {
      // place course in correct day(s) of week
      let dayn_start = `day${n}_start`
      let courses = this.newSchedule.filter(
        course => course[dayn_start] != null
      )

      // check for conflicts
      this.checkConflicts(courses, n)

      return courses
    },
    checkConflicts(courses, n) {
      for (let i = 0; i < courses.length; i++) {
        for (let j = 0; j < courses.length; j++) {
          let start1 = courses[i][`day${n}_start`]
          let start2 = courses[j][`day${n}_start`]
          let end1 = courses[i][`day${n}_end`]
          let end2 = courses[j][`day${n}_end`]

          if (courses[i] != courses[j]) {
            if (
              start1 == start2 ||
              end1 == end2 ||
              (start1 < start2 && end1 > end2) ||
              (start2 < start1 && end2 > end1)
            ) {
              console.log('CONFLICT!')
              this.addConflict({
                course1: courses[i],
                course2: courses[j]
              })
            } else {
              console.log('OKAY!')
            }
          }
        }
      }
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
  grid-template-columns: 100%;
  grid-auto-rows: 60px;
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

  &__hours {
    font-size: .8rem;
    text-transform: uppercase;

    &:first-of-type {
      border-top: 1px dashed black;
    }

    &:not(:last-of-type) {
      border-bottom: 1px dashed black;
    }
  }
}
</style>
