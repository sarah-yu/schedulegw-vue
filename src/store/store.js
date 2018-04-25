import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    courses: [],
    newSchedule: [],
    filteredCourses: [],
    filter: ''
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
      state.newSchedule = state.newSchedule.concat(newCourse)
      // state.newSchedule.push(newCourse)
    },
    FILTER_COURSES: (state, filter) => {
      let filteredCourses = state.courses.filter(course => {
        let coursename = course.course_name.toLowerCase()
        state.filter = filter
        console.log(state.filter)
        return (
          coursename.indexOf(state.filter) != -1 ||
          course.gwid.indexOf(state.filter) != -1 ||
          course.professor_name.indexOf(state.filter) != -1
        )
      })
      state.filteredCourses = filteredCourses
      console.log(state.filteredCourses)
    },
    REMOVE_COURSE: (state, course) => {
      course.conflicts = false // reset conflicts to false
      state.newSchedule = state.newSchedule.filter(
        eachCourse => eachCourse != course
      )
      // state.newSchedule.splice(state.newSchedule.indexOf(course), 1)
    },
    ASSIGN_COLOR: (state, { course, color }) => {
      let theCourse = state.newSchedule.find(c => c == course)
      theCourse.color = color
    },
    ADD_CONFLICT: (state, { course1, course2 }) => {
      course1.conflicts = true
      course2.conflicts = true
    }
  },
  actions: {
    filteredcourses: ({ commit }, filter) => commit('FILTER_COURSES', filter),
    loadCourses: ({ commit }) => commit('LOAD_COURSES'),
    addCourse: ({ commit }, newCourse) => commit('ADD_COURSE', newCourse),
    removeCourse: ({ commit }, course) => commit('REMOVE_COURSE', course),
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
    addConflict: ({ commit }, { course1, course2 }) =>
      commit('ADD_CONFLICT', { course1, course2 })
  },
  getters: {
    filter: state => state.filter,
    fCourses: state => state.filteredCourses,
    courses: state => state.courses,
    newSchedule: state => state.newSchedule
  }
})
