<template>
    <div class="card">
        <div class="card__header">
            <h2 class="card__header-title">Salary Review</h2>
        </div>
        <div class="card__body">
            <form @submit.prevent="send" class="form">
                <div class="form__group">
                    <label class="form__label"
                        >Are you a current or former employee?</label
                    >
                    <label class="ir-container mr3"
                        >Current
                        <input
                            type="radio"
                            name="job_status"
                            value="current"
                            v-model="form.job_status"
                        />
                        <span class="checkmark"></span>
                    </label>
                    <label class="ir-container"
                        >Former
                        <input
                            type="radio"
                            name="job_status"
                            value="former"
                            v-model="form.job_status"
                        />
                        <span class="checkmark"></span>
                    </label>
                    <span
                        v-if="errors.job_status"
                        class="invalid-feedback"
                        role="alert"
                        >{{ errors.job_status[0] }}</span
                    >
                </div>
                <div class="form__group">
                    <label class="form__label" for="company"
                        >Company Name</label
                    >
                    <client-only>
                        <v-select
                            label="name"
                            v-model="selected_company"
                            @search="searchCompany"
                            @input="companyChange"
                            :clearable="false"
                            :options="companies"
                            placeholder="Search company"
                        ></v-select>
                    </client-only>
                    <span
                        v-if="errors.company_id"
                        class="invalid-feedback"
                        role="alert"
                        >{{ errors.company_id[0] }}</span
                    >
                </div>
                <div class="form__group">
                    <label class="form__label" for="employment_status"
                        >Employment Status</label
                    >
                    <client-only>
                        <v-select
                            label="text"
                            v-model="selected_employment_status"
                            @input="employmentStatusChange"
                            :clearable="false"
                            :options="employment_statuses"
                            placeholder="-- Please Select --"
                        ></v-select>
                    </client-only>
                    <span
                        v-if="errors.employment_status"
                        class="invalid-feedback"
                        role="alert"
                        >{{ errors.employment_status[0] }}</span
                    >
                </div>
                <div class="form__group">
                    <label for="job_title" class="form__label">Job Title</label>
                    <input
                        type="text"
                        class="form__control"
                        name="job_title"
                        id="job_title"
                        v-model="form.job_title"
                    />
                    <span
                        v-if="errors.job_title"
                        class="invalid-feedback"
                        role="alert"
                        >{{ errors.job_title[0] }}</span
                    >
                </div>
                <div class="form__group">
                    <label class="form__label" for="currency">Currency</label>
                    <client-only>
                        <v-select
                            label="text"
                            v-model="selected_currency"
                            @input="currencyChange"
                            :clearable="false"
                            :options="currencies"
                            placeholder="-- Please Select --"
                        ></v-select>
                    </client-only>
                    <span
                        v-if="errors.currency"
                        class="invalid-feedback"
                        role="alert"
                        >{{ errors.currency[0] }}</span
                    >
                </div>
                <div class="form__group">
                    <label for="base_salary" class="form__label"
                        >Base Salary</label
                    >
                    <client-only>
                        <Money
                            class="form__control"
                            name="base_salary"
                            id="base_salary"
                            v-model="form.base_salary"
                            v-bind="money"
                            ref="base_salary"
                        />
                    </client-only>
                    <span
                        v-if="errors.base_salary"
                        class="invalid-feedback"
                        role="alert"
                        >{{ errors.base_salary[0] }}</span
                    >
                </div>
                <div class="form__group">
                    <label class="form__label" for="salary_duration"
                        >Salary Duration</label
                    >
                    <client-only>
                        <v-select
                            label="text"
                            v-model="selected_salary_duration"
                            @input="salaryDurationChange"
                            :clearable="false"
                            :options="salary_durations"
                            placeholder="-- Please Select --"
                        ></v-select>
                    </client-only>
                    <span
                        v-if="errors.salary_duration"
                        class="invalid-feedback"
                        role="alert"
                        >{{ errors.salary_duration[0] }}</span
                    >
                </div>
                <div class="form__group">
                    <label class="form__label">Get Bonus</label>
                    <label class="cb-container"
                        >Get Bonus
                        <input
                            type="checkbox"
                            name="get_bonus"
                            v-model="form.get_bonus"
                        />
                        <span class="checkmark"></span>
                    </label>
                    <span
                        v-if="errors.get_bonus"
                        class="invalid-feedback"
                        role="alert"
                        >{{ errors.get_bonus[0] }}</span
                    >
                </div>
                <div class="form__group">
                    <label class="form__label" for="work_experience"
                        >Work Experience</label
                    >
                    <client-only>
                        <v-select
                            label="text"
                            v-model="selected_work_experience"
                            @input="workExperienceChange"
                            :clearable="false"
                            :options="work_experiences"
                            placeholder="-- Please Select --"
                        ></v-select>
                    </client-only>
                    <span
                        v-if="errors.work_experience"
                        class="invalid-feedback"
                        role="alert"
                        >{{ errors.work_experience[0] }}</span
                    >
                </div>
                <div class="form__group">
                    <label class="form__label" for="country_id">Country</label>
                    <client-only>
                        <v-select
                            label="name"
                            :options="countries"
                            v-model="selected_country"
                            @input="countryChange"
                            placeholder="-- Please Select --"
                            :clearable="false"
                        ></v-select>
                    </client-only>
                    <span
                        v-if="errors.country_id"
                        class="invalid-feedback"
                        role="alert"
                        >{{ errors.country_id[0] }}</span
                    >
                </div>
                <div class="form__group">
                    <label for="location" class="form__label">Location</label>
                    <input
                        type="text"
                        class="form__control"
                        name="location"
                        id="location"
                        v-model="form.location"
                    />
                    <span
                        v-if="errors.location"
                        class="invalid-feedback"
                        role="alert"
                        >{{ errors.location[0] }}</span
                    >
                </div>
                <div class="form__group">
                    <label class="form__label" for="gender">Gender</label>
                    <client-only>
                        <v-select
                            label="text"
                            :options="[
                                { value: 'male', text: 'Male' },
                                { value: 'female', text: 'Female' },
                            ]"
                            v-model="selected_gender"
                            @input="genderChange"
                            placeholder="-- Please Select --"
                            :clearable="false"
                        ></v-select>
                    </client-only>
                    <span
                        v-if="errors.gender"
                        class="invalid-feedback"
                        role="alert"
                        >{{ errors.gender[0] }}</span
                    >
                </div>

                <button
                    type="submit"
                    class="btn btn--primary right"
                    :disabled="processing"
                >
                    <span v-if="processing">Processing...</span>
                    <span v-else>Send Review</span>
                </button>
                <div class="clearfix"></div>
            </form>
        </div>
    </div>
</template>

<script>
import MoneyMixin from "~/plugins/mixins/money";
import AddressMixin from "~/plugins/mixins/address";

export default {
    middleware: ["auth"],
    mixins: ["MoneyMixin", "AddressMixin"],
    head() {
        return {
            title: "Write A Salary Review",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Write a salary review",
                },
            ],
        };
    },
    data() {
        return {
            form: {
                type: "salary_review",
                job_status: "",
                company_id: "",
                employment_status: "",
                job_title: "",
                currency: "",
                base_salary: 0,
                salary_duration: "",
                get_bonus: false,
                work_experience: "",
                country_id: "",
                gender: "",
            },
            processing: false,
            companies: [],
            selected_company: null,
            employment_statuses: this.$store.getters.option_select.job_type,
            selected_employment_status: null,
            currencies: [
                { text: "Indonesia - IDR", value: "IDR" },
                { text: "United States of America - USD", value: "USD" },
                { text: "Singapore - SGD", value: "SGD" },
                { text: "Malaysia - MYR", value: "MYR" },
            ],
            selected_currency: null,
            salary_durations: this.$store.getters.option_select
                .job_salary_duration,
            selected_salary_duration: null,
            work_experiences: this.$store.getters.option_select.job_experience,
            selected_work_experience: null,
            selected_country: null,
            selected_gender: null,
        };
    },
    created() {
        this.getCountries();
    },
    methods: {
        searchCompany(search, loading) {
            loading(true);
            this.$axios
                .$post("companies-search", {
                    keyword: search,
                })
                .then((res) => {
                    this.companies = res.data;
                })
                .catch((err) => {
                    this.axiosError(err);
                })
                .finally(() => {
                    loading(false);
                });
        },
        companyChange(value) {
            this.form.company_id = value.id;
        },
        employmentStatusChange(value) {
            this.form.employment_status = value.value;
        },
        currencyChange(value) {
            this.form.currency = value.value;
        },
        salaryDurationChange(value) {
            this.form.salary_duration = value.value;
        },
        workExperienceChange(value) {
            this.form.work_experience = value.value;
        },
        countryChange(value) {
            this.form.country_id = value.id;
        },
        genderChange(value) {
            this.form.gender = value.value;
        },
        send() {
            this.processing = true;

            this.$axios
                .$post("/account/write-review/salary-review", this.form)
                .then((res) => {
                    this.swalSuccess(res.message);

                    this.form.job_status = "";
                    this.form.company_id = "";
                    this.form.employment_status = "";
                    this.form.job_title = "";
                    this.form.currency = "";
                    this.form.base_salary = 0;
                    this.form.salary_duration = "";
                    this.form.get_bonus = false;
                    this.form.work_experience = "";
                    this.form.country_id = "";
                    this.form.location = "";
                    this.form.gender = "";

                    this.companies = [];
                    this.selected_company = null;
                    this.selected_employment_status = null;
                    this.selected_currency = null;
                    this.selected_salary_duration = null;
                    this.selected_work_experience = null;
                    this.selected_country = null;
                    this.selected_gender = null;
                })
                .catch((err) => {
                    this.axiosError(err);
                })
                .finally(() => {
                    this.processing = false;
                });
        },
    },
};
</script>