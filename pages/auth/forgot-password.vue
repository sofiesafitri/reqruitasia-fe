<template>
    <div class="container">
        <div v-if="message != ''" class="alert" :class="alert_class">
            {{ message }}
        </div>
        <div v-else class="auth-page auth-page--forgot-password">
            <div class="auth-form auth-form--compact">
                <div class="auth-form__wrapper">
                    <nuxt-link to="/">
                        <Logo center class="mb3" />
                    </nuxt-link>

                    <div class="auth-form__cta">
                        Masukkan email Anda dibawah ini.
                    </div>

                    <form @submit.prevent="send" class="form">
                        <div class="form__group">
                            <label class="sr-only" for="email"
                                >E-Mail Address</label
                            >
                            <div class="input-group input-group--no-append">
                                <div
                                    class="input-group__prepend input-group__prepend--icon-primary"
                                >
                                    <i class="icon-profile"></i>
                                </div>
                                <div class="input-group__main">
                                    <input
                                        id="email"
                                        type="email"
                                        class="form__control"
                                        name="email"
                                        v-model="form.email"
                                        @blur="$v.form.email.$touch()"
                                        placeholder="Masukkan email"
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

                        <button
                            type="submit"
                            class="btn btn--primary btn--block btn--shadow mt3 mb2"
                            :disabled="$v.$invalid || processing"
                        >
                            <span v-if="!processing"
                                >Kirim Link Reset Password</span
                            >
                            <span v-else>Memproses</span>
                        </button>

                        <nuxt-link
                            to="/auth/login"
                            title="Lupa password"
                            class="auth-form-text"
                            >Ke halaman login</nuxt-link
                        >
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { redirectIfAuthenticatedMixin } from "~/plugins/mixins/redirect-authenticated";
import { required, email } from "vuelidate/lib/validators";
import Logo from "~/components/Share/Logo";

export default {
    layout: "auth",
    mixins: [redirectIfAuthenticatedMixin],
    head: {
        title: "Lupa Password",
        meta: [
            {
                hid: "description",
                name: "description",
                content: "Halaman lupa password",
            },
        ],
    },
    components: {
        Logo,
    },
    data() {
        return {
            sent: false,
            message: "",
            alert_class: "",
            form: {
                email: "",
            },
            processing: false,
        };
    },
    validations: {
        form: {
            email: {
                required,
                email,
            },
        },
    },
    methods: {
        async send() {
            this.message = "";
            this.processing = true;

            await this.$axios
                .$post("/send-reset-password-link", this.form)
                .then((res) => {
                    console.log(res);
                    this.sent = true;
                    this.message = res.message;
                    this.alert_class = "alert--success";
                })
                .catch((err) => {
                    console.log(err.response);
                    this.message = err.response.data.message;
                    this.alert_class = "alert--error";
                })
                .finally(() => {
                    this.processing = false;
                });
        },
    },
};
</script>