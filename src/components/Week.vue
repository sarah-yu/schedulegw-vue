<template lang="html">
  <div class="week">
    <h2 class="week__header">Week</h2>
    <p v-if="totalHours" class="week__total-hours">{{ totalHours }} Hours</p>
    <div class="week__days">
      <div v-for="(day, index) in days" class="week__day">
        <h3>{{ day }}</h3>
        <div class="week__courses">
          <!--  HOUR GRID LINES -->
          <div v-for="n in 14" class="week__hours">
            {{ index == 0 ? (n < 5 ? n + 7 + 'am' : n == 5 ? n + 7 + 'pm' : n - 5 + 'pm') : '' }}
          </div>
          <!--  COURSES BY DAY OF WEEK -->
          <div
            v-for="course in dayn_courses(index + 1)"
            @click="removeCourse(course)"
            :style="placeCourse(course, course[`day${index+1}_start`], course[`day${index+1}_end`])"
            class="week__course">
            {{ course.course_name }}: {{ course[`day${index+1}_start`] }} - {{ course[`day${index+1}_end`] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      days: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] // for generating and labeling columns for days of the week
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
  methods: {
    ...mapActions({
      removeFromSchedule: 'removeCourse'
    }),
    removeCourse(course) {
      this.removeFromSchedule(course)
    },
    dayn_courses(n) {
      // place course in correct day(s) of week
      let dayn_start = `day${n}_start`
      return this.newSchedule.filter(course => course[dayn_start] != null)
    },
    placeCourse(course, start, end) {
      // place course on schedule according to start and end time
      let hour
      if (start.length === 3) {
        hour = this.getHour(start.slice(0, 1))
      } else {
        hour = this.getHour(start.slice(0, 2))
      }

      let top = start.slice(-2) + 'px'
      let height = this.getDuration(start, end) + 'px'

      return {
        position: 'absolute',
        backgroundColor: course.color,
        padding: '0 30px',
        'grid-area': hour, // place course in correct row based on starting hour
        top: top, // add additional px to top based on starting minutes
        height: height // height of course div based on end time
      }
    },
    getHour(time) {
      const hours = {
        '8': 'eight',
        '9': 'nine',
        '10': 'ten',
        '11': 'eleven',
        '12': 'twelve',
        '13': 'one',
        '14': 'two',
        '15': 'three',
        '16': 'four',
        '17': 'five',
        '18': 'six',
        '19': 'seven',
        '20': 'eightpm',
        '21': 'ninepm'
      }

      return hours[time]
    },
    getDuration(start, end) {
      return (end - start) * 0.01 * 60 // if each hour is 60px
    }
  }
}
</script>

<style lang="scss" scoped>
.week {
  flex: 1;
  border: 1px solid black;

  &__header,
  &__total-hours {
    text-align: center;
  }

  &__days {
    display: flex;
    justify-content: space-around;
  }

  &__day {
    border: 1px dotted black;
    width: 14%;
    // height: 80vh;

    h3 {
      display: flex;
      justify-content: center;
    }
  }

  &__courses {
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
  }

  &__course {
    font-size: 12px;
    background-color: #eee;
    overflow: hidden;
    // padding: 10px 5px;
    margin: 0 .5rem;
    width: 35%; // ?????

    &:hover {
      cursor: pointer;
    }
  }

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
