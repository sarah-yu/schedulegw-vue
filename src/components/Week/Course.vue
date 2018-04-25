<template lang="html">
  <div
    @click="removeCourse"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
    :style="placeCourse(course, course[`day${day+1}_start`], course[`day${day+1}_end`])"
    class="course-block">
    <div v-if="!showFinalInfo">
      <span class="course-block__id">{{ course.gwid }}-{{ course.section }}</span>
      <span class="course-block__name">{{ course.course_name }}</span>
      <span class="course-block__time">{{ course[`day${day+1}_start`] }} - {{ course[`day${day+1}_end`] }}</span>
    </div>
    <div v-else>
      <span class="course-block__final-info">Finals: {{ finalInfo(course.final_date) }} at {{ finalInfo(course.final_time) }}</span>
    </div>
    <!-- <div class="course-block__remove"><i class="far fa-times-circle fa-lg"></i></div> -->
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

      let top = start.slice(-2) * (5 / 6) + 'px'
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
      // return (end - start) * 0.01 * 60 // if each hour is 60px
      return (end - start) * 0.01 * 50
    }
  }
}
</script>

<style lang="scss" scoped>
.course-block {
  font-size: var(--font-xs);
  overflow: scroll;
  padding: .4rem;
  position: absolute;
  // z-index: 2;
  width: 100%;

  span {
    display: block;
  }

  &__name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }

  &__remove {
    position: absolute;
    top: .2rem;
    right: .2rem;
    // width: 2rem;
    // height: 2rem;
    // border-radius: 50%;
    // background-color: #fff;
    // border: 1px solid var(--color-grey-dark-3);
    color: var(--color-grey-dark-1);
    z-index: 9999;
    // display: none;
  }

  &:hover {
    cursor: pointer;
  }

  // &:hover > &__remove {
  //   display: block;
  // }
}
</style>
