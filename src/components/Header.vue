<template lang="html">
  <header class="header">
    <nav class="header__nav">
      <a href="/" class="header__link header__logo">Schedule/GW</a>
      <a href="#" class="header__link">My Schedules</a>
      <a href="#" class="header__link">Me</a>
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


    &:last-of-type {
      margin-left: 1rem;
    }
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
