<template>
    <div>
        <div class="form__group">
            <label class="form__label" for="how_to_get_interview"
                >How Did You Get The Interview?</label
            >
            <client-only>
                <v-select
                    label="text"
                    :options="[
                        { value: 'online', text: 'Applied Online' },
                        { value: 'university', text: 'College or University' },
                        { value: 'referral', text: 'Employee Referral' },
                        { value: 'in-person', text: 'In-Person' },
                        {
                            value: 'recruiter',
                            text: 'Recruiter',
                        },
                        {
                            value: 'staffing-agency',
                            text: 'Staffing Agency',
                        },
                        {
                            value: 'other',
                            text: 'Other',
                        },
                    ]"
                    v-model="selected_how_to_get_interview"
                    @input="howToGetInterviewChange"
                    placeholder="-- Please Select --"
                    :clearable="false"
                ></v-select>
            </client-only>
            <span
                v-if="errors.how_to_get_interview"
                class="invalid-feedback"
                role="alert"
                >{{ errors.how_to_get_interview[0] }}</span
            >
        </div>
        <div class="form__group">
            <label class="form__label">How Long Was This Process?</label>
            <div class="flex max-width-1">
                <div class="col-4 mr2">
                    <input
                        type="number"
                        class="form__control"
                        name="how_long_number"
                        id="how_long_number"
                        v-model="form.how_long_number"
                    />
                </div>
                <div class="col-8">
                    <client-only>
                        <v-select
                            label="text"
                            :options="[
                                { value: 'days', text: 'Days' },
                                { value: 'weeks', text: 'Weeks' },
                                { value: 'months', text: 'Months' },
                            ]"
                            v-model="selected_how_long_unit"
                            @input="howLongUnitChange"
                            placeholder="-- Please Select --"
                            :clearable="false"
                        ></v-select>
                    </client-only>
                </div>
                <span
                    v-if="errors.how_long_number"
                    class="invalid-feedback"
                    role="alert"
                    >{{ errors.how_long_number[0] }}</span
                >
                <br />
                <span
                    v-if="errors.how_long_unit"
                    class="invalid-feedback"
                    role="alert"
                    >{{ errors.how_long_unit[0] }}</span
                >
            </div>
        </div>
        <div class="form__group">
            <label class="form__label" for="interview_time"
                >When Was This Interview?</label
            >
            <client-only>
                <date-pick
                    v-model="form.interview_time"
                    :inputAttributes="{ placeholder: 'Select Date' }"
                ></date-pick>
            </client-only>
            <span
                v-if="errors.interview_time"
                class="invalid-feedback"
                role="alert"
                >{{ errors.interview_time[0] }}</span
            >
        </div>
        <div class="form__group">
            <label for="location" class="form__label"
                >Where Was This Interview?</label
            >
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
        <label class="form__label">What Stages Were Required?</label>
        <div class="form__group">
            <label class="form__label">Interview Type</label>
            <label class="cb-container"
                >Phone Screen
                <input
                    type="checkbox"
                    name="required_type[]"
                    value="phone-screen"
                    v-model="form.required_type"
                />
                <span class="checkmark"></span>
            </label>
            <br />
            <label class="cb-container"
                >1:1
                <input
                    type="checkbox"
                    name="required_type[]"
                    value="1-on-1"
                    v-model="form.required_type"
                />
                <span class="checkmark"></span>
            </label>
            <br />
            <label class="cb-container"
                >Group Panel
                <input
                    type="checkbox"
                    name="required_type[]"
                    value="group-panel"
                    v-model="form.required_type"
                />
                <span class="checkmark"></span>
            </label>
            <span
                v-if="errors.required_type"
                class="invalid-feedback"
                role="alert"
                >{{ errors.required_type[0] }}</span
            >
        </div>
        <div class="form__group">
            <label class="form__label">Testing</label>
            <label class="cb-container"
                >Skills Review
                <input
                    type="checkbox"
                    name="testing[]"
                    value="skills-review"
                    v-model="form.testing"
                />
                <span class="checkmark"></span>
            </label>
            <br />
            <label class="cb-container"
                >Personality Test
                <input
                    type="checkbox"
                    name="testing[]"
                    value="personality-quiz"
                    v-model="form.testing"
                />
                <span class="checkmark"></span>
            </label>
            <br />
            <label class="cb-container"
                >Drug Test
                <input
                    type="checkbox"
                    name="testing[]"
                    value="drug-test"
                    v-model="form.testing"
                />
                <span class="checkmark"></span>
            </label>
            <br />
            <label class="cb-container"
                >IQ Test
                <input
                    type="checkbox"
                    name="testing[]"
                    value="iq-test"
                    v-model="form.testing"
                />
                <span class="checkmark"></span>
            </label>
            <span v-if="errors.testing" class="invalid-feedback" role="alert">{{
                errors.testing[0]
            }}</span>
        </div>
        <div class="form__group">
            <label class="form__label">Other</label>
            <label class="cb-container"
                >Background Check
                <input
                    type="checkbox"
                    name="other[]"
                    value="background-check"
                    v-model="form.other"
                />
                <span class="checkmark"></span>
            </label>
            <br />
            <label class="cb-container"
                >Presentation
                <input
                    type="checkbox"
                    name="other[]"
                    value="presentation"
                    v-model="form.other"
                />
                <span class="checkmark"></span>
            </label>
            <br />
            <label class="cb-container"
                >Other
                <input
                    type="checkbox"
                    name="other[]"
                    value="other"
                    v-model="form.other"
                />
                <span class="checkmark"></span>
            </label>
            <span v-if="errors.other" class="invalid-feedback" role="alert">{{
                errors.other[0]
            }}</span>
        </div>
        <div class="form__group">
            <label class="form__label" for="how_helpful"
                >How helpful was Reqruit in preparing for this interview?</label
            >
            <client-only>
                <v-select
                    label="text"
                    :options="[
                        { value: 'very-helpful', text: 'Very Helpful' },
                        { value: 'helpful', text: 'Helpful' },
                        { value: 'not-helpful', text: 'Not Helpful' },
                        {
                            value: 'not-use',
                            text:
                                'I did not use Reqruit to prepare for this interview',
                        },
                    ]"
                    v-model="selected_how_helpful"
                    @input="howHelpfulChange"
                    placeholder="-- Please Select --"
                    :clearable="false"
                ></v-select>
            </client-only>
            <span
                v-if="errors.how_helpful"
                class="invalid-feedback"
                role="alert"
                >{{ errors.how_helpful[0] }}</span
            >
        </div>
    </div>
</template>

<script>
import DatePick from "vue-date-pick";

export default {
    data() {
        return {
            form: {
                how_to_get_interview: "",
                how_long_number: 0,
                how_long_unit: "",
                interview_time: "",
                location: "",
                required_type: [],
                testing: [],
                other: [],
                how_helpful: "",
            },
            selected_how_to_get_interview: null,
            selected_how_long_unit: null,
            selected_how_helpful: null,
        };
    },
    components: {
        DatePick,
    },
    methods: {
        howToGetInterviewChange(value) {
            this.form.how_to_get_interview = value.value;
        },
        howLongUnitChange(value) {
            this.form.how_long_unit = value.value;
        },
        howHelpfulChange(value) {
            this.form.how_helpful = value.value;
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