<template>
  <div class="filters">
    <div class="filters__basic">
      <input v-model="keyword" type="text" placeholder="Search courses" class="form-input filter__keyword">
      <!-- <select v-model="selected" class="filter__semester">
        <option disabled value="">Semester:</option>
        <option>Fall 2018</option>
        <option>Spring 2018</option>
        <option>Fall 2017</option>
      </select> -->
      <a href="#" class="filter__more-filters" @click="moreFilters">Filters <span v-if="!showAdvancedFilters">+</span><span v-else>&ndash;</span></a>
      <p v-if="totalHours" class="total-hours">{{ totalHours }}<span v-if="variableHours">{{ variableHours }}</span> Hours</p>
      <button class="button-primary">Save Schedule</button>
    </div>

    <!--  MORE FILTERS -->
    <div class="filters__advanced" v-if="showAdvancedFilters">
      <div>
        <h3>Day(s)</h3>
        <input type="checkbox" id="monday" value="Monday" v-model="days">
        <label for="monday">Monday</label>
        <input type="checkbox" id="tuesday" value="Tuesday" v-model="days">
        <label for="tuesday">Tuesday</label>
        <input type="checkbox" id="wednesday" value="Wednesday" v-model="days">
        <label for="wednesday">Wednesday</label>
        <input type="checkbox" id="thursday" value="Thursday" v-model="days">
        <label for="thursday">Thursday</label>
        <input type="checkbox" id="friday" value="Friday" v-model="days">
        <label for="friday">Friday</label>
        <input type="checkbox" id="weekend" value="Weekend" v-model="days">
        <label for="weekend">Weekend</label>
      </div>
      <div>
        <h3>Hours</h3>
        <input type="checkbox" id="hours-1" value="1" v-model="days">
        <label for="hours-1">1 hour</label>
        <input type="checkbox" id="hours-2" value="2" v-model="days">
        <label for="hours-2">2 hours</label>
        <input type="checkbox" id="hours-3" value="3" v-model="days">
        <label for="hours-3">3 hours</label>
        <input type="checkbox" id="hours-4" value="4" v-model="days">
        <label for="hours-4">4 hours</label>
        <input type="checkbox" id="hours-var" value="5" v-model="days">
        <label for="hours-var">5 hours</label>
      </div>
      <!-- <button>Reset</button> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      selected: 'Fall 2018',
      days: [],
      showAdvancedFilters: false
    }
  },
  computed: {
    ...mapGetters(['filter', 'newSchedule']),
    keyword: {
      get() {
        return this.filter
      },
      set(value) {
        let keyword = value.toString().toLowerCase()
        this.$store.dispatch('filterCourses', keyword)
      }
    },
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
    }
  },
  methods: {
    moreFilters($event) {
      $event.preventDefault()
      this.showAdvancedFilters = !this.showAdvancedFilters
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
