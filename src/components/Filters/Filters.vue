<template>
  <div class="filters">
    <div class="filters__basic">
      <input
        v-model="keywordFilter"
        type="text"
        placeholder="Search courses"
        class="form-input filter__keyword">
      <a href="#" class="filter__more-filters" @click="moreFilters">Filters <span v-if="!showAdvancedFilters">+</span><span v-else>&ndash;</span></a>
      <p v-if="totalHours" class="total-hours">{{ totalHours }}<span v-if="variableHours">{{ variableHours }}</span> Hours</p>
      <button class="button-primary">Save Schedule</button>
    </div>

    <!--  MORE FILTERS -->
    <div class="filters__advanced" v-if="showAdvancedFilters">

      <!--  DAYS FILTER -->
      <div>
        <h3>Day(s)</h3>
        <div v-for="(day, index) in dayLabels">
          <input
            type="checkbox"
            :id="day"
            :value="index + 1"
            v-model="days"
            @change="updateDays"
            >
          <label :for="day">{{ day }}</label>
        </div>
      </div>

      <!--  HOURS FILTER -->
      <div>
        <h3>Hours</h3>
        <div v-for="(hrs, index) in hourLabels">
          <input
            type="checkbox"
            :id="hrs"
            :value="hrs == 'variable' ? 'variable' : index + 1"
            v-model="hours"
            @change="updateHours"
            >
          <label :for="hrs">{{ hrs }} {{ hrs == 'variable' ? '' : hrs < 2 ? 'hour' : 'hours' }}</label>
        </div>
      </div>
      <button @click="resetFilter">Reset</button>
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
      hourLabels: ['1', '2', '3', '4', '5', 'variable'],
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
    ...mapActions(['filterCourses', 'clearFilter']),
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
    }
  }
}
</script>

<style lang="scss">
.filters {
  border-bottom: 1px solid var(--color-grey-light-2);
  min-height: 11vh;
  padding: 3rem;

  display: flex;
  flex-direction: column;

  &__basic {
    display: flex;
    align-items: center;
    padding: 1rem 3rem;
  }

  &__advanced {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding: 1rem 3rem;

  }
}

.filter {
  &__keyword {
    margin-right: 2rem;
  }

  &__more-filters {
    color: var(--color-grey-dark-1);
    font-size: var(--font-s);
    font-weight: 700;
    letter-spacing: .08rem;
    text-decoration: none;
    text-transform: uppercase;
    margin-right: auto;
  }
}

.total-hours {
  color: var(--color-grey-dark-1);
  font-size: var(--font-s);
  font-weight: 700;
  letter-spacing: .08rem;
  text-transform: uppercase;
  margin-right: 2rem;
}
</style>
