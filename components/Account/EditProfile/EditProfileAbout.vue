<template>
    <div id="myo__about" class="card card--over-hide">
        <div class="card__header">
            <div class="card__header-left">
                <div class="card__header-icon">
                    <i class="icon-profile"></i>
                </div>
                <h2 class="card__header-title">Tentang Saya</h2>
            </div>
            <div class="card__header-right">
                <ModalTrigger
                    type="link"
                    class_names="card__edit modal-trigger"
                    target="myo__about-modal"
                >
                    <template v-slot:content>
                        <i class="icon-edit"></i> Edit
                    </template>
                </ModalTrigger>
            </div>
        </div>
        <div class="card__body card__body--pad-left pre-line">
            <div class="el-short-long" :class="{ full: full }">
                {{ user_data.about }}
            </div>
            <template v-if="user_data.about != ''">
                <a
                    class="el-short-long-toggle-full"
                    v-if="!full"
                    href="#"
                    @click.prevent="full = true"
                    >... See more</a
                >
                <a
                    class="el-short-long-toggle-less"
                    v-else
                    href="#"
                    @click.prevent="full = false"
                    >See less</a
                >
            </template>

            <div class="clearfix"></div>
        </div>

        <Modal title="Tentang Saya" name="myo__about-modal" :footer="true">
            <template v-slot:body>
                <div class="form__group">
                    <label class="form__label" for="about">Tentang Saya</label>
                    <textarea
                        class="form__control"
                        name="about"
                        v-model="form.about"
                        @blur="$v.form.about.$touch()"
                        rows="5"
                    />
                    <span
                        v-if="errors.about || $v.form.about.$invalid"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.about">{{ errors.about[0] }}</span>
                        <span v-if="$v.form.about.$error">Required field!</span>
                    </span>
                </div>
            </template>
            <template v-slot:footer>
                <div class="flex justify-end">
                    <ModalCloseButton target="myo__about-modal" />
                    <button
                        type="button"
                        @click="save('myo__about-modal')"
                        class="btn btn--primary"
                        :disabled="$v.$invalid || saving"
                    >
                        <span v-if="!saving">Simpan</span>
                        <span v-else>Memproses</span>
                    </button>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import Modal from "~/components/Share/Modal/Modal";
import ModalTrigger from "~/components/Share/Modal/ModalTrigger";
import ModalCloseButton from "~/components/Share/Modal/ModalCloseButton";

export default {
    props: {
        user_data: {
            type: Object,
            required: true,
        },
    },
    components: {
        Modal,
        ModalTrigger,
        ModalCloseButton,
    },
    data() {
        return {
            full: false,
            saving: false,
            form: {
                about: this.user_data.about,
            },
        };
    },
    validations: {
        form: {
            about: { required },
        },
    },
    methods: {
        save(modal) {
            this.saving = true;

            this.$axios
                .$post(`account/update-about`, this.form)
                .then((res) => {
                    let user = res.data;
                    this.$emit("updated", user);
                    this.swalToast(res.status, res.message);
                    this.$bus.$emit("close-modal", modal);
                })
                .catch((err) => {
                    this.axiosError(err);
                })
                .finally(() => {
                    this.saving = false;
                });
        },
    },
};
</script>