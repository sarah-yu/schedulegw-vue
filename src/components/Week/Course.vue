<template lang="html">
  <div
    @click="removeCourse(course)"
    :style="placeCourse(course, course[`day${day+1}_start`], course[`day${day+1}_end`])"
    class="course-block">
    {{ course.id }} {{ course.course_name }}: {{ course[`day${day+1}_start`] }} - {{ course[`day${day+1}_end`] }}
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['course', 'day'],
  methods: {
    ...mapActions({
      removeFromSchedule: 'removeCourse'
    }),
    removeCourse(course) {
      this.removeFromSchedule(course)
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
        backgroundColor: course.conflicts ? 'red' : course.color,
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
.course-block {
  position: absolute;
  font-size: 12px;
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }
}
</style>
