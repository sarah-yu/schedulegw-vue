<template lang="html">
  <div class="course" @click="selectCourse" :class="{'course--selected': selected}">{{ course.gwid }}-{{ course.section }} {{ course.course_name }} <span v-if="course.prof_id"><a v-bind:href="`https://my.law.gwu.edu/Evaluations/page%20library/ByFaculty.aspx?Source=%2fEvaluations%2fdefault.aspx&IID=${course.prof_id}`" target="_blank">Reviews</a></span></div>
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
      console.log('SELECTED COURSE:')
      console.log(this.course)

      // check if course has already been added
      let courseExists = this.newSchedule.filter(
        course => course == this.course
      )

      if (courseExists.length === 0) {
        this.addCourse(this.course) // add course to newSchedule array
        this.assignColor(this.course) // assign random color to course
      }
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
