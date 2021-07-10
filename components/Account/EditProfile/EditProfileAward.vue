<template>
    <div id="myo__awards" class="card">
        <div class="card__header">
            <div class="card__header-left">
                <div class="card__header-icon">
                    <i class="icon-star"></i>
                </div>
                <h2 class="card__header-title">Penghargaan</h2>
            </div>
            <div class="card__header-right">
                <a
                    href="#"
                    class="card__add modal-trigger"
                    @click.prevent="blankModalForm"
                >
                    <i class="icon-plus"></i> Tambah
                </a>
            </div>
        </div>
        <div class="card__body card__body--pad-left">
            <ul class="progress-list">
                <li v-for="(award, index) in user_data.awards" :key="index">
                    <h4 class="progress-list__title">{{ award.title }}</h4>
                    <div class="progress-list__sub-title">
                        {{ award.description }}
                    </div>
                    <div class="progress-list__info pre-line">
                        <div v-if="award.more_info.length > 250">
                            <div
                                class="el-short-long"
                                :class="{ full: is_full[index] }"
                            >
                                {{ award.more_info }}
                            </div>

                            <a
                                class="el-short-long-toggle-full award"
                                v-if="!is_full[index]"
                                href="#"
                                @click.prevent="makeFull(index)"
                                >... See more</a
                            >
                            <a
                                class="el-short-long-toggle-less"
                                v-else
                                href="#"
                                @click.prevent="makeLess(index)"
                                >See less</a
                            >
                            <div class="clearfix"></div>
                        </div>
                        <span v-else>{{ award.more_info }}</span>
                    </div>
                    <div class="progress-list__footer">
                        Tahun {{ getYear(award.awarded_at) }}
                    </div>
                    <div class="progress-list__actions">
                        <a
                            href="#"
                            @click.prevent="deleteAward(award, index)"
                            class="mr-2"
                            ><i class="icon-delete"></i> Hapus</a
                        >
                        <a href="#" @click.prevent="fillModalForm(award)"
                            ><i class="icon-edit"></i> Edit</a
                        >
                    </div>
                </li>
            </ul>
        </div>

        <Modal title="Penghargaan" name="myo__award-modal" :footer="true">
            <template v-slot:body>
                <div class="form__group">
                    <label class="form__label" for="title"
                        >Judul Penghargaan</label
                    >
                    <input
                        type="text"
                        class="form__control"
                        name="title"
                        v-model="form.title"
                        @blur="$v.form.title.$touch()"
                    />
                    <span
                        v-if="errors.title || $v.form.title.$invalid"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.title">{{ errors.title[0] }}</span>
                        <span v-if="$v.form.title.$error">Required field!</span>
                    </span>
                </div>
                <div class="form__group">
                    <label class="form__label" for="description"
                        >Deskripsi</label
                    >
                    <input
                        type="text"
                        class="form__control"
                        name="description"
                        v-model="form.description"
                        @blur="$v.form.description.$touch()"
                    />
                    <span
                        v-if="
                            errors.description || $v.form.description.$invalid
                        "
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.description">{{
                            errors.description[0]
                        }}</span>
                        <span v-if="$v.form.description.$error"
                            >Required field!</span
                        >
                    </span>
                </div>

                <div class="form__group">
                    <label class="form__label" for="awarded_at">Tahun</label>
                    <client-only>
                        <v-select
                            label="label"
                            :options="year_list"
                            v-model="selected_awarded_at"
                            @input="AwardedAtChange"
                            placeholder="Pilih Tahun"
                            :clearable="false"
                        ></v-select>
                    </client-only>
                    <span
                        v-if="errors.awarded_at || $v.form.awarded_at.$invalid"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.awarded_at">{{
                            errors.awarded_at[0]
                        }}</span>
                        <span v-if="$v.form.awarded_at.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
                <div class="form__group">
                    <label class="form__label" for="more_info"
                        >Info Tambahan (opsional)</label
                    >
                    <textarea
                        class="form__control"
                        name="more_info"
                        v-model="form.more_info"
                        @blur="$v.form.more_info.$touch()"
                        rows="7"
                    />
                    <span
                        v-if="errors.more_info || $v.form.more_info.$invalid"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.more_info">{{
                            errors.more_info[0]
                        }}</span>
                        <span v-if="$v.form.more_info.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
            </template>
            <template v-slot:footer>
                <div class="flex justify-end">
                    <ModalCloseButton target="myo__award-modal" />
                    <button
                        type="button"
                        @click="save('myo__award-modal')"
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
        let is_full = [];
        this.user_data.awards.forEach((award) => {
            is_full.push(false);
        });

        var thisYear = new Date().getFullYear();
        var oldYear = thisYear - 60;
        var years = [];

        for (var i = thisYear; i >= oldYear; i--) {
            years.push({ value: i, label: i });
        }

        return {
            saving: false,
            form_mode: "add", // add / edit
            selected_awarded_at: null,
            year_list: years,
            form: {
                id: 0,
                title: "",
                description: "",
                awarded_at: "",
                more_info: "",
            },
            is_full: is_full,
        };
    },
    validations: {
        form: {
            id: { required },
            title: { required },
            description: { required },
            awarded_at: { required },
            more_info: { required },
        },
    },
    methods: {
        getYear(date) {
            var newDate = new Date(date);
            return newDate.toLocaleDateString("id-ID", {
                year: "numeric",
            });
        },
        fillModalForm(award) {
            this.form_mode = "edit";
            this.form.id = award.id;
            this.form.title = award.title;
            this.form.description = award.description;
            this.form.awarded_at = award.awarded_at;
            this.form.more_info = award.more_info;

            const awardedYear = this.getYear(award.awarded_at);
            const yearIndex = this.year_list.findIndex(
                (yr) => yr.value == awardedYear
            );

            this.selected_awarded_at = this.year_list[yearIndex];
            this.$bus.$emit("show-modal", "myo__award-modal");
        },
        blankModalForm() {
            this.form_mode = "add";
            this.form.id = 0;
            this.form.title = "";
            this.form.description = "";
            this.form.awarded_at = "";
            this.form.more_info = "";
            this.is_full.push(false);
            this.$bus.$emit("show-modal", "myo__award-modal");
        },
        save(modal) {
            this.saving = true;

            if (this.form_mode == "edit") {
                this.$axios
                    .$patch(`account/awards/${this.form.id}`, this.form)
                    .then((res) => {
                        const user = res.data;
                        this.resetYear();
                        this.$emit("updated", user);
                        this.swalToast(res.status, res.message);
                        this.$bus.$emit("close-modal", "myo__award-modal");
                    })
                    .catch((err) => {
                        this.axiosError(err);
                    })
                    .finally(() => {
                        this.saving = false;
                    });
            } else {
                this.$axios
                    .$post(`account/awards`, this.form)
                    .then((res) => {
                        let user = res.data;
                        this.resetYear();
                        this.$emit("updated", user);
                        this.swalToast(res.status, res.message);
                        this.$bus.$emit("close-modal", "myo__award-modal");
                    })
                    .catch((err) => {
                        this.axiosError(err);
                    })
                    .finally(() => {
                        this.saving = false;
                    });
            }
        },
        deleteAward(award, index) {
            this.$swal({
                title: "Anda yakin?",
                text: "Hapus penghargaan?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya, hapus!",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$axios
                        .$delete(`account/awards/${award.id}`)
                        .then((res) => {
                            let user = res.data;
                            this.swalToast(res.status, res.message);
                            this.$emit("updated", user);
                        })
                        .catch((err) => {
                            this.axiosError(err);
                        });
                }
            });
        },
        resetYear() {
            this.selected_awarded_at = null;
        },
        AwardedAtChange(value) {
            this.form.awarded_at = value.value;
        },
        makeFull(index) {
            this.$set(this.is_full, index, true);
        },
        makeLess(index) {
            this.$set(this.is_full, index, false);
        },
    },
};
</script>

<style lang="scss">
.el-short-long-toggle-full.exp {
    margin-top: -18px;
}
</style>