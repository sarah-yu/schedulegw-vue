<template lang="html">
  <div class="tba-courses">
    <h3 class="tba-courses__heading">TBA Courses</h3>
    <ul v-if="tbaCourses.length > 0" class="tba-courses__courses">
      <li
        v-for="course in tbaCourses"
        @click="removeTbaCourse(course)"
        class="tba-courses__course">
          <i class="fas fa-times"></i> &nbsp; {{ course.gwid }}-{{course.section}} &nbsp; {{ course.course_name }}
      </li>
    </ul>
    <p v-else class="tba-courses__none">You have no TBA courses selected.</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['newSchedule']),
    tbaCourses() {
      return this.newSchedule.filter(course => course.days == 'TBA')
    }
  },
  methods: {
    ...mapActions(['removeCourse']),
    removeTbaCourse(course) {
      this.removeCourse(course)
    }
  }
}
</script>

<style lang="scss">
.tba-courses {
  border-top: 1px solid var(--color-grey-light-2);
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
