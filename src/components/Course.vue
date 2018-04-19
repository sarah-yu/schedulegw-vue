<template lang="html">
  <div class="course" @click="selectCourse" :class="{'course--selected': selected}">{{ course.gwid }}-{{ course.section }} {{ course.course_name }}</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['course'],
  computed: {
    ...mapGetters(['newSchedule']),
    selected() {
      return this.newSchedule.filter(eachCourse => eachCourse == this.course)
        .length > 0
        ? true
        : false
    }
  },
  methods: {
    ...mapActions(['addCourse', 'assignColor']),
    selectCourse() {
      console.log(this.course)

      // check if course has already been added
      let courseExists = this.newSchedule.filter(
        course => course == this.course
      )

      if (courseExists.length === 0) {
        this.addCourse(this.course) // add course to newSchedule array
        this.assignColor({
          // assign the course a random color
          course: this.course,
          color: this.getColor()
        })
      }
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
.course {
  padding: 10px 0;

  &:hover {
    background-color: yellow;
    cursor: pointer;
  }

  &--selected {
    background-color: #eee;
    font-style: italic;
  }
}


</style>
