<template lang="html">
  <div
    @click="removeCourse"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
    :style="placeCourse(course, course[`day${day+1}_start`], course[`day${day+1}_end`])"
    class="course-block"
    :class="`course-block--day${day}`">
      <span
        class="course-block__name">{{ course.course_name }}</span>
        <span
          v-if="!showFinalInfo"
          class="course-block__id">{{ course[`day${day+1}_start`] }} - {{ course[`day${day+1}_end`] }}</span>
      <!-- <div v-if="showFinalInfo" > -->
        <!-- <span class="course-block__time">{{ course[`day${day+1}_start`] }} - {{ course[`day${day+1}_end`] }}</span> -->
        <span
          v-else
          class="course-block__final-info">Finals: {{ finalInfo(course.final_date) }} at {{ finalInfo(course.final_time) }}</span>
      <!-- </div> -->
    <div class="course-block__remove"><i class="fas fa-times"></i></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['course', 'day'],
  data() {
    return {
      showFinalInfo: false
    }
  },
  methods: {
    ...mapActions({
      removeFromSchedule: 'removeCourse'
    }),
    removeCourse() {
      this.removeFromSchedule(this.course)
    },
    mouseenter() {
      this.showFinalInfo = true
    },
    mouseleave() {
      this.showFinalInfo = false
    },
    finalInfo(info) {
      if (info) {
        return info
      } else {
        return 'TBA'
      }
    },
    placeCourse(course, start, end) {
      // place course on schedule according to start and end time
      let hour
      if (start.length === 3) {
        hour = this.getHour(start.slice(0, 1))
      } else {
        hour = this.getHour(start.slice(0, 2))
      }

      let top = start.slice(-2) * (100 / 60) * 0.01 * 50 + 'px'
      let height = this.getDuration(start, end) + 'px'

      return {
        background: course.conflicts
          ? 'repeating-linear-gradient(135deg, #777, #777 .15rem, #ab9964 0, #ab9964 .85rem)'
          : course.color,
        border: course.conflicts ? '1px solid #003b5b' : '',
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
      if (end - start < 60) {
        return (end - start) * (100 / 60) * 0.01 * 50
      } else {
        return (end - start) * 0.01 * 50
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.course-block {
  color: var(--color-grey-dark-1);
  font-size: var(--font-xs);
  padding: .4rem;
  position: absolute;
  overflow: scroll;
  width: 100%;
  z-index: 2;
  width: 100%;
  z-index: 2;

  span {
    display: block;
  }

  &__remove {
    color: var(--color-grey-dark-1);
    display: none;
    position: absolute;
    top: .3rem;
    right: .5rem;
    z-index: 9999;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.5);
    z-index: 1000;
  }

  &:hover > &__remove {
    display: block;
  }
}
</style>
