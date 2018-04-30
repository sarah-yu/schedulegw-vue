<template lang="html">
  <div class="selected-courses">
    <h3 class="selected-courses__heading">Selected Courses</h3>
    <ul v-if="selectedCourses.length > 0" class="selected-courses__courses">
      <li
        v-for="course in selectedCourses"
        @click="removeSelectedCourse(course)"
        :style="hasConflict(course)"
        class="selected-courses__course">
          &times; &nbsp; {{ course.gwid }}-{{ course.section }} &nbsp; {{ course.course_name }} <span v-if="closed(course)"><i class="fas fa-lock"></i></span> <span v-if="tba(course)">(TBA)</span>
      </li>
    </ul>
    <p v-else class="selected-courses__none">You have no courses selected.</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['newSchedule']),
    selectedCourses() {
      return this.newSchedule
    }
  },
  methods: {
    ...mapActions(['removeCourse']),
    removeSelectedCourse(course) {
      this.removeCourse(course)
    },
    hasConflict(course) {
      if (course.conflicts) {
        return {
          color: 'red'
        }
      }
    },
    closed(course) {
      if (course.closed) {
        return true
      }
    },
    tba(course) {
      if (course.days == 'TBA') {
        return true
      }
    },
    finalDate(course) {
      if (course.final_date) {
        return true
      }
    },
    finalTime(course) {
      if (course.final_time) {
        return true
      }
    }
  }
}
</script>

<style lang="scss">
.selected-courses {
  border-top: 1px solid var(--color-grey-light-2);
  // border-bottom: 1px solid var(--color-grey-light-2);
  height: 20vh;
  padding: 3rem 4rem;

  &__heading {
    color: var(--color-secondary);
    font-size: var(--font-s);
    text-transform: uppercase;
    letter-spacing: .08rem;
  }

  &__courses {
    list-style: none;

    width: 100%;
    height: 10rem;
    overflow-x: scroll;
  }

  &__course {
    color: var(--color-grey-dark-2);
    font-size: var(--font-m);
    margin: 1rem 0;
    transition: color .2s;

    &:hover {
      cursor: pointer;
      color: var(--color-grey-dark-3);
    }
  }

  &__none {
    color: var(--color-grey-dark-2);
    font-size: var(--font-m);
    padding: 2rem 0;
  }
}
</style>
