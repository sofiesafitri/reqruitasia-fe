<template>
    <div>
        <div class="form__group">
            <label class="form__label" for="company">Company Name</label>
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
            <label class="form__label">Rate Overall Experience</label>
            <label class="ir-container mr3"
                >Positive
                <input
                    type="radio"
                    name="overall_exp"
                    value="positive"
                    v-model="form.overall_exp"
                />
                <span class="checkmark"></span>
            </label>
            <label class="ir-container mr3"
                >Neutral
                <input
                    type="radio"
                    name="overall_exp"
                    value="neutral"
                    v-model="form.overall_exp"
                />
                <span class="checkmark"></span>
            </label>
            <label class="ir-container"
                >Negative
                <input
                    type="radio"
                    name="overall_exp"
                    value="negative"
                    v-model="form.overall_exp"
                />
                <span class="checkmark"></span>
            </label>
            <span
                v-if="errors.overall_exp"
                class="invalid-feedback"
                role="alert"
                >{{ errors.overall_exp[0] }}</span
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
            <label for="interview_process" class="form__label"
                >Describe the Interview Process</label
            >
            <textarea
                class="form__control"
                name="interview_process"
                id="interview_process"
                v-model="form.interview_process"
                rows="5"
            ></textarea>
            <span
                v-if="errors.interview_process"
                class="invalid-feedback"
                role="alert"
                >{{ errors.interview_process[0] }}</span
            >
        </div>
        <div class="form__group">
            <label class="form__label" for="interview_difficulty"
                >Interview Difficulty</label
            >
            <client-only>
                <v-select
                    label="text"
                    :options="[
                        { value: 'very-easy', text: 'Very Easy' },
                        { value: 'easy', text: 'Easy' },
                        { value: 'average', text: 'Average' },
                        { value: 'difficult', text: 'Difficult' },
                        {
                            value: 'very-difficult',
                            text: 'Very Difficult',
                        },
                    ]"
                    v-model="selected_interview_difficulty"
                    @input="interviewDifficultyChange"
                    placeholder="-- Please Select --"
                    :clearable="false"
                ></v-select>
            </client-only>
            <span
                v-if="errors.interview_difficulty"
                class="invalid-feedback"
                role="alert"
                >{{ errors.interview_difficulty[0] }}</span
            >
        </div>
        <div class="form__group">
            <label class="form__label" for="get_offer"
                >Did You Get an Offer?</label
            >
            <client-only>
                <v-select
                    label="text"
                    :options="[
                        { value: 'no', text: 'No' },
                        { value: 'yes-declined', text: 'Yes Declined' },
                        { value: 'yes-accepted', text: 'Yes Accepted' },
                    ]"
                    v-model="selected_get_offer"
                    @input="getOfferChange"
                    placeholder="-- Please Select --"
                    :clearable="false"
                ></v-select>
            </client-only>
            <span
                v-if="errors.get_offer"
                class="invalid-feedback"
                role="alert"
                >{{ errors.get_offer[0] }}</span
            >
        </div>

        <label class="form__label">Interview Questions</label>
        <div class="border rounded p3">
            <div
                v-for="(qa, i) in form.qas"
                :key="i"
                class="border-bottom pb2"
                :class="{ mt2: i > 0 }"
            >
                <div class="form__group">
                    <label :for="`question${i}`" class="form__label"
                        >Question</label
                    >
                    <textarea
                        class="form__control"
                        :name="`question${i}`"
                        :id="`question${i}`"
                        v-model="form.qas[i].question"
                        rows="3"
                    ></textarea>
                </div>
                <div class="form__group">
                    <label :for="`answer${i}`" class="form__label"
                        >answer</label
                    >
                    <textarea
                        class="form__control"
                        :name="`answer${i}`"
                        :id="`answer${i}`"
                        v-model="form.qas[i].answer"
                        rows="3"
                    ></textarea>
                </div>
                <button
                    type="button"
                    @click="removeQas(i)"
                    class="btn btn--sm btn--danger"
                >
                    Remove
                </button>
            </div>
            <button
                type="button"
                @click="addMoreQas"
                class="btn btn-outline btn-outline--primary btn-sm mt2"
            >
                Add More
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                company_id: "",
                overall_exp: "",
                job_title: "",
                interview_process: "",
                interview_difficulty: "",
                get_offer: "",
                qas: [{ question: "", answer: "" }],
            },
            companies: [],
            selected_company: null,
            selected_interview_difficulty: null,
            selected_get_offer: null,
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
        interviewDifficultyChange(value) {
            this.form.interview_difficulty = value.value;
        },
        getOfferChange(value) {
            this.form.get_offer = value.value;
        },
        addMoreQas() {
            const newQas = { question: "", answer: "" };
            this.form.qas.push(newQas);
        },
        removeQas(i) {
            this.form.qas.splice(i, 1);
        },
    },
    watch: {
        form: {
            handler(val) {
                this.$emit("form_update", val);
            },
            deep: true,
        },
    },
};
</script>