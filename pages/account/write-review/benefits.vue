<template>
    <div class="card">
        <div class="card__header">
            <h2 class="card__header-title">Benefits Review</h2>
        </div>
        <div class="card__body">
            <div v-if="success" class="alert alert--success">
                Thank you for submitting review!
            </div>
            <form v-else @submit.prevent="send" class="form">
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
                    <label class="form__label"
                        >Rate the Benefits package overall</label
                    >
                    <div class="review-form__stars">
                        <span
                            v-for="i in 5"
                            :key="i"
                            class="star mr1"
                            :class="`star-${i}`"
                            v-html="star_dimmed"
                            @mouseover="hoverOnStar(i)"
                            @mouseleave="leaveStar"
                            @click="pickStar(i)"
                            :data-number="i"
                        ></span>
                    </div>
                    <span
                        v-if="errors.rating"
                        class="invalid-feedback"
                        role="alert"
                        >{{ errors.rating[0] }}</span
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
                    <label for="benefits_review" class="form__label"
                        >What is the best or worst thing about the benefits
                        package?</label
                    >
                    <textarea
                        class="form__control"
                        name="benefits_review"
                        id="benefits_review"
                        v-model="form.benefits_review"
                        rows="3"
                    ></textarea>
                    <span
                        v-if="errors.benefits_review"
                        class="invalid-feedback"
                        role="alert"
                        >{{ errors.benefits_review[0] }}</span
                    >
                </div>

                <h2>Select which benefits are offered</h2>

                <div
                    v-for="(benefit, i) in benefits"
                    :key="i"
                    class="form__group"
                >
                    <label class="form__label"
                        ><strong>{{ benefit.name }}</strong></label
                    >
                    <label class="ir-container mr3"
                        >Yes
                        <input
                            type="radio"
                            :name="benefit.code"
                            value="yes"
                            v-model="form[benefit.code]"
                        />
                        <span class="checkmark"></span>
                    </label>
                    <label class="ir-container mr3"
                        >No
                        <input
                            type="radio"
                            :name="benefit.code"
                            value="no"
                            v-model="form[benefit.code]"
                        />
                        <span class="checkmark"></span>
                    </label>
                    <label class="ir-container"
                        >Unsure
                        <input
                            type="radio"
                            :name="benefit.code"
                            value="unsure"
                            v-model="form[benefit.code]"
                        />
                        <span class="checkmark"></span>
                    </label>
                    <span
                        v-if="errors[benefit.code]"
                        class="invalid-feedback"
                        role="alert"
                        >{{ errors[benefit.code][0] }}</span
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
import IconStarMixin from "~/plugins/mixins/icons/icon-star";
import AddressMixin from "~/plugins/mixins/address";

export default {
    middleware: ["auth"],
    mixins: ["IconStarMixin", "AddressMixin"],
    head() {
        return {
            title: "Write A Benefits Review",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Write a benefits review",
                },
            ],
        };
    },
    data() {
        return {
            form: {
                type: "benefits_review",
                job_status: "",
                company_id: "",
                rating: 0,
                employment_status: "",
                job_title: "",
                country_id: "",
                location: "",
                benefits_review: "",
                employee_discount: "",
                employee_assistance_program: "",
                fertility_assistance: "",
                fsa: "",
                stock_options: "",
                dependent_care: "",
                adoption_assistance: "",
                employee_stock_purchase_plan: "",
                childcare: "",
                job_training: "",
                apprenticeship_program: "",
                professional_development: "",
                performance_bonus: "",
                gym_membership: "",
                hsa: "",
                family_medical_leave: "",
                military_leave: "",
                commuter_checks: "",
                life_assurance: "",
                vision_insurance: "",
                volunteer_time_off: "",
                tuition_assistance: "",
                supplemental_workers_compensation: "",
                healt_care_on_site: "",
                mobile_phone_discount: "",
                company_social_events: "",
                retiree_health: "",
                legal_assistance: "",
                occupational_accident_insurance: "",
                charitable_gift_matching: "",
                supplemntal_life_insurance: "",
                unpaid_extended_leave: "",
                pet_friendly_workplace: "",
                equity_incentive_plan: "",
                travel_concierge: "",
                disability_insurance: "",
                sabbatical: "",
                company_car: "",
                mental_health_care: "",
                bereavement_leave: "",
                accidental_death_and_dismemberment_insurance: "",
                pension_plan: "",
                maternity_and_paternity_leave: "",
                work_from_home: "",
                health_insurance: "",
                four_zero_one_plan: "",
                vacation_and_paid_time_off: "",
                retirement_plan: "",
                free_lunch: "",
                sick_days: "",
                diversity_program: "",
                dental_insurance: "",
                paid_holidays: "",
                reduced_or_flexible_hours: "",
            },
            success: false,
            processing: false,
            companies: [],
            selected_company: null,
            employment_statuses: this.$store.getters.option_select.job_type,
            selected_employment_status: null,
            selected_country: null,
            benefits: [
                { code: "employee_discount", name: "Employee Discount" },
                {
                    code: "employee_assistance_program",
                    name: "Employee Assistance Program",
                },
                { code: "fertility_assistance", name: "Fertility Assistance" },
                { code: "fsa", name: "Flexible Spending Account (FSA)" },
                { code: "stock_options", name: "Stock Options" },
                { code: "dependent_care", name: "Dependent Care" },
                { code: "adoption_assistance", name: "Adoption Assistance" },
                {
                    code: "employee_stock_purchase_plan",
                    name: "Employee Stock Purchase Plan",
                },
                { code: "childcare", name: "Childcare" },
                { code: "job_training", name: "Job Training" },
                {
                    code: "apprenticeship_program",
                    name: "Apprenticeship Program",
                },
                {
                    code: "professional_development",
                    name: "Professional Development",
                },
                { code: "performance_bonus", name: "Performance Bonus" },
                { code: "gym_membership", name: "Gym Membership" },
                { code: "hsa", name: "Health Savings Account (HSA)" },
                { code: "family_medical_leave", name: "Family Medical Leave" },
                { code: "military_leave", name: "Military Leave" },
                { code: "commuter_checks", name: "Commuter Checks" },
                { code: "life_assurance", name: "Life Assurance" },
                { code: "vision_insurance", name: "Vision Insurance" },
                { code: "volunteer_time_off", name: "Volunteer Time Off" },
                { code: "tuition_assistance", name: "Tuition Assistance" },
                {
                    code: "supplemental_workers_compensation",
                    name: "Supplemental Workers Compensation",
                },
                { code: "healt_care_on_site", name: "Health Care on Site" },
                {
                    code: "mobile_phone_discount",
                    name: "Mobile Phont Discount",
                },
                {
                    code: "company_social_events",
                    name: "Company Social Events",
                },
                { code: "retiree_health", name: "Retiree Health" },
                { code: "legal_assistance", name: "Legal Assistance" },
                {
                    code: "occupational_accident_insurance",
                    name: "Occupational Accident Insurance",
                },
                {
                    code: "charitable_gift_matching",
                    name: "Charitable Gift Matching",
                },
                {
                    code: "supplemntal_life_insurance",
                    name: "Supplemental Life Insurance",
                },
                {
                    code: "unpaid_extended_leave",
                    name: "Unpaid Extended Leave",
                },
                {
                    code: "pet_friendly_workplace",
                    name: "Pet Friendly Workplace",
                },
                {
                    code: "equity_incentive_plan",
                    name: "Equity Incentive Plan",
                },
                { code: "travel_concierge", name: "Travel Concierge" },
                { code: "disability_insurance", name: "Disablility Insurance" },
                { code: "sabbatical", name: "Sabbatical" },
                { code: "company_car", name: "Company Car" },
                { code: "mental_health_care", name: "Mental Health Care" },
                { code: "bereavement_leave", name: "Bareavement Leave" },
                {
                    code: "accidental_death_and_dismemberment_insurance",
                    name: "Accidental Death And Dismemberment Insurance",
                },
                { code: "pension_plan", name: "Pension Plan" },
                {
                    code: "maternity_and_paternity_leave",
                    name: "Maternity and Paternity Leave",
                },
                { code: "work_from_home", name: "Work From Home" },
                { code: "health_insurance", name: "Health Insurance" },
                { code: "four_zero_one_plan", name: "401K Plan" },
                {
                    code: "vacation_and_paid_time_off",
                    name: "Vacation and Paid Time Off",
                },
                { code: "retirement_plan", name: "Retirement Plan" },
                { code: "free_lunch", name: "Free Lunch" },
                { code: "sick_days", name: "Sick Days" },
                { code: "diversity_program", name: "Diversity Program" },
                { code: "dental_insurance", name: "Dental Insurance" },
                { code: "paid_holidays", name: "Paid Holidays" },
                {
                    code: "reduced_or_flexible_hours",
                    name: "Reduced or Flexible Hours",
                },
            ],
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
        countryChange(value) {
            this.form.country_id = value.id;
        },
        hoverOnStar(number) {
            for (let i = 1; i < number + 1; i++) {
                document.querySelector(`.star-${i}`).classList.add("light");
            }
        },
        leaveStar() {
            document.querySelectorAll("span.star").forEach((el) => {
                const data_number = parseInt(el.getAttribute("data-number"));
                if (data_number > this.form.rating) {
                    el.classList.remove("light");
                }
            });
        },
        pickStar(number) {
            this.form.rating = number;
        },
        send() {
            this.processing = true;

            this.$axios
                .$post("/account/write-review/benefits-review", this.form)
                .then((res) => {
                    this.swalSuccess(res.message);
                    this.success = true;
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