<template>
    <div id="myo__resume" class="card">
        <div class="card__header">
            <div class="card__header-left">
                <div class="card__header-icon">
                    <i class="icon-document"></i>
                </div>
                <h2 class="card__header-title">Resume</h2>
            </div>
            <div class="card__header-right">
                <ModalTrigger
                    type="link"
                    class_name="card__edit modal-trigger"
                    target="myo__resume-modal"
                >
                    <template v-slot:content>
                        <i class="icon-edit"></i> Edit
                    </template>
                </ModalTrigger>
            </div>
        </div>
        <div class="card__body card__body--pad-left">
            <object
                v-if="resume_url != ''"
                :data="resume_url"
                type="application/pdf"
                width="100%"
                height="650"
            >
                <a :href="resume_url" title="Lihat resume" target="_blank"
                    >Lihat resume</a
                >
            </object>
            <div v-else>Tidak ada resume</div>
        </div>

        <Modal title="Resume" name="myo__resume-modal" footer>
            <template v-slot:body>
                <div class="form__group">
                    <label class="form__label" for="resume">File Resume</label>
                    <input
                        type="file"
                        name="resume"
                        id="resume"
                        ref="resume"
                        @change="fileSelected"
                    />
                    <span
                        v-if="errors.resume || $v.form.resume.$invalid"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.resume">{{ errors.resume[0] }}</span>
                        <span v-if="$v.form.resume.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
            </template>
            <template v-slot:footer>
                <div class="flex justify-end">
                    <ModalCloseButton target="myo__resume-modal" />

                    <button
                        type="button"
                        @click="save('myo__resume-modal')"
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
            saving: false,
            form: {
                resume: "",
            },
            resume_url: this.user_data.resume.file_url,
        };
    },
    validations: {
        form: {
            resume: { required },
        },
    },
    methods: {
        fileSelected() {
            this.form.resume = this.$refs.resume.files[0];
        },
        save(modal) {
            this.saving = true;

            let formData = new FormData();
            formData.append("resume", this.form.resume);

            this.$axios
                .$post(`account/upload-resume`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    let user = res.data;
                    this.$emit("updated", user);
                    this.resume_url = user.resume.file_url;
                    this.swalToast(res.status, res.message);
                    this.$bus.$emit("close-modal", modal);
                    this.form.resume = "";
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