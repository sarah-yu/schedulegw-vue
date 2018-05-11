import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    courses: [],
    newSchedule: [],
    filteredCourses: [],
    filter: {
      keyword: '',
      days: [],
      hours: []
    },
    schedules: []
  },
  mutations: {
    LOAD_COURSES: state => {
      axios
        .get('/courses')
        .then(res => (state.courses = res.data))
        .catch(err => console.log(err))
    },
    ADD_COURSE: (state, newCourse) => {
      newCourse.conflicts = false // default conflicts to false
      let updatedCourses = state.newSchedule.concat(newCourse)
      state.newSchedule = updatedCourses
    },
    REMOVE_COURSE: (state, course) => {
      state.newSchedule.splice(state.newSchedule.indexOf(course), 1)

      let updatedSchedule = state.newSchedule.map(eachCourse =>
        Object.assign({}, eachCourse, { conflicts: false })
      )

      state.newSchedule = updatedSchedule
    },
    ASSIGN_COLOR: (state, { course, color }) => {
      let theCourse = state.newSchedule.find(c => c == course)
      theCourse.color = color
    },
    ADD_CONFLICT: (state, coursesWithConflicts) => {
      // loop through course id's in coursesWithConflicts array
      for (let i = 0; i < coursesWithConflicts.length; i++) {
        // match each id to the correct course in state.newSchedule array
        let course = state.newSchedule.find(
          course => course.id == coursesWithConflicts[i]
        )
        course.conflicts = true // set conflicts to true for the matching course
      }
    },
    FILTER_COURSES: (state, { filterType, filterValue }) => {
      state.filter[filterType] = filterValue // set filters in state

      let filteredCourses = state.courses.filter(course => {
        let ok = true

        // keyword filter
        if (state.filter.keyword) {
          let courseName = course.course_name.toLowerCase()
          ok =
            courseName.indexOf(state.filter.keyword) != -1 ||
            course.gwid.indexOf(state.filter.keyword) != -1 ||
            course.professor_name.indexOf(state.filter.keyword) != -1
        }

        // days filter
        if (ok && state.filter.days.length > 0) {
          for (let i = 0; i < state.filter.days.length; i++) {
            let n = state.filter.days[i]
            let day = `day${n}_start`
            if (course[day]) {
              ok = true
              break
            } else {
              ok = false
            }
          }
        }

        // hours filter
        if (ok && state.filter.hours.length > 0) {
          for (let i = 0; i < state.filter.hours.length; i++) {
            if (course.hours == state.filter.hours[i]) {
              ok = true
              break
            } else {
              ok = false
            }
          }
        }

        return ok
      })

      state.filteredCourses = filteredCourses
    },
    CLEAR_FILTER: state => {
      state.filter = {
        keyword: '',
        days: [],
        hours: []
      }
    },
    SAVE_SCHEDULE: state => {
      console.log('saving schedule')
      console.log(state.newSchedule)

      axios
        .post('/schedules', state.newSchedule)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    LOAD_SCHEDULES: (state, schedules) => {
      state.schedules = schedules.data
    }
  },
  actions: {
    loadCourses: ({ commit }) => commit('LOAD_COURSES'),
    addCourse: ({ commit, dispatch }, newCourse) => {
      commit('ADD_COURSE', newCourse)
      dispatch('checkConflicts')
      dispatch('assignColor', newCourse)
    },
    removeCourse: ({ commit, dispatch }, course) => {
      commit('REMOVE_COURSE', course) // commit REMOVE_COURSE mutation, and...
      dispatch('checkConflicts') // always check for conflicts in remaining courses
    },
    assignColor: ({ commit }, course) => {
      const colors = ['#F7AA97', '#ED9282', '#CFAA9E', '#D8E6E7', '#9DC3C1']

      let randomColor = Math.floor(Math.random() * colors.length)

      commit('ASSIGN_COLOR', {
        course: course,
        color: colors[randomColor]
      })
    },
    checkConflicts: ({ commit, state }) => {
      let coursesWithConflicts = []

      // loop through each day of the week
      for (let n = 1; n <= 7; n++) {
        // filter courses by day of week
        let courses = state.newSchedule
          .filter(course => course[`day${n}_start`] != null)
          .map(course => {
            return {
              id: course.id,
              name: course.course_name,
              start: course[`day${n}_start`],
              end: course[`day${n}_end`]
            }
          })

        // if there's more than 1 course on any day of the week, check for conflicts
        if (courses.length > 1) {
          for (let i = 0; i < courses.length; i++) {
            let course1 = courses[i]

            // only compare unique course pairing combinations
            for (let j = i + 1; j < courses.length; j++) {
              let course2 = courses[j]

              // compare course1 to course2
              if (
                course1.start == course2.start ||
                course1.end == course2.end ||
                ((course1.start < course2.start &&
                  course1.end > course2.start) ||
                  (course1.start < course2.end && course1.end > course2.end)) ||
                ((course2.start < course1.start &&
                  course2.end > course1.start) ||
                  (course2.start < course1.end && course2.end > course1.end))
              ) {
                // at this point, course1 and course2 are in conflict
                // add course2 (the more recent course added) to coursesWithConflicts array
                coursesWithConflicts.push(course2)
              }
            }
          }
        }
      }

      // create array of unique id's of courses with conflicts
      coursesWithConflicts = coursesWithConflicts
        .map(course => course.id)
        .filter((course, i, self) => self.indexOf(course) === i)

      commit('ADD_CONFLICT', coursesWithConflicts)
    },
    filterCourses: ({ commit }, [filterType, filterValue]) => {
      commit('FILTER_COURSES', {
        filterType: filterType,
        filterValue: filterValue
      })
    },
    clearFilter: ({ commit }) => commit('CLEAR_FILTER'),
    saveSchedule: ({ commit }) => commit('SAVE_SCHEDULE'),
    loadSchedules: ({ commit }) => {
      axios
        .get('/schedules')
        .then(schedules => commit('LOAD_SCHEDULES', schedules))
        .catch(err => console.log(err))
    },
    deleteSchedule: ({ commit }, scheduleId) => {
      axios
        .delete(`/schedules/${scheduleId}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    },
    editSchedule: ({ commit }, [scheduleId, newName]) => {
      axios
        .put(`/schedules/${scheduleId}`, {
          name: newName
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }
  },
  getters: {
    filter: state => state.filter,
    filteredCourses: state => state.filteredCourses,
    courses: state => state.courses,
    newSchedule: state => state.newSchedule,
    getSchedules: state => state.schedules
  }
})
