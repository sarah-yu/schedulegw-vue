<template lang="html">
  <footer class="footer">
    <p>Always check with the Records Office for official info</p>
    <a href="#">Feedback</a>
    <a href="#">Privacy Policy</a>
    <a href="#">Terms</a>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss">
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;

    min-height: 15rem;
    border-top: 1px solid var(--color-grey-light-1);
    color: var(--color-grey-dark-2);
    font-size: var(--font-s);

    & > * {
      padding: 1rem;
    }

    a {
      color: currentColor;
      text-transform: uppercase;
      text-decoration: none;
      letter-spacing: .08rem;
    }
  }
</style>
