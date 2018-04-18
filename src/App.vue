<template>
  <div id="app">
    <app-course-list></app-course-list>
  </div>
</template>

<script>
import CourseList from './components/CourseList.vue'

export default {
  components: {
    appCourseList: CourseList
  }
}
</script>

<style lang="scss" scoped>
  #app {
    display: flex;
    margin: 30px;
  }
</style>
