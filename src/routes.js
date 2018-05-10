import Scheduler from './components/Scheduler/Scheduler.vue'
import Schedules from './components/Schedules/Schedules.vue'

export const routes = [
  { path: '/', component: Scheduler },
  { path: '/schedules', component: Schedules }
]
