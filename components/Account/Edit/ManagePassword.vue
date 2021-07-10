<template>
    <div v-if="active_menu == 'manage-password'" class="card">
        <div class="card__header">
            <div class="card__header-left">
                <h2 class="card__header-title">Ganti Password</h2>
            </div>
        </div>
        <div class="card__body">
            <form @submit.prevent="save" class="form">
                <div class="form__group">
                    <label class="form__label" for="new-password"
                        >Password Baru</label
                    >
                    <input
                        type="password"
                        class="form__control"
                        name="new-password"
                        id="new-password"
                        autocomplete="new-password"
                        v-model="form.new_password"
                        @blur="$v.form.new_password.$touch()"
                        rows="5"
                    />
                    <span
                        v-if="
                            errors.new_password || $v.form.new_password.$invalid
                        "
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.new_password">{{
                            errors.new_password[0]
                        }}</span>
                        <span v-if="$v.form.new_password.$error"
                            >Required field and minimum 8 characters!</span
                        >
                    </span>
                </div>
                <div class="form__group">
                    <label class="form__label" for="new-password-confirmation"
                        >Konfirmasi Password Baru</label
                    >
                    <input
                        type="password"
                        class="form__control"
                        name="new-password-confirmation"
                        id="new-password-confirmation"
                        autocomplete="new-password-confirmation"
                        v-model="form.new_password_confirmation"
                        @blur="$v.form.new_password_confirmation.$touch()"
                        rows="5"
                    />
                    <span
                        v-if="
                            errors.new_password_confirmation ||
                            $v.form.new_password_confirmation.$invalid
                        "
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.new_password_confirmation">{{
                            errors.new_password_confirmation[0]
                        }}</span>
                        <span v-if="$v.form.new_password_confirmation.$error"
                            >Required field and must equal to new password
                            field!</span
                        >
                    </span>
                </div>

                <button
                    type="submit"
                    class="btn btn--primary"
                    :disabled="$v.$invalid || saving"
                >
                    <span v-if="!saving">Simpan</span>
                    <span v-else>Memproses</span>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { required, sameAs, minLength } from "vuelidate/lib/validators";

export default {
    props: {
        active_menu: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            saving: false,
            form: {
                new_password: "",
                new_password_confirmation: "",
            },
        };
    },
    validations: {
        form: {
            new_password: { required, minLength: minLength(8) },
            new_password_confirmation: {
                required,
                sameAsPassword: sameAs("new_password"),
            },
        },
    },
    methods: {
        save() {
            this.saving = true;

            this.$axios
                .$post(`account/update-password`, this.form)
                .then((res) => {
                    this.form.new_password = "";
                    this.form.new_password_confirmation = "";
                    this.$v.$reset();
                    this.$emit("updated", res.data);
                    this.swalToast(res.status, res.message);
                })
                .catch((err) => {
                    console.log(err.response);
                    if (err.response.status != 422) {
                        if (err.response.data.message != undefined) {
                            this.swalWrong(err.response.data.message);
                        } else {
                            this.swalWrong();
                        }
                    }
                })
                .finally(() => {
                    this.saving = false;
                });
        },
    },
};
</script>