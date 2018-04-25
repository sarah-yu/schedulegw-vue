<template>
  <div id="app">
    <app-filter></app-filter>
    <div class="main">
      <app-course-list></app-course-list>
      <app-week></app-week>
    </div>

  </div>
</template>

<script>
import Filter from './components/Filter/Filter.vue'
import CourseList from './components/CourseList/CourseList.vue'
import Week from './components/Week/Week.vue'

export default {
  components: {
    appFilter: Filter,
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

.main {
  display: flex;
  margin: 30px;
}
</style>
