<template>
  <div class="filters">
    <div class="filters__basic">
      <div class="filters__basic--left">
        <input
          v-model="keywordFilter"
          type="text"
          placeholder="Search courses"
          class="form-input filter__keyword">
        <a href="#" class="filter__more-filters" @click="moreFilters">Filters <span v-if="!showAdvancedFilters">+</span><span v-else>&ndash;</span></a>
      </div>
      <div class="filters__basic--right">
        <p v-if="totalHours" class="total-hours">{{ totalHours }}<span v-if="variableHours">{{ variableHours }}</span> Hours</p>
        <button @click="saveSchedule" class="button-primary schedules__save-button">Save Schedule</button>
      </div>
    </div>

    <!--  MORE FILTERS -->
    <div class="filters__advanced" v-if="showAdvancedFilters">
      <div class="filters__advanced-container">
        <!--  DAYS FILTER -->
        <div class="filter__days">
          <h3 class="filter__heading">Days</h3>
          <div class="filter__checkboxes">
            <div v-for="(day, index) in dayLabels" class="filter__checkbox">
              <input
                type="checkbox"
                :id="day"
                :value="index + 1"
                v-model="days"
                @change="updateDays"
                class="filter__checkbox-input"
                >
              <label :for="day" class="filter__checkbox-label">{{ day }}</label>
            </div>
          </div>
        </div>

        <!--  HOURS FILTER -->
        <div class="filter__hours">
          <h3 class="filter__heading">Hours</h3>
          <div class="filter__checkboxes">
            <div v-for="(hrs, index) in hourLabels" class="filter__checkbox">
              <input
                type="checkbox"
                :id="hrs"
                :value="hrs == 'variable' ? 'variable' : index + 1"
                v-model="hours"
                @change="updateHours"
                class="filter__checkbox-input"
                >
              <label :for="hrs" class="filter__checkbox-label">{{ hrs }} {{ hrs == 'variable' ? '' : hrs < 2 ? 'hour' : 'hours' }}</label>
            </div>
          </div>
        </div>
      </div>

      <button @click="resetFilter" class="filters__reset-button">Reset Filters</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      selected: 'Fall 2018',
      dayLabels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      hourLabels: ['1', '2', '3', '4', 'variable'],
      days: [],
      hours: [],
      showAdvancedFilters: false
    }
  },
  computed: {
    ...mapGetters(['filter', 'newSchedule']),
    totalHours() {
      return this.newSchedule
        .filter(course => course.hours != 'variable') // ignore courses where hours property is 'variable'
        .reduce((acc, curr) => {
          return acc + parseInt(curr.hours)
        }, 0)
    },
    variableHours() {
      let plus = ''
      let varHours = this.newSchedule.filter(
        course => course.hours == 'variable'
      )
      if (varHours.length > 0) {
        plus = '+'
      }
      return plus
    },
    keywordFilter: {
      get() {
        return this.filter.keyword
      },
      set(value) {
        let keyword = value.toString().toLowerCase()
        this.$store.dispatch('filterCourses', ['keyword', keyword])
      }
    }
  },
  methods: {
    ...mapActions({
      filterCourses: 'filterCourses',
      clearFilter: 'clearFilter',
      postSchedule: 'saveSchedule'
    }),
    moreFilters($event) {
      $event.preventDefault()
      this.showAdvancedFilters = !this.showAdvancedFilters
    },
    updateDays() {
      this.filterCourses(['days', this.days])
    },
    updateHours() {
      this.filterCourses(['hours', this.hours])
    },
    resetFilter() {
      this.clearFilter()
      this.days = this.filter.days
      this.hours = this.filter.hours
    },
    saveSchedule() {
      this.postSchedule()
    }
  }
}
</script>

<style lang="scss">
.filters {
  font-size: var(--font-m);
  border-bottom: 1px solid var(--color-grey-light-2);
  min-height: 11vh;
  padding: 2rem 0;

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media only screen and (max-width: 500px) {
    font-size: var(--font-s);
  }

  &__basic {
    display: flex;
    align-items: center;
    padding: 1rem 3rem;

    @media only screen and (max-width: 768px) {
      flex-direction: column;
      justify-content: center;
    }

    @media only screen and (max-width: 500px) {
      padding: 0;
    }

    &--left {
      margin-right: auto;

      @media only screen and (max-width: 768px) {
        margin-right: 0;
      }
    }

    &--right {
      display: flex;
      align-items: center;

      @media only screen and (max-width: 768px) {
        width: 50vw;
        justify-content: center;

        margin-top: 3rem;
      }

      @media only screen and (max-width: 500px) {
        width: 80vw;
        justify-content: space-around;
      }
    }
  }

  &__advanced {
    padding: 1rem 5rem;
  }

  &__advanced-container {
    display: flex;
    align-items: flex-start;

    margin-top: 1.5rem;

    @media only screen and (max-width: 768px) {
      justify-content: center;
    }
  }

  &__reset-button {
    margin-top: 2rem;
    float: right;

    background-color: transparent;
    border: none;
    border-bottom: .2rem solid currentColor;
    color: var(--color-grey-dark-3);
    font-family: var(--font-primary);
    font-size: var(--font-s);
    font-weight: 700;
    letter-spacing: .08rem;
    text-transform: uppercase;

    @media only screen and (max-width: 768px) {
      float: none;
      display: block;
      margin: 0 auto;
      margin-top: 4rem;
    }

    &:hover,
    &:focus,
    &:active {
      cursor: pointer;
      color: var(--color-grey-dark-2);
      outline: none;
    }
  }
}

.filter {
  &__keyword {
    margin-right: 2rem;

    @media only screen and (max-width: 768px) {
      width: 75vw;
    }

    @media only screen and (max-width: 620px) {
      width: 65vw;
    }
  }

  &__more-filters {
    color: var(--color-grey-dark-1);
    font-weight: 700;
    letter-spacing: .08rem;
    text-decoration: none;
    text-transform: uppercase;
  }

  &__days {
    margin-right: 8rem;
  }

  &__heading {
    font-size: var(--font-s);
    text-transform: uppercase;
    letter-spacing: .05rem;
  }

  &__checkboxes {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
  }

  &__checkbox {
    padding: .5rem 2rem .5rem 0;
  }

  &__checkbox-label {
    margin-left: .5rem;
  }
}

.total-hours {
  display: block;
  color: var(--color-grey-dark-1);
  font-weight: 700;
  letter-spacing: .08rem;
  text-transform: uppercase;
  margin-right: 2rem;
}

.schedules {
  &__save-button {
    @media only screen and (max-width: 500px) {
      font-size: var(--font-s);
    }
  }
}
</style>
