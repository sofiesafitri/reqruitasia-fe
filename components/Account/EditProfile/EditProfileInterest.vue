<template>
    <div id="myo__interests" class="card">
        <div class="card__header">
            <div class="card__header-left">
                <div class="card__header-icon">
                    <i class="icon-heart"></i>
                </div>
                <h2 class="card__header-title">Minat Pekerjaan</h2>
            </div>
            <div class="card__header-right">
                <ModalTrigger
                    type="link"
                    class_names="card__edit modal-trigger"
                    target="myo__interest-modal"
                >
                    <template v-slot:content>
                        <i class="icon-edit"></i> Edit
                    </template>
                </ModalTrigger>
            </div>
        </div>
        <div class="card__body card__body--pad-left">
            <div v-if="user_data.interest != ''">
                <div class="clearfix mb2">
                    <div class="col col-12 md-col-4">
                        <h4>Bidang Minat</h4>
                    </div>
                    <div class="col col-12 md-col-8">
                        <div
                            v-for="(foi, i) in user_data.interest
                                .field_of_interests"
                            :key="i"
                        >
                            <div>{{ foi.jobfunction.name }}</div>
                            <ul class="check-list">
                                <li
                                    v-for="(role, index) in foi.jobroles"
                                    :key="index"
                                >
                                    {{ role.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="clearfix mb2">
                    <div class="col col-12 md-col-4">
                        <h4>Tipe Pekerjaan</h4>
                    </div>
                    <div class="col col-12 md-col-8">
                        <ul class="check-list">
                            <li
                                v-for="(job_type, i) in user_data.interest
                                    .job_types"
                                :key="i"
                            >
                                {{ job_type.name }}
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="clearfix mb2">
                    <div class="col col-12 md-col-4">
                        <h4>Gaji Sekarang</h4>
                    </div>
                    <div class="col col-12 md-col-8">
                        {{
                            user_data.interest.current_salary
                                | format_currency("id-ID", "IDR")
                        }}
                    </div>
                </div>

                <div class="clearfix mb2">
                    <div class="col col-12 md-col-4">
                        <h4>Ekspektasi Gaji</h4>
                    </div>
                    <div class="col col-12 md-col-8">
                        {{
                            user_data.interest.expected_salary
                                | format_currency("id-ID", "IDR")
                        }}
                    </div>
                </div>

                <div class="clearfix mb2">
                    <div class="col col-12 md-col-4">
                        <h4>Preferensi Kota Kerja</h4>
                    </div>
                    <div class="col col-12 md-col-8">
                        <ul class="check-list">
                            <li
                                v-for="(city, i) in user_data.interest.cities"
                                :key="i"
                            >
                                {{ city.name }}
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="clearfix mb2">
                    <div class="col col-12 md-col-4">
                        <h4>Bersedia Direlokasi</h4>
                    </div>
                    <div class="col col-12 md-col-8">
                        {{ user_data.interest.relocated ? "Ya" : "Tidak" }}
                    </div>
                </div>
            </div>
        </div>

        <Modal
            title="Minat Pekerjaan"
            name="myo__interest-modal"
            :footer="true"
            :full_height="true"
        >
            <template v-slot:body>
                <Tab>
                    <template v-slot:nav>
                        <TabNav
                            title="Minat"
                            target="field-of-interest"
                            active
                        />
                        <TabNav title="Preferensi" target="preferensi" />
                    </template>
                    <template v-slot:content>
                        <TabContent name="field-of-interest" active>
                            <template v-slot:content>
                                <div v-for="(foi, i) in foi_form" :key="i">
                                    <div class="form__group clearfix">
                                        <div class="col col-11">
                                            <label>Pekerjaan</label>
                                            <client-only>
                                                <v-select
                                                    label="name"
                                                    :options="jobfunctions"
                                                    placeholder="Cari Bidang Pekerjaan"
                                                    v-model="
                                                        selected_jobfunctions[i]
                                                    "
                                                    @input="
                                                        (jobfunction) =>
                                                            jobFunctionChange(
                                                                i,
                                                                jobfunction
                                                            )
                                                    "
                                                ></v-select>
                                            </client-only>
                                        </div>
                                        <div class="col col-1 flex justify-end">
                                            <a
                                                href="#"
                                                @click.prevent="removeFoi(i)"
                                                class="text-danger"
                                                title="Hapus"
                                            >
                                                <i class="icon-delete"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="form__group">
                                        <label>Posisi yang Diminati</label>
                                        <ul class="list-no-style">
                                            <li
                                                v-for="(
                                                    jobrole, jr_i
                                                ) in jobrole_cbs[i]"
                                                :key="jr_i"
                                            >
                                                <label class="cb-container"
                                                    >{{ jobrole.name }}
                                                    <input
                                                        type="checkbox"
                                                        :value="jobrole.id"
                                                        :name="`job_roles[${i}][]`"
                                                        v-model="
                                                            form.jobrole_ids[i]
                                                        "
                                                    />
                                                    <span
                                                        class="checkmark"
                                                    ></span>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>

                                    <hr />
                                </div>

                                <button
                                    type="button"
                                    class="btn btn--sm btn-outline btn-outline--primary"
                                    @click="addFoi"
                                >
                                    <i class="icon-plus"></i> Tambah
                                </button>
                            </template>
                        </TabContent>
                        <TabContent name="preferensi">
                            <template v-slot:content>
                                <div class="form__group">
                                    <label class="form__label" for="job_types"
                                        >Tipe Pekerjaan</label
                                    >
                                    <ul class="list-no-style">
                                        <li
                                            v-for="(desc, value) in job_types"
                                            :key="value"
                                        >
                                            <label class="cb-container"
                                                >{{ desc }}
                                                <input
                                                    type="checkbox"
                                                    :value="value"
                                                    name="job_types[]"
                                                    v-model="form.job_types"
                                                />
                                                <span class="checkmark"></span>
                                            </label>
                                        </li>
                                    </ul>

                                    <span
                                        v-if="
                                            errors.job_types ||
                                            $v.form.job_types.$invalid
                                        "
                                        class="invalid-feedback"
                                        role="alert"
                                    >
                                        <span v-if="errors.job_types">{{
                                            errors.job_types[0]
                                        }}</span>
                                        <span v-if="$v.form.job_types.$error"
                                            >Required field!</span
                                        >
                                    </span>
                                </div>
                                <div class="form__group">
                                    <label
                                        class="form__label"
                                        for="current_salary"
                                        >Gaji Sekarang</label
                                    >
                                    <client-only>
                                        <Money
                                            class="form__control"
                                            id="current_salary"
                                            name="current_salary"
                                            v-model="form.current_salary"
                                        />
                                    </client-only>
                                    <span
                                        v-if="
                                            errors.current_salary ||
                                            $v.form.current_salary.$invalid
                                        "
                                        class="invalid-feedback"
                                        role="alert"
                                    >
                                        <span v-if="errors.current_salary">{{
                                            errors.current_salary[0]
                                        }}</span>
                                        <span
                                            v-if="$v.form.current_salary.$error"
                                            >Required field!</span
                                        >
                                    </span>
                                </div>
                                <div class="form__group">
                                    <label
                                        class="form__label"
                                        for="expected_salary"
                                        >Ekspektasi Gaji</label
                                    >
                                    <Money
                                        class="form__control"
                                        id="expected_salary"
                                        name="expected_salary"
                                        v-model="form.expected_salary"
                                    />
                                    <span
                                        v-if="
                                            errors.expected_salary ||
                                            $v.form.expected_salary.$invalid
                                        "
                                        class="invalid-feedback"
                                        role="alert"
                                    >
                                        <span v-if="errors.expected_salary">{{
                                            errors.expected_salary[0]
                                        }}</span>
                                        <span
                                            v-if="
                                                $v.form.expected_salary.$error
                                            "
                                            >Required field!</span
                                        >
                                    </span>
                                </div>
                                <div class="form__group">
                                    <label>Kota Kerja</label>
                                    <client-only>
                                        <v-select
                                            label="name"
                                            :options="all_cities"
                                            @input="addCity"
                                            placeholder="-- Pilih --"
                                            :clearable="false"
                                        ></v-select>
                                    </client-only>
                                </div>

                                <div class="mt-3 flex flex-wrap">
                                    <div
                                        v-for="(city, index) in selected_cities"
                                        :key="index"
                                        class="badge mr2 mb2"
                                    >
                                        <span>{{ city.name }}</span>
                                        <span
                                            class="badge__icon"
                                            @click="removeCity(city, index)"
                                        >
                                            <i class="icon-close-square"></i>
                                        </span>
                                    </div>
                                    <span
                                        v-if="
                                            errors.cities ||
                                            $v.form.cities.$invalid
                                        "
                                        class="invalid-feedback"
                                        role="alert"
                                    >
                                        <span v-if="errors.cities">{{
                                            errors.cities[0]
                                        }}</span>
                                        <span v-if="$v.form.cities.$error"
                                            >Required field!</span
                                        >
                                    </span>
                                </div>

                                <div class="form__group">
                                    <label class="form__label" for="relocated"
                                        >Relokasi</label
                                    >
                                    <label class="cb-container"
                                        >Ya
                                        <input
                                            type="checkbox"
                                            name="relocated"
                                            v-model="form.relocated"
                                        />
                                        <span class="checkmark"></span>
                                    </label>
                                    <span
                                        v-if="
                                            errors.relocated ||
                                            $v.form.relocated.$invalid
                                        "
                                        class="invalid-feedback"
                                        role="alert"
                                    >
                                        <span v-if="errors.relocated">{{
                                            errors.relocated[0]
                                        }}</span>
                                        <span v-if="$v.form.relocated.$error"
                                            >Required field!</span
                                        >
                                    </span>
                                </div>
                            </template>
                        </TabContent>
                    </template>
                </Tab>
            </template>
            <template v-slot:footer>
                <div class="flex justify-end">
                    <ModalCloseButton target="myo__interest-modal" />
                    <button
                        type="button"
                        @click="save('myo__interest-modal')"
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
import Tab from "~/components/Share/Tab/Tab";
import TabNav from "~/components/Share/Tab/TabNav";
import TabContent from "~/components/Share/Tab/TabContent";
import { Money } from "v-money";

export default {
    props: {
        user_data: {
            type: Object,
            required: true,
        },
        job_types: {
            type: Object,
            required: true,
        },
        jobfunctions: {
            type: Array,
            required: true,
        },
        all_cities: {
            type: Array,
            required: true,
        },
    },
    components: {
        Modal,
        ModalTrigger,
        ModalCloseButton,
        Tab,
        TabNav,
        TabContent,
        Money,
    },
    data() {
        return {
            saving: false,
            selected_cities:
                this.user_data.interest != ""
                    ? this.user_data.interest.cities
                    : [],
            selected_jobfunctions: [],
            jobrole_cbs: [],
            foi_form: [],
            form: {
                jobfunction_ids: [],
                jobrole_ids: [],
                job_types: [],
                current_salary:
                    this.user_data.interest != ""
                        ? this.user_data.interest.current_salary
                        : "",
                expected_salary:
                    this.user_data.interest != ""
                        ? this.user_data.interest.expected_salary
                        : "",
                cities: [],
                relocated:
                    this.user_data.interest != ""
                        ? this.user_data.interest.relocated
                        : false,
            },
        };
    },
    validations: {
        form: {
            jobfunction_ids: { required },
            jobrole_ids: { required },
            job_types: { required },
            current_salary: { required },
            expected_salary: { required },
            cities: { required },
            relocated: { required },
        },
    },
    created() {
        if (this.user_data.interest != "") {
            // Set job types
            let job_types = [];
            this.user_data.interest.job_types.forEach((job_type) => {
                job_types.push(job_type.value);
            });
            this.form.job_types = job_types;

            // Set form cities
            let cities = [];
            let selected_cities = [];
            this.user_data.interest.cities.forEach((city) => {
                cities.push(city.id);
                selected_cities.push(city);
            });
            this.selected_cities = selected_cities;
            this.form.cities = cities;

            // Set selected_jobfunctions and jobrole_ids
            let selected_jobfunctions = [];
            let num = 0;
            this.user_data.interest.field_of_interests.forEach((foi) => {
                selected_jobfunctions.push({
                    id: foi.jobfunction.id,
                    name: foi.jobfunction.name,
                });
                this.getJobroles(num, foi.jobfunction);
                let jobroles = [];
                foi.jobroles.forEach((role) => {
                    jobroles.push(role.id);
                });
                this.foi_form.push(foi);
                this.form.jobfunction_ids.push(foi.jobfunction.id);
                this.form.jobrole_ids.push(jobroles);
                num++;
            });
            this.selected_jobfunctions = selected_jobfunctions;
        }
    },
    methods: {
        save(modal) {
            this.saving = true;
            this.$axios
                .$post(`account/update-interest`, {
                    jobfunction_ids: this.form.jobfunction_ids,
                    jobrole_ids: this.form.jobrole_ids.flat(),
                    job_types: this.form.job_types,
                    current_salary: this.form.current_salary,
                    expected_salary: this.form.expected_salary,
                    cities: this.form.cities,
                    relocated: this.form.relocated,
                })
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
        removeCity(city, index) {
            this.selected_cities.splice(index, 1);
            this.form.cities.splice(index, 1);
        },
        addCity(value) {
            if (value === null || value === undefined || value === "") {
                return;
            }
            this.form.cities.push(value.id);
            this.selected_cities.push(value);
        },
        jobFunctionChange(index, jobfunction) {
            if (
                jobfunction === null ||
                jobfunction === undefined ||
                jobfunction === ""
            ) {
                this.$set(this.form.jobfunction_ids, index, "");
                this.$set(this.form.jobrole_ids, index, []);
                this.$set(this.jobrole_cbs, index, []);
                return;
            }
            this.$set(this.form.jobfunction_ids, index, jobfunction.id);
            this.$set(this.form.jobrole_ids, index, []);
            this.getJobroles(index, jobfunction);
        },
        getJobroles(index, jobfunction) {
            this.$axios
                .$get(`jobroles/${jobfunction.id}`)
                .then((res) => {
                    this.$set(this.jobrole_cbs, index, res.data);
                })
                .catch((err) => {
                    this.axiosError(err);
                });
        },
        removeFoi(index) {
            this.foi_form.splice(index, 1);
            this.jobrole_cbs.splice(index, 1);
            this.form.jobfunction_ids.splice(index, 1);
            this.form.jobrole_ids.splice(index, 1);
            this.selected_jobfunctions.splice(index, 1);
        },
        addFoi() {
            this.foi_form.push({});
            this.jobrole_cbs.push({});
            this.form.jobfunction_ids.push("");
            this.form.jobrole_ids.push([]);
            // this.selected_jobfunctions.push({ id: "", name: "" });
        },
    },
};
</script>