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
import Header from './components/Header.vue'
import Filters from './components/Filters/Filters.vue'
import CourseList from './components/CourseList/CourseList.vue'
import Week from './components/Week/Week.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    appHeader: Header,
    appFilters: Filters,
    appCourseList: CourseList,
    appWeek: Week,
    appFooter: Footer
  }
}
</script>

<style lang="scss">
.main {
  display: flex;
  min-height: 100vh;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
}
</style>
