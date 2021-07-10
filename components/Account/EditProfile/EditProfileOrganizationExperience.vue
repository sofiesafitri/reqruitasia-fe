<template>
    <div id="myo__organization-experiences" class="card">
        <div class="card__header">
            <div class="card__header-left">
                <div class="card__header-icon">
                    <i class="icon-work"></i>
                </div>
                <h2 class="card__header-title">
                    Pengalaman Organisasi & Relawan
                </h2>
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
                <li
                    v-for="(exp, index) in user_data.organization_experiences"
                    :key="index"
                >
                    <h4 class="progress-list__title">{{ exp.name }}</h4>
                    <div class="progress-list__sub-title">
                        {{ exp.position }}
                    </div>
                    <div class="progress-list__info pre-line">
                        <div v-if="exp.more_info.length > 250">
                            <div
                                class="el-short-long"
                                :class="{ full: is_full[index] }"
                            >
                                {{ exp.more_info }}
                            </div>

                            <a
                                class="el-short-long-toggle-full exp"
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
                        <span v-else>{{ exp.more_info }}</span>
                    </div>
                    <div class="progress-list__footer">
                        {{ getDate(exp.start_time) }} -
                        {{ getDate(exp.end_time, exp.still_involved) }}
                    </div>
                    <div class="progress-list__actions">
                        <a
                            href="#"
                            @click.prevent="deleteExp(exp, index)"
                            class="mr-2"
                            ><i class="icon-delete"></i> Hapus</a
                        >
                        <a href="#" @click.prevent="fillModalForm(exp)"
                            ><i class="icon-edit"></i> Edit</a
                        >
                    </div>
                </li>
            </ul>
        </div>

        <Modal
            title="Pengalaman Organisasi & Relawan"
            name="myo__org-experience-modal"
            :footer="true"
        >
            <template v-slot:body>
                <div class="form__group">
                    <label class="form__label" for="company"
                        >Nama Organisasi atau Kegiatan</label
                    >
                    <input
                        type="text"
                        class="form__control"
                        name="name"
                        v-model="form.name"
                        @blur="$v.form.name.$touch()"
                    />
                    <span
                        v-if="errors.name || $v.form.name.$invalid"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.name">{{ errors.name[0] }}</span>
                        <span v-if="$v.form.name.$error">Required field!</span>
                    </span>
                </div>
                <div class="form__group">
                    <label class="form__label" for="position">Posisi</label>
                    <input
                        type="text"
                        class="form__control"
                        name="position"
                        v-model="form.position"
                        @blur="$v.form.position.$touch()"
                    />
                    <span
                        v-if="errors.position || $v.form.position.$invalid"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.position">{{
                            errors.position[0]
                        }}</span>
                        <span v-if="$v.form.position.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
                <div class="form__group">
                    <label class="form__label" for="more_info"
                        >Info Tambahan</label
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
                <div class="clearfix mxn2 mb-3">
                    <div class="col col-6 px2">
                        <div class="form__group">
                            <label class="form__label" for="start_month"
                                >Bulan Mulai</label
                            >
                            <client-only>
                                <v-select
                                    label="text"
                                    :options="months_list"
                                    v-model="selected_start_month"
                                    @input="startMonthChange"
                                    placeholder="Pilih Bulan"
                                ></v-select>
                            </client-only>
                            <span
                                v-if="
                                    errors.start_month ||
                                    $v.form.start_month.$invalid
                                "
                                class="invalid-feedback"
                                role="alert"
                            >
                                <span v-if="errors.start_month">{{
                                    errors.start_month[0]
                                }}</span>
                                <span v-if="$v.form.start_month.$error"
                                    >Required field!</span
                                >
                            </span>
                        </div>
                    </div>
                    <div class="col col-6 px2">
                        <div class="form__group">
                            <label class="form__label" for="start_year"
                                >Tahun Mulai</label
                            >
                            <input
                                type="number"
                                class="form__control"
                                name="start_year"
                                v-model="form.start_year"
                                @blur="$v.form.start_year.$touch()"
                            />
                            <span
                                v-if="
                                    errors.start_year ||
                                    $v.form.start_year.$invalid
                                "
                                class="invalid-feedback"
                                role="alert"
                            >
                                <span v-if="errors.start_year">{{
                                    errors.start_year[0]
                                }}</span>
                                <span v-if="$v.form.start_year.$error"
                                    >Required field!</span
                                >
                            </span>
                        </div>
                    </div>
                </div>
                <div class="form__group">
                    <label class="form__label" for="still_involved"
                        >Masih Terlibat Disini</label
                    >
                    <label class="cb-container"
                        >Ya
                        <input
                            type="checkbox"
                            name="still_involved"
                            v-model="form.still_involved"
                        />
                        <span class="checkmark"></span>
                    </label>
                    <span
                        v-if="
                            errors.still_involved ||
                            $v.form.still_involved.$invalid
                        "
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.still_involved">{{
                            errors.still_involved[0]
                        }}</span>
                        <span v-if="$v.form.still_involved.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
                <div v-if="!form.still_involved" class="clearfix mxn2 mb-3">
                    <div class="col col-6 px2">
                        <div class="form__group">
                            <label class="form__label" for="end_month"
                                >Bulan Berakhir</label
                            >
                            <client-only>
                                <v-select
                                    label="text"
                                    :options="months_list"
                                    v-model="selected_end_month"
                                    @input="endMonthChange"
                                    placeholder="Pilih Bulan"
                                ></v-select>
                            </client-only>
                            <span
                                v-if="
                                    errors.end_month ||
                                    $v.form.end_month.$invalid
                                "
                                class="invalid-feedback"
                                role="alert"
                            >
                                <span v-if="errors.end_month">{{
                                    errors.end_month[0]
                                }}</span>
                                <span v-if="$v.form.end_month.$error"
                                    >Required field!</span
                                >
                            </span>
                        </div>
                    </div>
                    <div class="col col-6 px2">
                        <div class="form__group">
                            <label class="form__label" for="end_year"
                                >Tahun Berakhir</label
                            >
                            <input
                                type="number"
                                class="form__control"
                                name="end_year"
                                v-model="form.end_year"
                                @blur="$v.form.end_year.$touch()"
                            />
                            <span
                                v-if="
                                    errors.end_year || $v.form.end_year.$invalid
                                "
                                class="invalid-feedback"
                                role="alert"
                            >
                                <span v-if="errors.end_year">{{
                                    errors.end_year[0]
                                }}</span>
                                <span v-if="$v.form.end_year.$error"
                                    >Required field!</span
                                >
                            </span>
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:footer>
                <div class="flex justify-end">
                    <ModalCloseButton target="myo__org-experience-modal" />
                    <button
                        type="button"
                        @click="save('myo__org-experience-modal')"
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
import { required, requiredIf } from "vuelidate/lib/validators";
import MonthsMixin from "~/plugins/mixins/months";
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
    mixins: ["MonthsMixin"],
    components: {
        Modal,
        ModalTrigger,
        ModalCloseButton,
    },
    data() {
        let is_full = [];
        this.user_data.organization_experiences.forEach((exp) => {
            is_full.push(false);
        });

        return {
            saving: false,
            form_mode: "add", // add / edit
            selected_start_month: null,
            selected_end_month: null,
            form: {
                id: 0,
                name: "",
                position: "",
                start_month: "",
                start_year: "",
                end_month: "",
                end_year: "",
                still_involved: false,
                more_info: "",
            },
            is_full: is_full,
        };
    },
    validations: {
        form: {
            id: { required },
            name: { required },
            position: { required },
            start_month: { required },
            start_year: { required },
            end_month: {
                required: requiredIf(function () {
                    return !this.form.still_involved;
                }),
            },
            end_year: {
                required: requiredIf(function () {
                    return !this.form.still_involved;
                }),
            },
            still_involved: { required },
            more_info: { required },
        },
    },
    methods: {
        getDate(date, still_progress = false) {
            if (date === null || still_progress) {
                return "Sekarang";
            }

            var newDate = new Date(date);
            return newDate.toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
            });
        },
        fillModalForm(exp) {
            this.form_mode = "edit";
            this.form.id = exp.id;
            this.form.name = exp.name;
            this.form.position = exp.position;
            this.form.start_month = exp.start_month;
            this.form.start_year = exp.start_year;
            this.form.end_month = exp.end_month;
            this.form.end_year = exp.end_year;
            this.form.still_involved = exp.still_involved;
            this.form.more_info = exp.more_info;

            this.selected_start_month = this.months_list[
                parseInt(exp.start_month) - 1
            ];
            this.selected_end_month = this.months_list[
                parseInt(exp.end_month) - 1
            ];

            this.$bus.$emit("show-modal", "myo__org-experience-modal");
        },
        blankModalForm() {
            this.form_mode = "add";
            this.form.id = 0;
            this.form.name = "";
            this.form.position = "";
            this.form.start_month = "";
            this.form.start_year = "";
            this.form.end_month = "";
            this.form.end_year = "";
            this.form.still_involved = false;
            this.form.more_info = "";
            this.is_full.push(false);
            this.$bus.$emit("show-modal", "myo__org-experience-modal");
        },
        save(modal) {
            // console.log(this.form);
            this.saving = true;

            this.form.end_month = this.form.still_involved
                ? null
                : this.form.end_month;
            this.form.end_year = this.form.still_involved
                ? null
                : this.form.end_year;

            if (this.form_mode == "edit") {
                this.$axios
                    .$patch(
                        `account/organization-experiences/${this.form.id}`,
                        this.form
                    )
                    .then((res) => {
                        let user = res.data;
                        this.resetMonth();
                        this.$emit("updated", user);
                        this.swalToast(res.status, res.message);
                        this.$bus.$emit(
                            "close-modal",
                            "myo__org-experience-modal"
                        );
                    })
                    .catch((err) => {
                        this.axiosError(err);
                    })
                    .finally(() => {
                        this.saving = false;
                    });
            } else {
                this.$axios
                    .$post(`account/organization-experiences`, this.form)
                    .then((res) => {
                        let user = res.data;
                        this.resetMonth();
                        this.$emit("updated", user);
                        this.swalToast(res.status, res.message);
                        this.$bus.$emit(
                            "close-modal",
                            "myo__org-experience-modal"
                        );
                    })
                    .catch((err) => {
                        this.axiosError(err);
                    })
                    .finally(() => {
                        this.saving = false;
                    });
            }
        },
        deleteExp(exp, index) {
            this.$swal({
                title: "Anda yakin?",
                text: "Hapus pengalaman organisasi?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya, hapus!",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$axios
                        .$delete(`account/organization-experiences/${exp.id}`)
                        .then((res) => {
                            let user = res.data;
                            this.$emit("updated", user);
                        })
                        .catch((err) => {
                            this.axiosError(err);
                        });
                }
            });
        },
        resetMonth() {
            this.selected_start_month = null;
            this.selected_end_month = null;
        },
        startMonthChange(value) {
            this.form.start_month = value.number;
        },
        endMonthChange(value) {
            this.form.end_month = value.number;
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
