<template>
    <div id="myo__educations" class="card">
        <div class="card__header">
            <div class="card__header-left">
                <div class="card__header-icon">
                    <i class="icon-document"></i>
                </div>
                <h2 class="card__header-title">Pendidikan</h2>
            </div>
            <div class="card__header-right">
                <a
                    href="#"
                    class="card__add modal-trigger"
                    @click.prevent="blankModalForm"
                    ><i class="icon-plus"></i> Tambah</a
                >
            </div>
        </div>
        <div class="card__body card__body--pad-left">
            <ul class="progress-list">
                <li v-for="(edu, index) in user_data.educations" :key="index">
                    <h4 class="progress-list__title">{{ edu.institution }}</h4>
                    <div class="progress-list__sub-title">
                        {{ edu.degree.name }} - {{ edu.field_of_study.name
                        }}<br />
                        {{ edu.city.name }}, {{ edu.province.name }}
                    </div>
                    <div class="progress-list__info">
                        <div v-if="edu.more_info.length > 250">
                            <div
                                class="el-short-long pre-line"
                                :class="{ full: is_full[index] }"
                            >
                                {{ edu.more_info }}
                            </div>

                            <a
                                class="el-short-long-toggle-full edu"
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
                        <span v-else class="pre-line">{{ edu.more_info }}</span>
                    </div>
                    <div class="progress-list__footer">
                        {{ getDate(edu.start_time) }} -
                        {{ getDate(edu.end_time, edu.still_studying) }}
                    </div>
                    <div class="progress-list__actions">
                        <a href="#" @click.prevent="deleteEdu(edu)" class="mr-2"
                            ><i class="icon-delete"></i> Hapus</a
                        >
                        <a href="#" @click.prevent="fillModalForm(edu)"
                            ><i class="icon-edit"></i> Edit</a
                        >
                    </div>
                </li>
            </ul>
        </div>

        <Modal title="Pendidikan" name="myo__education-modal" :footer="true">
            <template v-slot:body>
                <div class="form__group">
                    <label class="form__label" for="institution"
                        >Institusi</label
                    >
                    <input
                        type="text"
                        class="form__control"
                        name="institution"
                        v-model="form.institution"
                        @blur="$v.form.institution.$touch()"
                    />
                    <span
                        v-if="
                            errors.institution || $v.form.institution.$invalid
                        "
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.institution">{{
                            errors.institution[0]
                        }}</span>
                        <span v-if="$v.form.institution.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
                <div class="form__group">
                    <label class="form__label" for="province_id"
                        >Provinsi</label
                    >
                    <client-only>
                        <v-select
                            label="name"
                            :options="provinces"
                            v-model="selected_province"
                            @input="provinceChange"
                            placeholder="Pilih Provinsi"
                        ></v-select>
                    </client-only>
                    <span
                        v-if="
                            errors.province_id || $v.form.province_id.$invalid
                        "
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.province_id">{{
                            errors.province_id[0]
                        }}</span>
                        <span v-if="$v.form.province_id.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
                <div class="form__group">
                    <label class="form__label" for="city_id"
                        >Kabupaten / Kota</label
                    >
                    <client-only>
                        <v-select
                            label="name"
                            :options="cities"
                            v-model="selected_city"
                            @input="cityChange"
                            placeholder="Pilih Kab/Kota"
                        ></v-select>
                    </client-only>
                    <span
                        v-if="errors.city_id || $v.form.city_id.$invalid"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.city_id">{{
                            errors.city_id[0]
                        }}</span>
                        <span v-if="$v.form.city_id.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
                <div class="form__group">
                    <label class="form__label" for="education_degree_id"
                        >Gelar</label
                    >
                    <client-only>
                        <v-select
                            label="name"
                            :options="education_degrees"
                            v-model="selected_degree"
                            @input="degreeChange"
                            placeholder="-- Pilih --"
                        ></v-select>
                    </client-only>
                    <span
                        v-if="
                            errors.education_degree_id ||
                            $v.form.education_degree_id.$invalid
                        "
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.education_degree_id">{{
                            errors.education_degree_id[0]
                        }}</span>
                        <span v-if="$v.form.education_degree_id.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
                <div class="form__group">
                    <label class="form__label" for="education_field_id"
                        >Bidang Studi</label
                    >
                    <client-only>
                        <v-select
                            label="name"
                            :options="education_fields"
                            v-model="selected_field"
                            @input="fieldChange"
                            placeholder="-- Pilih --"
                        ></v-select>
                    </client-only>
                    <span
                        v-if="
                            errors.education_field_id ||
                            $v.form.education_field_id.$invalid
                        "
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.education_field_id">{{
                            errors.education_field_id[0]
                        }}</span>
                        <span v-if="$v.form.education_field_id.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
                <div class="form__group">
                    <label class="form__label" for="gpa">GPA</label>
                    <input
                        type="number"
                        step="0.01"
                        class="form__control"
                        name="gpa"
                        v-model="form.gpa"
                        @blur="$v.form.gpa.$touch()"
                    />
                    <span
                        v-if="errors.gpa || $v.form.gpa.$invalid"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.gpa">{{ errors.gpa[0] }}</span>
                        <span v-if="$v.form.gpa.$error">Required field!</span>
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
                <div class="form__group">
                    <label class="form__label" for="start_year"
                        >Tahun Mulai</label
                    >
                    <input
                        type="numeric"
                        class="form__control"
                        name="start_year"
                        id="start_year"
                        v-model="form.start_year"
                        @blur="$v.form.start_year.$touch()"
                    />
                    <span
                        v-if="errors.start_year || $v.form.start_year.$invalid"
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
                <div class="form__group">
                    <label class="form__label" for="still_studying"
                        >Masih Bersekolah Disini</label
                    >
                    <label class="cb-container"
                        >Ya
                        <input
                            type="checkbox"
                            name="still_studying"
                            v-model="form.still_studying"
                        />
                        <span class="checkmark"></span>
                    </label>
                    <span
                        v-if="
                            errors.still_studying ||
                            $v.form.still_studying.$invalid
                        "
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.still_studying">{{
                            errors.still_studying[0]
                        }}</span>
                        <span v-if="$v.form.still_studying.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
                <div v-if="!form.still_studying" class="form__group">
                    <label class="form__label" for="end_year"
                        >Tahun Berakhir</label
                    >
                    <input
                        type="numeric"
                        class="form__control"
                        name="end_year"
                        id="end_year"
                        v-model="form.end_year"
                        @blur="$v.form.end_year.$touch()"
                    />
                    <span
                        v-if="errors.end_year || $v.form.end_year.$invalid"
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
            </template>
            <template v-slot:footer>
                <div class="flex justify-end">
                    <ModalCloseButton target="myo__education-modal" />

                    <button
                        type="button"
                        @click="save('myo__education-modal')"
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
import AddressMixin from "~/plugins/mixins/address";
import Modal from "~/components/Share/Modal/Modal";
import ModalTrigger from "~/components/Share/Modal/ModalTrigger";
import ModalCloseButton from "~/components/Share/Modal/ModalCloseButton";

export default {
    props: {
        user_data: Object,
        education_degrees: Array,
        education_fields: Array,
    },
    mixins: ["AddressMixin"],
    components: {
        Modal,
        ModalTrigger,
        ModalCloseButton,
    },
    data() {
        let is_full = [];
        this.user_data.experiences.forEach((exp) => {
            is_full.push(false);
        });

        return {
            saving: false,
            provinces: [],
            cities: [],
            selected_degree: null,
            selected_field: null,
            selected_province: null,
            selected_city: null,
            form_mode: "add", // add / edit
            form: {
                id: 0,
                institution: "",
                province_id: "",
                city_id: "",
                education_degree_id: "",
                education_field_id: "",
                gpa: "",
                start_year: "",
                end_year: "",
                still_studying: false,
                more_info: "",
            },
            is_full: is_full,
        };
    },
    validations: {
        form: {
            id: { required },
            institution: { required },
            province_id: { required },
            city_id: { required },
            education_degree_id: { required },
            education_field_id: { required },
            gpa: { required },
            start_year: { required },
            end_year: {
                required: requiredIf(function () {
                    return !this.form.still_studying;
                }),
            },
            still_studying: { required },
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
            });
        },
        fillModalForm(edu) {
            this.form_mode = "edit";
            this.form.id = edu.id;
            this.form.institution = edu.institution;
            this.form.province_id = edu.province.id;
            this.form.city_id = edu.city.id;
            this.form.education_degree_id = edu.degree.id;
            this.form.education_field_id = edu.field_of_study.id;
            this.form.gpa = edu.gpa;
            this.form.start_year = edu.start_year;
            this.form.end_year = edu.end_year;
            this.form.still_studying = edu.still_studying;
            this.form.more_info = edu.more_info;

            this.selected_degree = {
                id: edu.degree.id,
                name: edu.degree.name,
            };

            this.selected_field = {
                id: edu.field_of_study.id,
                name: edu.field_of_study.name,
            };

            this.selected_province = {
                id: edu.province.id,
                name: edu.province.name,
            };

            this.selected_city = {
                id: edu.city.id,
                name: edu.city.name,
            };

            this.getProvinces();
            this.getCities(edu.province.id);

            this.$bus.$emit("show-modal", "myo__education-modal");
        },
        blankModalForm() {
            this.form_mode = "add";
            this.form.id = 0;
            this.form.institution = "";
            this.form.province_id = "";
            this.form.city_id = "";
            this.form.education_degree_id = "";
            this.form.field_of_study = "";
            this.form.gpa = "";
            this.form.start_year = "";
            this.form.end_year = "";
            this.form.still_studying = false;
            this.form.more_info = "";

            this.selected_field = null;
            this.selected_degree = null;
            this.selected_province = null;
            this.selected_city = null;
            this.getProvinces();
            this.is_full.push(false);

            this.$bus.$emit("show-modal", "myo__education-modal");
        },
        save(modal) {
            this.saving = true;

            this.form.end_year = this.form.still_studying
                ? null
                : this.form.end_year;

            if (this.form_mode == "edit") {
                this.$axios
                    .$patch(`account/educations/${this.form.id}`, this.form)
                    .then((res) => {
                        let user = res.data;
                        this.$emit("updated", user);
                        this.swalToast(res.status, res.message);
                        this.$bus.$emit("close-modal", "myo__education-modal");
                    })
                    .catch((err) => {
                        this.axiosError(err);
                    })
                    .finally(() => {
                        this.saving = false;
                    });
            } else {
                this.$axios
                    .$post(`account/educations`, this.form)
                    .then((res) => {
                        let user = res.data;
                        this.$emit("updated", user);
                        this.swalToast(res.status, res.message);
                        this.$bus.$emit("close-modal", "myo__education-modal");
                    })
                    .catch((err) => {
                        this.axiosError(err);
                    })
                    .finally(() => {
                        this.saving = false;
                    });
            }
        },
        deleteEdu(edu) {
            this.$swal({
                title: "Anda yakin?",
                text: "Hapus pendidikan?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya, hapus!",
            }).then((result) => {
                if (result.value) {
                    this.$axios
                        .$delete(`account/educations/${edu.id}`)
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
        fieldChange(value) {
            this.form.education_field_id = value.id;
        },
        degreeChange(value) {
            this.form.education_degree_id = value.id;
        },
        provinceChange(value) {
            this.form.province_id = value.id;
            this.getCities(value.id);
            this.selected_city = { id: "", name: "Please select" };
        },
        cityChange(value) {
            this.form.city_id = value.id;
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
.el-short-long-toggle-full.edu {
    margin-top: -18px;
}
</style>
