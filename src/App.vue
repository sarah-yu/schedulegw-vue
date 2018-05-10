<template>
  <div id="app">
    <app-header></app-header>
    <main class="main">
        <router-view></router-view>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    appHeader: Header,
    appFooter: Footer
  }
}
</script>

<style lang="scss">
.main {
  min-height: 100vh;
}
</style>
