import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    courses: [],
    newSchedule: [],
    filteredCourses: [],
    filter: '',
    daysFilter: []
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
    FILTER_COURSES: (state, filter) => {
      state.filter = filter

      let filteredCourses = state.courses.filter(course => {
        let courseName = course.course_name.toLowerCase()
        return (
          courseName.indexOf(state.filter) != -1 ||
          course.gwid.indexOf(state.filter) != -1 ||
          course.professor_name.indexOf(state.filter) != -1
        )
      })
      state.filteredCourses = filteredCourses
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
      const colors = [
        // '#F7AA97',
        // '#ED9282',
        // '#DE7E73',
        // '#CFAA9E',
        // '#6E7783',
        // '#D8E6E7',
        // '#9DC3C1'
        '#AB9964',
        '#CFC092',
        '#F7EAC5',
        '#C6B685',
        '#E8DAB2',
        '#BFAD7A',
        '#9C8952'
      ]

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

        // console.log(`${courses.length} courses in day ${n}:`)
        // console.log(courses)

        // if there's more than 1 course on any day of the week, check for conflicts
        if (courses.length > 1) {
          for (let i = 0; i < courses.length; i++) {
            let course1 = courses[i]

            // only compare unique course pairing combinations
            for (let j = i + 1; j < courses.length; j++) {
              let course2 = courses[j]

              // console.log(`comparing ${course1.name} to ${course2.name}`);

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

      // console.log('COURSES WITH CONFLICTS:')
      // console.log(coursesWithConflicts)

      commit('ADD_CONFLICT', coursesWithConflicts)
    },
    filterCourses: ({ commit }, filter) => commit('FILTER_COURSES', filter),
    filterCoursesByDay: ({ commit }, days) =>
      commit('FILTER_COURSES_BY_DAY', days)
  },
  getters: {
    filter: state => state.filter,
    daysFilter: state => state.daysFilter,
    filteredCourses: state => state.filteredCourses,
    courses: state => state.courses,
    newSchedule: state => state.newSchedule
  }
})
