<template lang="html">
  <div class="selected-courses">
    <h3 class="selected-courses__heading">Selected Courses</h3>
    <ul v-if="selectedCourses.length > 0" class="selected-courses__courses">
      <li
        v-for="course in selectedCourses"
        @click="removeSelectedCourse(course)"
        :style="hasConflict(course)"
        class="selected-courses__course">
          <div>&times;</div>
          <div class="selected-courses__options selected-courses__options--closed">
            <i v-if="closed(course)" class="fas fa-lock"></i></span>
          </div>
          <div>
            {{ course.gwid }}-{{ course.section }}
          </div>
          <div>
            {{ course.course_name }}
          </div>
          <div v-if="tba(course)" class="selected-courses__options selected-courses__options--tba">
            (TBA)
          </div>
          <div v-if="course.conflicts" class="selected-courses__options selected-courses__options--conflict">
            CONFLICT!
          </div>
          <div v-if="course.final_date" class="selected-courses__final">
            Finals: {{ course.final_date }} <span v-if="course.final_time">at {{ course.final_time }}</span>
          </div>
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
          color: '#ab9964'
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

    display: flex;
    align-items: center;

    & > * {
      margin-right: 1rem;
    }

    &:hover {
      cursor: pointer;
      color: var(--color-grey-dark-3);
    }
  }

  &__options {
    font-size: var(--font-xs);

    &--closed {
      width: 1.5vw;
      text-align: center;
    }

    &--conflict {
      background-color: var(  --color-secondary);
      color: #fff;
      letter-spacing: .1rem;
      padding: .1rem .4rem;
    }
  }

  &__final {
    margin-left: auto;
  }

  &__none {
    color: var(--color-grey-dark-2);
    font-size: var(--font-m);
    padding: 2rem 0;
  }
}
</style>
