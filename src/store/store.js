import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    courses: [],
    newSchedule: []
  },
  mutations: {
    LOAD_COURSES: state => {
      axios
        .get('/courses')
        .then(res => {
          console.log(res.data)

          state.courses = res.data
        })
        .catch(err => console.log(err))
    },
    ADD_COURSE: (state, newCourse) => state.newSchedule.push(newCourse),
    REMOVE_COURSE: (state, course) =>
      state.newSchedule.splice(state.newSchedule.indexOf(course), 1),
    ASSIGN_COLOR: (state, { course, color }) => {
      let theCourse = state.newSchedule.find(c => c == course)
      theCourse.color = color
    }
  },
  actions: {
    loadCourses: ({ commit }) => commit('LOAD_COURSES'),
    addCourse: ({ commit }, newCourse) => commit('ADD_COURSE', newCourse),
    removeCourse: ({ commit }, course) => commit('REMOVE_COURSE', course),
    assignColor: ({ commit }, course) => {
      const colors = [
        '#F7AA97',
        '#ED9282',
        '#DE7E73',
        '#CFAA9E',
        '#77AAAD',
        '#6E7783',
        '#D8E6E7',
        '#9DC3C1'
      ]

      let randomColor = Math.floor(Math.random() * colors.length)

      commit('ASSIGN_COLOR', {
        course: course,
        color: colors[randomColor]
      })
    }
  },
  getters: {
    courses: state => state.courses,
    newSchedule: state => state.newSchedule
  }
})
