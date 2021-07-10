<template>
    <div class="card">
        <div class="card__header">
            <h2 class="card__header-title">Company Review</h2>
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
                    <label class="form__label">Overall Rating</label>
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
                    <label for="review_headline" class="form__label"
                        >Review Headline</label
                    >
                    <input
                        type="text"
                        class="form__control"
                        name="review_headline"
                        id="review_headline"
                        v-model="form.review_headline"
                    />
                    <span
                        v-if="errors.review_headline"
                        class="invalid-feedback"
                        role="alert"
                        >{{ errors.review_headline[0] }}</span
                    >
                </div>
                <div class="form__group">
                    <label for="pros" class="form__label">Pros</label>
                    <textarea
                        class="form__control"
                        name="pros"
                        id="pros"
                        v-model="form.pros"
                        rows="3"
                    ></textarea>
                    <span
                        v-if="errors.pros"
                        class="invalid-feedback"
                        role="alert"
                        >{{ errors.pros[0] }}</span
                    >
                </div>
                <div class="form__group">
                    <label for="cons" class="form__label">Cons</label>
                    <textarea
                        class="form__control"
                        name="cons"
                        id="cons"
                        v-model="form.cons"
                        rows="3"
                    ></textarea>
                    <span
                        v-if="errors.cons"
                        class="invalid-feedback"
                        role="alert"
                        >{{ errors.cons[0] }}</span
                    >
                </div>
                <div class="form__group">
                    <label for="advice" class="form__label">Advice</label>
                    <textarea
                        class="form__control"
                        name="advice"
                        id="advice"
                        v-model="form.advice"
                        rows="3"
                    ></textarea>
                    <span
                        v-if="errors.advice"
                        class="invalid-feedback"
                        role="alert"
                        >{{ errors.advice[0] }}</span
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

export default {
    middleware: ["auth"],
    mixins: ["IconStarMixin"],
    head() {
        return {
            title: "Write A Company Review",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Write a company review",
                },
            ],
        };
    },
    data() {
        return {
            form: {
                type: "company_review",
                job_status: "",
                company_id: "",
                rating: 0,
                employment_status: "",
                job_title: "",
                review_headline: "",
                pros: "",
                cons: "",
                advice: "",
            },
            processing: false,
            companies: [],
            selected_company: null,
            employment_statuses: this.$store.getters.option_select.job_type,
            selected_employment_status: null,
        };
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
                .$post("/account/write-review/company-review", this.form)
                .then((res) => {
                    this.swalSuccess(res.message);

                    this.form.job_status = "";
                    this.form.company_id = "";
                    this.form.rating = 0;
                    this.form.employment_status = "";
                    this.form.job_title = "";
                    this.form.review_headline = "";
                    this.form.pros = "";
                    this.form.cons = "";
                    this.form.advice = "";

                    this.companies = [];
                    this.selected_employment_status = null;
                    this.selected_company = null;
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