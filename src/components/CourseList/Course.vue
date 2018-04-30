<template lang="html">
  <div class="course"
    @click="selectCourse"
    :class="{'course--selected': selected, 'course--greyed-out': closed}">
    <div class="course__closed">
      <span v-if="closed"><i class="fas fa-lock"></i></span>
    </div>
    <div class="course__name">
      {{ course.gwid }}-{{ course.section }} {{ course.course_name }}
    </div>
    <div class="course__tba">
      <span v-if="tba" class="course__tba">(TBA)</span>
    </div>
    <div class="course__reviews">
      <a v-if="course.prof_id" v-bind:href="`https://my.law.gwu.edu/Evaluations/page%20library/ByFaculty.aspx?Source=%2fEvaluations%2fdefault.aspx&IID=${course.prof_id}`" target="_blank">Reviews</a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['course'],
  computed: {
    ...mapGetters(['newSchedule']),
    selected() {
      return this.newSchedule.filter(
        eachCourse => eachCourse.id == this.course.id
      ).length > 0
        ? true
        : false
    },
    closed() {
      if (this.course.closed) {
        return true
      }
    },
    tba() {
      if (this.course.days == 'TBA') {
        return true
      }
    }
  },
  methods: {
    ...mapActions(['addCourse', 'removeCourse']),
    selectCourse() {
      // check if course has already been added
      let courseExists = this.newSchedule.filter(
        course => course.id == this.course.id
      )

      if (courseExists.length === 0) {
        this.addCourse(this.course)
      } else {
        // click again to remove a course that has already been added
        this.removeCourse(this.course)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.course {
  display: grid;
  grid-template-columns: 1rem [closed-start] 2rem [closed-end name-start] minmax(65%, 1fr) [name-end tba-start] 1fr [tba-end reviews-start] 1fr [reviews-end] 1rem;
  align-items: center;
  color: var(--color-primary);
  font-size: var(--font-m);
  padding: 10px 0;

  & > * {
    padding: 0 .5rem;
  }

  &:hover {
    background-color: var(--color-grey-light-3);
    cursor: pointer;
  }

  &--selected {
    background-color: var(--color-grey-light-3);
  }

  &--greyed-out {
    color: var(--color-grey-dark-2);
  }

  &__closed {
    grid-column: closed-start / closed-end;
    font-size: .9rem;
  }

  &__name {
    grid-column: name-start / name-end;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__tba {
    grid-column: tba-start / tba-end;
    font-size: var(--font-xs);
  }

  &__reviews {
    grid-column: reviews-start / reviews-end;
    display: inline-block;
    font-size: var(--font-xs);
    transition: all .2s;

    a {
      color: var(--color-primary-light);
      text-decoration: none;

      &:hover {
        border-bottom: 1px solid var(--color-primary-light);
      }
    }
  }
}
</style>
