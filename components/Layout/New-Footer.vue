<template>
  <div class="new-footer-root">
    <div class="col-12 flex justify-center">
      <img :src="logo_url" alt="logo" class="logo">
    </div>

    <div class="col-12 sm-flex justify-center menu">
      <div>
       <ul>
          <li>
            <a href="/about" class="color-white"> About</a>
          </li>
          <li>
            <a href="https://employer.reqruitasia.com/" class="color-white">Employer</a>
          </li>
          <li>
            <nuxt-link to="/explore-jobs" class="color-white">Explore Jobs</nuxt-link>
          </li>
          <li>
            Insights
          </li>
          <li>
            <a href="/contact_us" class="color-white">Contact Us</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="col-10 12 flex justify-between copyright">
      <span class="color-white">© 2021 Reqruitasia. All rights reserved</span>
      <div class="social-media">
        <button><img src="~/assets/images/icons/social/intsagram-white.svg" alt="instagram"></button>
        <button><img src="~/assets/images/icons/social/drebble-white.svg" alt="drebble"></button>
        <button><img src="~/assets/images/icons/social/twitter-white.svg" alt="twitter"></button>
        <button><img src="~/assets/images/icons/social/youtube-white.svg" alt="youtube"></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo_url: this.$store.getters.logo.frontend,
    }
  },
}
</script>