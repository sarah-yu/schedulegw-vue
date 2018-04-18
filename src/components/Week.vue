<template lang="html">
  <div class="week">
    <h2 class="week__header">Week</h2>
    <p v-if="totalHours" class="week__total-hours">{{ totalHours }} Hours</p>
    <div class="week__days">
      <div class="week__day week__day--1">
        <h3>SUN</h3>
        <div class="week__courses">
          <div v-for="course in day1_courses" @click="removeCourse(course)" class="week__course">{{ course.course_name }}: {{ course.day1_start }} - {{ course.day1_end }}</div>
        </div>
      </div>
      <div class="week__day week__day--2">
        <h3>MON</h3>
        <div class="week__courses">
          <div v-for="course in day2_courses" @click="removeCourse(course)" class="week__course">{{ course.course_name }}: {{ course.day2_start }} - {{ course.day2_end }}</div>
        </div>
      </div>
      <div class="week__day week__day--3">
        <h3>TUE</h3>
        <div class="week__courses">
          <div v-for="course in day3_courses" @click="removeCourse(course)" class="week__course">{{ course.course_name }}: {{ course.day3_start }} - {{ course.day3_end }}</div>
        </div>
      </div>
      <div class="week__day week__day--4">
        <h3>WED</h3>
        <div class="week__courses">
          <div v-for="course in day4_courses" @click="removeCourse(course)" class="week__course">{{ course.course_name }}: {{ course.day4_start }} - {{ course.day4_end }}</div>
        </div>
      </div>
      <div class="week__day week__day--5">
        <h3>THU</h3>
        <div class="week__courses">
          <div v-for="course in day5_courses" @click="removeCourse(course)" class="week__course">{{ course.course_name }}: {{ course.day5_start }} - {{ course.day5_end }}</div>
        </div>
      </div>
      <div class="week__day week__day--6">
        <h3>FRI</h3>
        <div v-for="course in day6_courses" @click="removeCourse(course)" class="week__course">{{ course.course_name }}: {{ course.day6_start }} - {{ course.day6_end }}</div>
      </div>
      <div class="week__day week__day--7">
        <h3>SAT</h3>
        <div class="week__courses">
          <div v-for="course in day7_courses" @click="removeCourse(course)" class="week__course">{{ course.course_name }}: {{ course.day7_start }} - {{ course.day7_end }}</div>
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
    },
    day1_courses() {
      // sun
      return this.newSchedule.filter(course => course.day1_start != null)
    },
    day2_courses() {
      // mon
      return this.newSchedule.filter(course => course.day2_start != null)
    },
    day3_courses() {
      // tue
      return this.newSchedule.filter(course => course.day3_start != null)
    },
    day4_courses() {
      // wed
      return this.newSchedule.filter(course => course.day4_start != null)
    },
    day5_courses() {
      // thu
      return this.newSchedule.filter(course => course.day5_start != null)
    },
    day6_courses() {
      // Fridays
      return this.newSchedule.filter(course => course.day6_start != null)
    },
    day7_courses() {
      // sat
      return this.newSchedule.filter(course => course.day7_start != null)
    }
  },
  methods: {
    ...mapActions({
      removeFromSchedule: 'removeCourse'
    }),
    removeCourse(course) {
      this.removeFromSchedule(course)
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
    height: 80vh;
    padding: 0 5px;

    h3 {
      display: flex;
      justify-content: center;
    }
  }

  &__courses {

  }

  &__course {
    font-size: 12px;
    background-color: #eee;
    padding: 10px 5px;
    margin: 5px 0;

    &:hover {
      cursor: pointer;
    }
  }
}

</style>
