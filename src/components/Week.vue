<template lang="html">
  <div class="week">
    <h2 class="week__header">Week</h2>
    <p v-if="totalHours" class="week__total-hours">{{ totalHours }} Hours</p>
    <div class="week__days">
      <div class="week__day week__day--1">
        <h3>SUN</h3>
        <div class="week__courses">
          <div v-for="course in dayn_courses(1)" @click="removeCourse(course)" class="week__course" :style="placeCourse(course.day1_start, course.day1_end)">{{ course.course_name }}: {{ course.day1_start }} - {{ course.day1_end }}</div>
        </div>
      </div>
      <div class="week__day week__day--2">
        <h3>MON</h3>
        <div class="week__courses">
          <div v-for="course in dayn_courses(2)" @click="removeCourse(course)" class="week__course" :style="placeCourse(course.day2_start, course.day2_end)">{{ course.course_name }}: {{ course.day2_start }} - {{ course.day2_end }}</div>
        </div>
      </div>
      <div class="week__day week__day--3">
        <h3>TUE</h3>
        <div class="week__courses">
          <div v-for="course in dayn_courses(3)" @click="removeCourse(course)" class="week__course" :style="placeCourse(course.day3_start, course.day3_end)">{{ course.course_name }}: {{ course.day3_start }} - {{ course.day3_end }}</div>
        </div>
      </div>
      <div class="week__day week__day--4">
        <h3>WED</h3>
        <div class="week__courses">
          <div v-for="course in dayn_courses(4)" @click="removeCourse(course)" class="week__course" :style="placeCourse(course.day4_start, course.day4_end)">{{ course.course_name }}: {{ course.day4_start }} - {{ course.day4_end }}</div>
        </div>
      </div>
      <div class="week__day week__day--5">
        <h3>THU</h3>
        <div class="week__courses">
          <div v-for="course in dayn_courses(5)" @click="removeCourse(course)" class="week__course" :style="placeCourse(course.day5_start, course.day5_end)">{{ course.course_name }}: {{ course.day5_start }} - {{ course.day5_end }}</div>
        </div>
      </div>
      <div class="week__day week__day--6">
        <h3>FRI</h3>
        <div v-for="course in dayn_courses(6)" @click="removeCourse(course)" class="week__course" :style="placeCourse(course.day6_start, course.day6_end)">{{ course.course_name }}: {{ course.day6_start }} - {{ course.day6_end }}</div>
      </div>
      <div class="week__day week__day--7">
        <h3>SAT</h3>
        <div class="week__courses">
          <div v-for="course in dayn_courses(7)" @click="removeCourse(course)" class="week__course" :style="placeCourse(course.day7_start, course.day7_end)">{{ course.course_name }}: {{ course.day7_start }} - {{ course.day7_end }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
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
      let dayn_start = `day${n}_start`
      return this.newSchedule.filter(course => course[dayn_start] != null)
    },
    placeCourse(start, end) {
      // place course on schedule according to start and end time
      let hour
      if (start.length === 3) {
        hour = this.getHour(start.slice(0, 1))
      } else {
        hour = this.getHour(start.slice(0, 2))
      }

      let top = start.slice(-2) + 'px'
      let height = this.getDuration(start, end) + 'px'
      let backgroundColor = this.getColor() // THIS IS NOT WORKING CORRECTLY

      return {
        position: 'absolute',
        backgroundColor: backgroundColor,
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
    },
    getColor() {
      const colors = [
        '#F7AA97',
        '#ED9282',
        '#DE7E73',
        '#CFAA9E',
        '#77AAAD',
        '#6E7783',
        '#D8E6E7',
        '#9DC3C1'
      ]

      let randomColor = Math.floor(Math.random() * colors.length)
      return colors[randomColor]
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
}
</style>
