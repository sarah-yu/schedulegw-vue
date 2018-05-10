<template lang="html">
  <header class="header">
    <nav class="header__nav">
      <router-link to="/" class="header__link header__logo">Schedule/GW</router-link>
      <a href="http://localhost:5000/signin" class="header__link">Sign In</a>
      <router-link to="/schedules" class="header__link">My Schedules</router-link>
      <a href="http://localhost:5000/signout" class="header__link">Sign Out</a>
    </nav>
  </header>
</template>

<script>
export default {}
</script>

<style lang="scss">
.header {
  background-color: var(--color-primary);
  font-size: var(--font-l);
  padding: 1rem 1.2rem;

  &__nav {
    display: flex;
    align-items: center;
  }

  &__link {
    color: #fff;
    text-decoration: none;
    padding: .5rem;
  }

  &__logo {
    font-size: var(--font-xl);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .2rem;
    margin-right: auto;
  }
}
</style>
