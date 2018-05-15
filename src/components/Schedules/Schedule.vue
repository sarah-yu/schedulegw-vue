<template lang="html">
  <div class="schedule">
    <div class="schedule__name-container">
      <h3 v-if="!isEditing" class="schedule__name">{{ schedule.name }}</h3>
      <input v-else type="text" v-model="schedule.name" class="schedule__name-edit-input">
      <div class="schedule__name-edit-button" @click="isEditing = !isEditing">
        <span v-if="!isEditing">Edit</span>
        <span v-else @click="saveName">Save</span>
      </div>
    </div>
    <div
      v-for="course in schedule.courses"
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
        <button @click="removeSchedule" class="schedule__action schedule__action--delete">Delete</button>
      </div>
      <div class="schedule__course-actions--right">
        <button class="schedule__action schedule__action--email">Email</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  props: ['schedule'],
  data() {
    return {
      isEditing: false
    }
  },
  methods: {
    ...mapActions(['deleteSchedule', 'editSchedule']),
    removeSchedule() {
      this.deleteSchedule(this.schedule.id)
      this.$router.push('/schedules')
    },
    saveName() {
      this.editSchedule([this.schedule.id, this.schedule.name])
    }
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

  &__name-container {
    display: flex;
    align-items: center;
  }

  &__name {
    font-size: var(--font-xl);
    font-weight: 400;
  }

  &__name-edit-input {
    border: none;
    border-bottom: 1px solid var(--color-grey-light-3);
    color: var(--color-primary);
    font-family: var(--font-primary);
    font-size: var(--font-xl);
    padding: .5rem 0;

    &:focus {
      outline: none;
    }
  }

  &__name-edit-button {
    margin-left: 2rem;
    font-size: var(--font-xs);
    text-transform: uppercase;
    letter-spacing: .05rem;
    border-bottom: 1px solid currentColor;

    &:focus,
    &:hover,
    &:active {
      cursor: pointer;
    }
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
      border: 1px solid var(--color-grey-light-3);
      background-color: transparent;

      &:hover,
      &:focus,
      &:active {
        color: var(--color-grey-dark-1);
        border: 1px solid var(--color-grey-dark-3);
      }
    }

    &--email {
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
