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
    ADD_COURSE: (state, newCourse) => {
      state.newSchedule.push(newCourse)

      console.log('NEW SCHEDULE:')
      console.log(state.newSchedule)
    },
    REMOVE_COURSE: (state, course) => {
      state.newSchedule.splice(state.newSchedule.indexOf(course), 1)

      console.log('UPDATED SCHEDULE:')
      console.log(state.newSchedule)
    }
  },
  actions: {
    loadCourses: ({ commit }) => {
      commit('LOAD_COURSES')
    },
    addCourse: ({ commit }, newCourse) => {
      commit('ADD_COURSE', newCourse)
    },
    removeCourse: ({ commit }, course) => {
      commit('REMOVE_COURSE', course)
    }
  },
  getters: {
    courses: state => state.courses,
    newSchedule: state => state.newSchedule
  }
})
