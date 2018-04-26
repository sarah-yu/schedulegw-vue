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
      let conflict1 = null
      let conflict2 = null

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
              ((start1 < start2 && end1 > start2) ||
                (start1 < end2 && end1 > end2)) ||
              ((start2 < start1 && end2 > start1) ||
                (start2 < end1 && end2 > end1))
            ) {
              console.log('CONFLICT!')
              console.log(
                `1: ${
                  courses[i].course_name
                } on day ${n} from ${start1} to ${end1}`
              )
              console.log(
                `2: ${
                  courses[j].course_name
                } on day ${n} from ${start2} to ${end2}`
              )

              conflict1 = courses[i]
              conflict2 = courses[j]

              // this.addConflict({
              //   course1: courses[i],
              //   course2: courses[j]
              // })
            }
          }
        }
      }
      if (conflict1 && conflict2) {
        this.addConflict({
          course1: conflict1,
          course2: conflict2
        })
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
    // color: var(--color-grey-dark-2);
    // font-size: var(--font-xs);
    border-bottom: 1px solid var(--color-grey-light-1);
    z-index: -1;

    &:first-of-type {
      border-top: 1px solid var(--color-grey-light-1);
    }
  }
}
</style>
