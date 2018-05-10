<template lang="html">
  <div class="scheduler">
    <app-filters></app-filters>
    <div class="scheduler__main">
      <app-course-list></app-course-list>
      <app-week></app-week>
    </div>
  </div>
</template>

<script>
import Filters from '../Filters/Filters.vue'
import CourseList from '../CourseList/CourseList.vue'
import Week from '../Week/Week.vue'

export default {
  components: {
    appFilters: Filters,
    appCourseList: CourseList,
    appWeek: Week
  }
}
</script>

<style lang="scss">
.scheduler {
  &__main {
    display: flex;

    @media only screen and (max-width: 800px) {
      flex-direction: column;
    }
  }
}
</style>
