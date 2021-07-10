<template>
    <div class="card">
        <div class="card__header">
            <h2 class="card__header-title">Interview Review</h2>
        </div>
        <div class="card__body">
            <div v-if="success" class="alert alert--success">
                Thank you for submitting review!
            </div>
            <div v-else>
                <ReviewInterviewStep1
                    v-show="step == 1"
                    @form_update="formUpdate"
                />
                <ReviewInterviewStep2
                    v-show="step == 2"
                    @form_update="formUpdate"
                />

                <button
                    type="button"
                    v-if="step == 1"
                    class="btn btn-outline btn-outline--primary right mt3"
                    @click="step = step + 1"
                >
                    Next
                </button>
                <div v-else class="flex justify-between mt3">
                    <button
                        type="button"
                        class="btn btn-outline btn-outline--primary"
                        @click="step = step - 1"
                    >
                        Prev
                    </button>
                    <button
                        type="button"
                        @click="send"
                        class="btn btn--primary"
                        :disabled="processing"
                    >
                        <span v-if="processing">Processing...</span>
                        <span v-else>Send Review</span>
                    </button>
                </div>

                <div class="clearfix"></div>
            </div>
        </div>
    </div>
</template>

<script>
import ReviewInterviewStep1 from "~/components/WriteReview/Interview/ReviewInterviewStep1";
import ReviewInterviewStep2 from "~/components/WriteReview/Interview/ReviewInterviewStep2";

export default {
    middleware: ["auth"],
    components: {
        ReviewInterviewStep1,
        ReviewInterviewStep2,
    },
    head() {
        return {
            title: "Write An Interview Review",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Write an interview review",
                },
            ],
        };
    },
    data() {
        return {
            form: {
                type: "interview_review",
                company_id: "",
                overall_exp: "",
                job_title: "",
                interview_process: "",
                interview_difficulty: "",
                get_offer: "",
                qas: [],
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
            step: 1,
            processing: false,
            success: false,
        };
    },
    methods: {
        formUpdate(data) {
            Object.keys(data).forEach((key) => {
                this.form[key] = data[key];
            });
        },
        send() {
            this.processing = true;

            this.$axios
                .$post("/account/write-review/interview-review", this.form)
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