<template>
    <div class="container">
        <div class="auth-page auth-page--forgot-password">
            <div v-if="sent" class="alert alert--success">
                {{ message }}.
                <nuxt-link to="/auth/login" title="Login"
                    >Login sekarang</nuxt-link
                >.
            </div>

            <div v-else class="auth-form auth-form--compact">
                <div class="auth-form__wrapper">
                    <h1>Reset Password</h1>
                    <div class="auth-form__cta">Atur ulang password Anda.</div>

                    <form @submit.prevent="update" class="form">
                        <div class="form__group">
                            <label class="sr-only" for="email"
                                >E-Mail Address</label
                            >
                            <div class="input-group input-group--no-append">
                                <div
                                    class="input-group__prepend input-group__prepend--icon-primary"
                                >
                                    <i class="icon-message"></i>
                                </div>
                                <div class="input-group__main">
                                    <input
                                        id="email"
                                        type="email"
                                        class="form__control"
                                        name="email"
                                        v-model="form.email"
                                        @blur="$v.form.email.$touch()"
                                        placeholder="Email"
                                        required
                                        autocomplete="email"
                                        autofocus
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
                                    >Required field and must valid email!</span
                                >
                            </span>
                        </div>

                        <div class="form__group">
                            <label class="sr-only" for="password"
                                >Password</label
                            >
                            <div class="input-group input-group--no-append">
                                <div
                                    class="input-group__prepend input-group__prepend--icon-primary"
                                >
                                    <i class="icon-lock"></i>
                                </div>
                                <div class="input-group__main">
                                    <input
                                        id="password"
                                        type="password"
                                        class="form__control"
                                        name="password"
                                        v-model="form.password"
                                        @blur="$v.form.password.$touch()"
                                        placeholder="Password"
                                        required
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
                                <span v-if="errors.password">{{
                                    errors.password[0]
                                }}</span>
                                <span v-if="$v.form.password.$error"
                                    >Required field, min 8 characters!</span
                                >
                            </span>
                        </div>

                        <div class="form__group">
                            <label class="sr-only" for="password-confirm"
                                >Confirm Password</label
                            >
                            <div class="input-group input-group--no-append">
                                <div
                                    class="input-group__prepend input-group__prepend--icon-primary"
                                >
                                    <i class="icon-lock"></i>
                                </div>
                                <div class="input-group__main">
                                    <input
                                        id="password-confirm"
                                        type="password"
                                        class="form__control"
                                        name="password_confirmation"
                                        v-model="form.password_confirmation"
                                        @blur="
                                            $v.form.password_confirmation.$touch()
                                        "
                                        placeholder="Konfirmasi password"
                                        required
                                        autocomplete="new-password"
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
                                <span v-if="errors.password_confirmation">{{
                                    errors.password_confirmation[0]
                                }}</span>
                                <span
                                    v-if="$v.form.password_confirmation.$error"
                                    >Must be equal with Password field!</span
                                >
                            </span>
                        </div>

                        <button
                            type="submit"
                            class="btn btn--primary btn--block btn--shadow mt3"
                            :disabled="$v.$invalid || processing"
                        >
                            <span v-if="!processing">Reset Password</span>
                            <span v-else>Memproses</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { redirectIfAuthenticatedMixin } from "~/plugins/mixins/redirect-authenticated";
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";

export default {
    mixins: [redirectIfAuthenticatedMixin],
    head: {
        title: "Update Password",
        meta: [
            {
                hid: "description",
                name: "description",
                content: "Halaman update password",
            },
        ],
    },
    data() {
        return {
            form: {
                token: this.$route.params.token,
                email: this.$route.query.email,
                password: "",
                password_confirmation: "",
            },
            sent: false,
            message: "",
            processing: false,
        };
    },
    validations: {
        form: {
            email: { required, email },
            password: { required, minLength: minLength(8) },
            password_confirmation: {
                required,
                sameAsPassword: sameAs("password"),
            },
        },
    },
    methods: {
        update() {
            this.processing = true;
            this.message = "";

            this.$axios
                .post("/update-password", this.form)
                .then((res) => {
                    this.message = res.data.message;
                    this.sent = true;
                })
                .catch((err) => {
                    console.log(err.response);
                    this.message = err.response.data.message;
                })
                .finally(() => {
                    this.processing = false;
                });
        },
    },
};
</script>
