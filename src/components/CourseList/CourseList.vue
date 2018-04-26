<template>
  <div class="course-list">
    <h2 class="course-list__header">Course List</h2>
    <div class="course-list__container">
      <app-course
        v-for="course in courses"
        :course="course"
        :key="course.id"></app-course>
        <div
          class="course-list__no-courses-found"
          v-if="noCoursesFound">
          <p>No courses match your search criteria.</p>
        </div>
    </div>
  </div>
</template>

<script>
import Course from './Course.vue'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getCourses: 'courses',
      fCourses: 'fCourses',
      filter: 'filter'
    }),
    courses() {
      if (this.filter) {
        return this.fCourses
      } else {
        return this.getCourses
      }
    },
    noCoursesFound() {
      if (this.filter && this.fCourses.length == 0) {
        return true
      }
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
  flex: 1;
  background-color: var(--color-grey-light-1);

  &__header {
    color: var(--color-primary);
    font-size: var(--font-s);
    text-align: center;
    padding: 2rem 0 1rem 0;
  }

  &__container {
    height: 90vh;
    overflow-y: scroll;

    @media only screen and (max-width: 800px) {
      height: 20vh;
    }
  }

  &__no-courses-found {
    color: var(--color-grey-dark-2);
    font-size: var(--font-m);
    text-align: center;
    margin-top: 2rem;
  }
}
</style>
