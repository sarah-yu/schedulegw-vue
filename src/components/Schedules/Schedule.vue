<template lang="html">
  <div class="schedule">
    <h3 class="schedule__name">{{ schedule.name }}</h3>
    <div
      v-for="course in courses"
      class="schedule__courses">
      <div class="schedule__course">
        <p class="schedule__course-info">{{ course.crn }} {{ course.gwid }}-{{ course.section }} {{ course.course_name }}</p>
        <p v-if="course.final_date" class="schedule__course-finals">
          Finals: {{ course.final_date }} <span v-if="course.final_time">at {{ course.final_time }}</span>
        </p>
        <p class="schedule__course-books"></p>
      </div>
    </div>
    <div class="schedule__course-actions">
      <div class="schedule__course-actions--left">
        <button class="schedule__action schedule__action--view">View</button>
        <button class="schedule__action schedule__action--delete">Delete</button>
      </div>
      <div class="schedule__course-actions--right">
        <button class="schedule__action schedule__action--email">Email</button>
        <button class="schedule__action schedule__action--share">Share</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ['schedule'],
  data() {
    return {
      courses: []
    }
  },
  created() {
    let courses = []

    this.schedule.courses.map(courseId => {
      axios
        .get(`/courses/${courseId}`)
        .then(course => courses.push(course.data))
        .catch(err => console.log(err))
    })

    this.courses = courses
  }
}
</script>

<style lang="scss">
.schedule {
  background-color: #fff;
  border-radius: .3rem;
  color: var(--color-primary);
  width: 55vw;
  margin: 5rem;
  padding: 5rem 6rem;
  box-shadow: 0 .5rem 2.5rem var(--color-grey-light-3);

  &__name {
    font-size: var(--font-xl);
    font-weight: 400;
  }

  &__course {
    margin: 2rem 0;
  }

  &__course-info {
    font-size: var(--font-l);
  }

  &__course-finals {
    color: var(--color-grey-dark-2);
    font-size: var(--font-m);
    margin-top: .5rem;
  }

  &__course-actions {
    margin-top: 5rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__action {
    color: #fff;
    background-color: var(--color-primary-light);
    border: 1px solid var(--color-primary-light);
    border-radius: 3rem;
    font-family: var(--font-primary);
    font-size: var(--font-s);
    text-transform: uppercase;
    letter-spacing: .1rem;
    padding: .8rem 2rem;
    transition: all .2s;


    &:not(:last-of-type) {
      margin-right: 2rem;
    }

    &:focus,
    &:hover,
    &:active {
      cursor: pointer;
      outline: none;
    }

    &:active {
      transform: translateY(.1rem);
    }

    &--view {
      padding: .8rem 2.5rem;

      &:hover,
      &:focus,
      &:active {
        background-color: rgba(0, 150, 225, .9); // var(--color-primary-light)
        border: 1px solid rgba(0, 150, 225, .9);
      }
    }

    &--delete {
      color: var(--color-grey-dark-3);
      border: 1px solid currentColor;
      background-color: transparent;
    }

    &--email,
    &--share {
      color: var(--color-primary-light);
      background-color: #fff;

      &:hover,
      &:focus,
      &:active {
        color: #fff;
        background-color: var(--color-primary-light);
      }
    }
  }
}
</style>
