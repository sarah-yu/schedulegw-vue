<template>
  <div id="app">
    <app-course-list></app-course-list>
    <app-week></app-week>
  </div>
</template>

<script>
import CourseList from './components/CourseList.vue'
import Week from './components/Week.vue'

export default {
  components: {
    appCourseList: CourseList,
    appWeek: Week
  }
}
</script>

<style lang="scss" scoped>
html {
  box-sizing: border-box;
  font-size: 62.5%; // 10px / 16px = 62.5% --> 1rem = 10px
}

#app {
  display: flex;
  margin: 30px;
}
</style>
