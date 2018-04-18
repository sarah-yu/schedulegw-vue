<template>
  <div class="course-list">
    <h2 class="course-list__header">Course List</h2>
    <app-course v-for="course in courses" :course="course" :key="course.id"></app-course>
  </div>
</template>

<script>
import Course from './Course.vue'

export default {
  computed: {
    courses() {
      let courses = this.$store.getters.courses

      return this.$store.getters.courses
    }
  },
  created() {
    this.$store.dispatch('loadCourses')
  },
  components: {
    appCourse: Course
  }
}
</script>

<style lang="scss">
.course-list {
  height: 90vh;
  overflow-y: scroll;
  padding: 0 30px;
  border: 1px solid black;
  margin-right: 30px;
}
</style>
