<template>
  <div>
    <div class="new-auth-layout__emp col sm-hide xs-hide lg-col-7 md-col-7">
      <div class="user-auth-desc-emp">
        <h1 class="text-emp">Login Portal for<br> Employer</h1>
        <span class="pl text-emp">Not an Employer? <a class="link" href="/auth/logincandidate">Login as a candidate</a></span>
      </div>
    </div>

    <div class="new-auth-layout__form justify-center sm-col-12 lg-col-5 md-col-5">
      <div class="mobile-black-screen flex flex-column flex-content-center col-10 lg-col-8 md-col-8 sm-col-10">
        <h2 class="sm-hide xs-hide mb2">Sign in as an Employer</h2>
        <div class="user-auth">
          <label for="email" class="bold sm-hide xs-hide">Email</label>
          <div class="user-auth__input" :class="{active : emailAct}">
            <input id="email" 
              placeholder="email address" 
              v-model="form.email" type="email" 
              autocomplete="off"
              @input="chackingEmail"
              @focus="() => {emailAct = true;}" 
              @blur="() => {emailAct = false;}">
          </div>
          <div id="email-err" class="error-message">
            {{err.email.value}}
          </div>

          <label for="password" class="bold sm-hide xs-hide">Password</label>
          <div class="user-auth__input" :class="{active : passwordAct}">
            <input id="password" 
            placeholder="password" 
            :type='visible ? "text" : "password"' 
            autocomplete="off" 
            minlength="8"
            v-model="form.password"
            @focus="() => {passwordAct = true;}"
            @input="chackingPassword"
            @blur="() => {passwordAct = false;}">
            <button @click="() => { visible = !visible }" class="visible">
              <img v-if="visible" src="~/assets/images/icons/other/visibility.svg" alt="visible">
              <img v-else src="~/assets/images/icons/other/remove_red_eye.svg" alt="visible">
            </button>
          </div>
          <div class="flex justify-between">
            <div id="password-err" class="error-message">
              {{err.password.value}}
            </div>
            <nuxt-link to="/auth/forgot-password" title="Forgot password" class="bold right-align m1 color-grey mobile-color-white">Forgot password?</nuxt-link>
          </div>

          <button class="btn my1 btn--primary btn--block " :disabled="(!err.password.valid || !err.email.valid) || processing" @click="login">
            <span v-if="!processing">Sign in</span>
            <span v-else>Processing</span>
          </button>
          <span class="center ps color-grey">Or</span>
          <span class="center color-grey">Don't have account ?
            <nuxt-link to="/auth/register" title="Register" class="bold mobile-color-white">Sign up now</nuxt-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { redirectIfAuthenticatedMixin } from "~/plugins/mixins/redirect-authenticated";

export default {
  layout: 'new-auth',
  mixins: [redirectIfAuthenticatedMixin],
  head: {
        title: "Login",
        meta: [
            {
                hid: "description",
                name: "description",
                content: "Login page",
            },
        ],
    },
  async asyncData({ $axios, route }) {
    let { data } = await $axios.$get("available-social-login");

    return {
      google: data.google,
      facebook: data.facebook,
      linkedin: data.linkedin,
    }
  },
  data() {
    return {
      processing: false,
      emailAct: false,
      passwordAct: false,
      err : {
        email: {
          valid : false,
          value : "",
        },
        password: {
          valid : false,
          value : "",
        },
      },
      form: {
        email: "",
        password: "",
      },
      visible : false,
    }
  },
  methods: {
    login() {
      this.processing = true;
      this.$auth
        .loginWith("local", {
          data: this.form,
                })
        .then((res) => {
          this.$bus.$emit("avatar-update", this.user.avatar_url);
          // this.$router.push("/account/edit-profile");
        })
        .catch((err) => {
          err.response.data.message.includes("Account") ? this.err.email.value = err.response.data.message : this.err.password.value = err.response.data.message;
          this.processing = false;
        });
    },

    //this func to check email that was inputted by user whether valid or not
    chackingEmail() {
      console.log("metode terpangil")
      if (!/^.+\@.+\..+$/g.test(this.form.email)) {
        this.err.email.value = "required field and must valid email!";
        this.err.email.valid = false;
      } else {
        this.err.email.value = "";
        this.err.email.valid = true;
      }
    },

    //this func to check password that was inputted by user whether valid or not
    chackingPassword() {
      let value = this.form.password;
      if (value.length < 8) {
        this.err.password.value = "less than 8 characters";
        this.err.password.valid = false;
      } else {
        this.err.password.value = "";
        this.err.password.valid = true; 
      }
    },


    // this func will called when user choice to auth by third party auth
    socialLogin(service) {
      window.location.href = `${process.env.BACKEND_BASE_URL}/auth/${service}/login`;
    },

  }
}
</script>
