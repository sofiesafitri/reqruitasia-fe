<template>
    <div class="container">
        <div class="auth-page auth-page--register">
            <div v-if="registered" class="clearfix">
                <div class="col-6 mx-auto">
                    <div class="alert alert--success">
                        Check your email then click the verification link.
                    </div>
                </div>
            </div>

            <div v-else class="auth-form auth-form--compact">
                <div class="auth-form__wrapper">
                    <nuxt-link to="/">
                        <Logo center class="mb3" />
                    </nuxt-link>

                    <form @submit.prevent="register" class="form">
                        <div class="form__group">
                            <label class="sr-only" for="name">
                                Nama
                                <span class="required">*</span>
                            </label>
                            <div class="input-group input-group--no-append">
                                <div
                                    class="input-group__prepend input-group__prepend--icon-primary"
                                >
                                    <i class="icon-profile"></i>
                                </div>
                                <div class="input-group__main">
                                    <input
                                        type="text"
                                        class="form__control"
                                        id="name"
                                        placeholder="Nama"
                                        v-model="form.name"
                                        @blur="$v.form.name.$touch()"
                                    />
                                </div>
                            </div>
                            <span
                                v-if="errors.name || $v.form.name.$invalid"
                                class="invalid-feedback"
                                role="alert"
                            >
                                <span v-if="errors.name">{{
                                    errors.name[0]
                                }}</span>
                                <span v-if="$v.form.name.$error"
                                    >Required field!</span
                                >
                            </span>
                        </div>
                        <div class="form__group">
                            <label class="sr-only" for="email">
                                Email
                                <span class="required">*</span>
                            </label>
                            <div class="input-group input-group--no-append">
                                <div
                                    class="input-group__prepend input-group__prepend--icon-primary"
                                >
                                    <i class="icon-message"></i>
                                </div>
                                <div class="input-group__main">
                                    <input
                                        type="text"
                                        id="email"
                                        class="form__control"
                                        placeholder="Email"
                                        v-model="form.email"
                                        @blur="$v.form.email.$touch()"
                                    />
                                </div>
                            </div>
                            <span
                                v-if="errors.email || $v.form.email.$invalid"
                                class="invalid-feedback"
                                role="alert"
                            >
                                <span v-if="errors.email">{{
                                    errors.email[0]
                                }}</span>
                                <span v-if="$v.form.email.$error"
                                    >Required field! Should be valid email</span
                                >
                            </span>
                        </div>
                        <div class="form__group">
                            <label class="sr-only" for="password">
                                Kata Sandi
                                <span class="required">*</span>
                            </label>
                            <div class="input-group input-group--no-append">
                                <div
                                    class="input-group__prepend input-group__prepend--icon-primary"
                                >
                                    <i class="icon-lock"></i>
                                </div>
                                <div class="input-group__main">
                                    <input
                                        type="password"
                                        id="password"
                                        class="form__control"
                                        placeholder="Kata Sandi"
                                        v-model="form.password"
                                        @blur="$v.form.password.$touch()"
                                        autocomplete="new-password"
                                    />
                                </div>
                            </div>
                            <span
                                v-if="
                                    errors.password || $v.form.password.$invalid
                                "
                                class="invalid-feedback"
                                role="alert"
                            >
                                <span v-if="errors.password">
                                    {{ errors.password[0] }}
                                </span>
                                <span v-if="$v.form.password.$error"
                                    >Required field, min 8 characters!</span
                                >
                            </span>
                        </div>
                        <div class="form__group">
                            <label class="sr-only" for="confirm-password">
                                Konfirmasi Kata Sandi
                                <span class="required">*</span>
                            </label>
                            <div class="input-group input-group--no-append">
                                <div
                                    class="input-group__prepend input-group__prepend--icon-primary"
                                >
                                    <i class="icon-lock"></i>
                                </div>
                                <div class="input-group__main">
                                    <input
                                        type="password"
                                        id="confirm-password"
                                        placeholder="Konfirmasi Kata Sandi"
                                        class="form__control"
                                        v-model="form.password_confirmation"
                                        @blur="
                                            $v.form.password_confirmation.$touch()
                                        "
                                        autocomplete="off"
                                    />
                                </div>
                            </div>
                            <span
                                v-if="
                                    errors.password_confirmation ||
                                    $v.form.password_confirmation.$invalid
                                "
                                class="invalid-feedback"
                                role="alert"
                            >
                                <span v-if="errors.password_confirmation">
                                    {{ errors.password_confirmation[0] }}
                                </span>
                                <span
                                    v-if="$v.form.password_confirmation.$error"
                                    >Must be equal with Password field!</span
                                >
                            </span>
                        </div>

                        <button
                            type="submit"
                            class="btn btn--primary btn--block btn--shadow mt2"
                            :disabled="$v.$invalid || processing"
                        >
                            <span v-if="!processing">Register</span>
                            <span v-else>Processing</span>
                        </button>
                    </form>

                    <div>
                        <div class="auth-form__or">
                            <span class="text">Or</span>
                        </div>

                        <div class="auth-form__social">
                            <div v-if="google" class="auth-form__social-item">
                                <button
                                    class="btn btn--transparent"
                                    @click="socialLogin('google')"
                                    title="Google"
                                    type="button"
                                >
                                    <svg>
                                        <image
                                            xlink:href="~/assets/images/icons-color/google.svg"
                                            alt="Google"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div v-if="facebook" class="auth-form__social-item">
                                <button
                                    class="btn btn--transparent"
                                    @click="socialLogin('facebook')"
                                    title="Facebook"
                                    type="button"
                                >
                                    <svg>
                                        <image
                                            xlink:href="~/assets/images/icons-color/facebook.svg"
                                            alt="Facebook"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div v-if="linkedin" class="auth-form__social-item">
                                <button
                                    class="btn btn--transparent"
                                    @click="socialLogin('linkedin')"
                                    title="Linkedin"
                                    type="button"
                                >
                                    <svg>
                                        <image
                                            xlink:href="~/assets/images/icons-color/linkedin.svg"
                                            alt="Linkedin"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <p class="auth-form__tnc">
                            Aggree to
                            <a href="#" title="Syarat dan ketentuan"
                                >terms and conditions</a
                            >
                        </p>
                    </div>

                    <div class="auth-form__msg-btn">
                        <nuxt-link
                            to="/auth/login"
                            class="btn btn--block btn-outline btn-outline--white"
                            >Login</nuxt-link
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { email, required, sameAs, minLength } from "vuelidate/lib/validators";
import Logo from "~/components/Share/Logo";

export default {
    layout: "auth",
    head: {
        title: "Register",
        meta: [
            {
                hid: "description",
                name: "description",
                content: "Register page",
            },
        ],
    },
    components: {
        Logo,
    },
    async asyncData({ $axios, route }) {
        let { data } = await $axios.$get("available-social-login");

        return {
            processing: false,
            registered: false,
            form: {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
            },
            google: data.google,
            facebook: data.facebook,
            linkedin: data.linkedin,
        };
    },
    validations: {
        form: {
            name: { required },
            email: { required, email },
            password: { required, minLength: minLength(8) },
            password_confirmation: {
                required,
                sameAsPassword: sameAs("password"),
            },
        },
    },
    methods: {
        async register() {
            this.processing = true;

            await this.$axios
                .$post("/register", this.form)
                .then((res) => {
                    this.registered = true;
                })
                .catch((err) => {
                    this.axiosErr(err);
                })
                .finally(() => {
                    this.processing = false;
                });
        },
        socialLogin(service) {
            window.location.href = `${process.env.BACKEND_BASE_URL}/auth/${service}/login`;
        },
    },
    beforeMount() {
        if (this.authenticated) {
            this.$router.push("/");
        }
    },
};
</script>