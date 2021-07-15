<template>
  <header class="new-header">
      <div class="new-header__logo col-12 lg-col-2 md-col-2 sm-col-12 my2">
        <img :src="logo_url" alt="logo">
      </div>
      <div class="new-header__navigation col-5 xs-hide sm-hide">
         <ul>
          <li>
            <div class="flex-column dropdown">
            <span class="flex color-black" >About <img class="mx1" src="~/assets/images/icons/other/Polygon.svg" alt="down"></span>
            <div class="sub-dropdown">
              <span>Company Profile</span>
              <span>Our Team</span>
            </div>
            </div>
          </li>
          <li>
            <a href="https://employer.reqruitasia.com/" class="color-black">Employer</a>
          </li>
          <li>
            <nuxt-link to="/explore-jobs" class="color-black">Explore Jobs</nuxt-link>
          </li>
          <li>
            Insights
          </li>
          <li>
            Contact Us
          </li>
        </ul>
      </div>
      <div class="new-header__search xs-hide sm-hide" v-if="!explore_jobs" >
        <div class="search" :class="{active: search.act}">
          <input type="text" 
          placeholder="Search" 
          v-model="search.value"
          @focus="() => {search.act = true}" 
          @blur="() => {search.act = false}">
          <button @click="searchJob" ><img src="~/assets/images/icons/other/search.svg" alt="search"></button>
        </div>
      </div>
      <div class="new-header__auth col-2 xs-hide sm-hide"> 
        <div class="flex justify-center">
        <nuxt-link to="/auth/login"> <button id="login">Login</button></nuxt-link>
        <nuxt-link to="/auth/register"> <button id="signup">Sign up</button></nuxt-link>
        </div>
      </div> 
  </header>
</template>


<script>
export default {
  data() {
    return {
      logo_url: this.$store.getters.logo.frontend,
      search : {
        value : "",
        act: false,
      },
      explore_jobs: false,
      user_avatar: "",
      site_name: this.$store.getters.site_name,
      header_class: "light",
      header_text_class: "",
      btn_outline_class: this.$route.path == "/" ? "btn-outline--color-light" : "btn-outline--color-dark",
      notifListShow: false,
      employer_site_url: process.env.EMPLOYER_BASE_URL,
      top_menu: this.$store.getters.menus.top_menu,
    }
  },
  created() {
        if (this.authenticated) {
            this.user_avatar = this.user.avatar_url;
            this.has_unread_notifications = this.user.has_unread_notifications;
        }
        this.$bus.$on("avatar-update", (avatar_url) => {
            this.user_avatar = avatar_url;
        });
        //this.routeCheck();
        if (process.client) {
            const notifEl = document.getElementById("header__notification");
            const vm = this;
            document.addEventListener("click", function (event) {
                const isClickInsideEl = notifEl.contains(event.target);
                if (!isClickInsideEl) {
                    vm.notifListShow = false;
                }
            });
        }
    },
  methods: {
    searchJob() {
      this.$router.push(`/explore-jobs?keyword=${this.search.value}`);
    },
    logout() {
            this.$auth.logout().then((res) => {
                this.$router.push("/");
            });
    },
    routeCheck() {
            let route_path = this.$route.path;
            if (route_path == "/") {
                this.is_home = true;
                this.logo_url = this.$store.getters.logo.light;
                this.header_class = "dark";
                this.btn_outline_class = "btn-outline--color-light";
                this.header_text_class = "light";
            } else {
                this.is_home = false;
                this.logo_url = this.$store.getters.logo.frontend;
                this.header_class = "light";
                this.btn_outline_class = "btn-outline--color-dark";
                this.header_text_class = "";
            }
            this.explore_jobs = route_path == "/explore-jobs" ? true : false;
            console.log(route_path)
    },
  },
}
</script>