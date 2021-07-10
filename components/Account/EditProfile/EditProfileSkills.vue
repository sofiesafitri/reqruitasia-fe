<template>
    <div id="myo__skills" class="card">
        <div class="card__header">
            <div class="card__header-left">
                <div class="card__header-icon">
                    <i class="icon-star"></i>
                </div>
                <h2 class="card__header-title">Keahlian</h2>
            </div>
            <div class="card__header-right">
                <ModalTrigger
                    type="link"
                    class_names="card__edit modal-trigger"
                    target="myo__skills-modal"
                >
                    <template v-slot:content>
                        <i class="icon-edit"></i> Edit
                    </template>
                </ModalTrigger>
            </div>
        </div>
        <div class="card__body card__body--pad-left">
            <div class="flex flex-wrap">
                <div
                    v-for="(skill, index) in user_data.skills"
                    :key="index"
                    class="badge mr2"
                >
                    {{ skill.name }}
                </div>
            </div>
        </div>

        <Modal
            title="Keahlian"
            name="myo__skills-modal"
            :footer="true"
            :full_height="true"
        >
            <template v-slot:body>
                <div class="form__group">
                    <label>Tambah Keahlian</label>
                    <client-only>
                        <v-select
                            label="name"
                            :options="skill_options"
                            @search="searchSkills"
                            v-model="selected_skill"
                            @input="addSkill"
                            :clearable="false"
                            placeholder="Pilih / Cari..."
                        ></v-select>
                    </client-only>
                    <span
                        v-if="errors.skill_ids || $v.form.skill_ids.$invalid"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.skill_ids">{{
                            errors.skill_ids[0]
                        }}</span>
                        <span v-if="$v.form.skill_ids.$error"
                            >Required field!</span
                        >
                    </span>
                </div>

                <div class="mt-3 flex flex-wrap">
                    <div
                        v-for="(skill, index) in skills"
                        :key="index"
                        class="badge mr2 mb2"
                    >
                        <span>{{ skill.name }}</span>
                        <span
                            class="badge__icon"
                            @click="removeSkill(skill, index)"
                        >
                            <i class="icon-close-square"></i>
                        </span>
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="flex justify-end">
                    <ModalCloseButton target="myo__skills-modal" />

                    <button
                        type="button"
                        @click="save('myo__skills-modal')"
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
        pre_skill_options: {
            type: Array,
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
            skill_options: this.pre_skill_options,
            selected_skill: "",
            skills: [],
            form: {
                skill_ids: [],
            },
        };
    },
    validations: {
        form: {
            skill_ids: { required },
        },
    },
    created() {
        this.user_data.skills.forEach((skill) => {
            this.form.skill_ids.push(skill.id);
            this.skills.push(skill);
        });
    },
    methods: {
        save(modal) {
            this.saving = true;

            this.$axios
                .$post(`account/update-skills`, this.form)
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
        searchSkills(search, loading) {
            if (search === null || search === "") {
                return;
            }

            loading(true);

            this.$axios
                .$post(
                    `skills-search`,
                    {
                        keyword: escape(search),
                    },
                    { progress: false }
                )
                .then((res) => {
                    this.skill_options = res.data;
                })
                .catch((err) => {
                    this.axiosError(err);
                })
                .finally(() => {
                    loading(false);
                });
        },
        removeSkill(skill, index) {
            this.skills.splice(index, 1);
            this.form.skill_ids.splice(index, 1);
        },
        addSkill(value) {
            if (value === null || value === undefined || value === "") {
                return;
            }

            if (!this.form.skill_ids.includes(value.id)) {
                this.form.skill_ids.push(value.id);
                this.skills.push(value);
            }
        },
    },
};
</script>