<template>
    <div class="container">
        <h1 class="section__title section__title--left">English Assessment</h1>

        <div v-if="completed">
            <h3 class="center">Assessment complete, redirecting...</h3>
            <div class="loading-image">
                <img src="~/assets/images/loading.gif" alt="Loading" />
            </div>
        </div>

        <div v-else class="card">
            <div class="card__body">
                <EnglishSession1
                    v-show="
                        session_number == 1 && questions.session_1.length > 0
                    "
                    :questions="questions.session_1"
                    @answer="setSession1Answer"
                />

                <EnglishSession2
                    v-show="session_number == 2"
                    :questions="questions.session_2"
                    @dragstart="onDragStart"
                    @answer="setSession2Answer"
                />

                <EnglishSession3
                    v-show="session_number == 3"
                    :questions="questions.session_3"
                    @answer="setSession3Answer"
                />

                <div class="flex justify-center mt-4">
                    <button
                        v-if="session_number > 1"
                        type="button"
                        class="btn btn-outline btn-outline--primary mr-4"
                        @click="prev"
                        :disabled="processing"
                    >
                        <i class="icon-arrow-left"></i> Prev
                    </button>
                    <button
                        v-if="session_number < 3"
                        type="button"
                        class="btn btn-outline btn-outline--primary mr-4"
                        @click="next"
                        :disabled="processing"
                    >
                        Next <i class="icon-arrow-right"></i>
                    </button>
                    <button
                        v-if="session_number === 3"
                        type="button"
                        class="btn btn--primary"
                        @click="finish"
                        :disabled="processing"
                    >
                        <span v-if="processing">Processing...</span>
                        <span v-else>Finish</span>
                    </button>
                </div>

                <p class="center">{{ session_number }} / 3</p>
            </div>
        </div>
    </div>
</template>

<script>
import EnglishSession1 from "~/components/Assessment/English/EnglishSession1";
import EnglishSession2 from "~/components/Assessment/English/EnglishSession2";
import EnglishSession3 from "~/components/Assessment/English/EnglishSession3";

export default {
    middleware: ["auth"],
    head() {
        return {
            title: this.meta_title,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.meta_description,
                },
            ],
        };
    },
    data() {
        return {
            meta_title: "",
            meta_description: "",
            questions: {
                session_1: [],
                session_2: {},
                session_3: {},
            },
            session_number: 1,
            form: {
                session_1: [],
                session_2: {
                    q_group_no: "",
                    answers: [],
                },
                session_3: {
                    q_group_no: "",
                    answers: [],
                },
            },
            processing: false,
            completed: false,
            draggingItem: undefined,
        };
    },
    components: {
        EnglishSession1,
        EnglishSession2,
        EnglishSession3,
    },
    created() {
        this.$axios
            .$get("account/assessment/english")
            .then((res) => {
                const data = res.data;
                this.meta_title = data.meta_title;
                this.meta_description = data.meta_description;

                data.questions.session_1.forEach((q) => {
                    this.form.session_1.push({
                        question_id: "",
                        question_text: "",
                        answer_id: "",
                        answer_text: "",
                    });
                });

                this.form.session_2.q_group_no =
                    data.questions.session_2.q_group_no;
                data.questions.session_2.choices.forEach((q) => {
                    this.form.session_2.answers.push("");
                });

                this.form.session_3.q_group_no =
                    data.questions.session_3.q_group_no;
                data.questions.session_3.questions.forEach((q) => {
                    this.form.session_3.answers.push({
                        q_no: "",
                        answer: "",
                    });
                });

                this.questions = data.questions;
            })
            .catch((err) => {
                // console.log(err);
                if (err.response.status === 403) {
                    this.swalWrong(err.response.data.message);
                    this.$router.push("/account/edit-profile");
                }
            });
    },
    methods: {
        setSession1Answer(data) {
            const index = data.i;
            const question = data.q;
            const answer = data.ans;

            this.form.session_1[index].question_id = question.id;
            this.form.session_1[index].question_text = question.question;
            this.form.session_1[index].answer_id = answer.id;
            this.form.session_1[index].answer_text = answer.answer;
        },
        onDragStart(answer_number) {
            this.form.session_2.answers[answer_number] = "";
        },
        setSession2Answer(data) {
            this.form.session_2.answers[data.answer_number] = data.text;
        },
        setSession3Answer(data) {
            const index = data.i;
            const answer = data.alp;

            this.form.session_3.answers[index].q_no = index + 1;
            this.form.session_3.answers[index].answer = answer;
        },
        prev() {
            if (this.session_number === 0) {
                return;
            }

            this.session_number = this.session_number - 1;
        },
        next() {
            if (this.session_number == 1) {
                let not_answered = false;
                let q_number_not_answered = 0;

                for (let i = 0; i < this.form.session_1.length; i++) {
                    if (this.form.session_1[i].question_id == "") {
                        not_answered = true;
                        q_number_not_answered = i + 1;
                        break;
                    }
                }

                if (not_answered) {
                    this.swalWrong(
                        `Please answer the question number ${q_number_not_answered}!`
                    );
                    return;
                }
            }

            if (this.session_number == 2) {
                const empty_answer = this.form.session_2.answers.filter(
                    (ans) => ans == ""
                ).length;

                if (empty_answer > 0) {
                    this.swalWrong(
                        "Please fill all blank part of the sentence!"
                    );
                    return;
                }
            }

            if (this.session_number < 3) {
                this.session_number = this.session_number + 1;
            }
        },
        finish() {
            let not_answered = false;
            let q_number_not_answered = 0;

            for (let i = 0; i < this.form.session_3.answers.length; i++) {
                if (this.form.session_3.answers[i].answer == "") {
                    not_answered = true;
                    q_number_not_answered = i + 1;
                    break;
                }
            }

            if (not_answered) {
                this.swalWrong(
                    `Please answer the question number ${q_number_not_answered}!`
                );

                return;
            }

            this.processing = true;
            this.$bus.$emit("show-loading-block");

            this.$axios
                .$post("/account/assessment/english", {
                    answers: this.form,
                })
                .then((res) => {
                    this.completed = true;
                    this.$router.push("/account/edit-profile");
                })
                .catch((err) => {
                    this.axiosError(err);
                })
                .finally(() => {
                    this.processing = false;
                    this.$bus.$emit("hide-loading-block");
                });
        },
    },
    computed: {
        getAudio() {
            return this.questions.session_3.audio;
        },
    },
};
</script>