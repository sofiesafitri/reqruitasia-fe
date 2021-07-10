<template>
    <div class="container">
        <div class="clearfix mxn2">
            <div class="sm-col-12 md-col-10 lg-col-8 px2 mx-auto">
                <h1 class="page-title center">Jawab pertanyaan dibawah ini!</h1>
                <div class="card">
                    <div class="card__body">
                        <div class="mb3">
                            <ol>
                                <li v-for="(q, i) in questions" :key="i">
                                    <div class="bold">{{ q.question }}</div>
                                    <div class="form__group">
                                        <div>Jawaban:</div>
                                        <div
                                            :id="`question-${i}`"
                                            class="contenteditable form__control"
                                            contenteditable
                                            @input="($e) => answerUpdate($e, i)"
                                        ></div>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <button
                            type="button"
                            class="btn btn--block btn--primary"
                            @click="send"
                            :disabled="sending"
                        >
                            <span v-if="!sending"
                                ><i class="icon-send"></i> Kirim</span
                            >
                            <span v-else>Mengirim lamaran...</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

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
                {
                    hid: `og:title`,
                    property: "og:title",
                    content: this.meta_title,
                },
                {
                    hid: `og:url`,
                    property: "og:url",
                    content: this.current_page_url,
                },
                {
                    hid: `og:description`,
                    property: "og:description",
                    content: this.meta_description,
                },
            ],
        };
    },
    async asyncData({ $axios, params, redirect }) {
        const { data } = await $axios.$get(
            `/job/${params.slug}/${params.identifier}/questions`
        );

        if (data.hasOwnProperty("redirect_route")) {
            redirect(data.redirect_route);
        }

        const baseUrl = process.env.APP_BASE_URL;
        const answers = [];
        data.questions.forEach((q) => {
            answers.push({
                question: q.question,
                answer: "",
            });
        });

        return {
            meta_title: data.meta_title,
            meta_description: data.meta_description,
            job: data.job,
            questions: data.questions,
            sending: false,
            answers: answers,
        };
    },
    methods: {
        answerUpdate(e, index) {
            this.answers[index].answer = e.target.innerText;
        },
        send() {
            this.sending = true;

            this.$axios
                .$post(`/job/${this.job.slug}/${this.job.identifier}/answers`, {
                    answers: this.answers,
                    cover_letter: this.coverLetter,
                })
                .then((res) => {
                    this.swalSuccess(res.message);
                    this.$router.push(
                        `/job/${this.job.slug}/${this.job.identifier}`
                    );
                })
                .catch((err) => {
                    this.axiosError(err);
                })
                .finally(() => {
                    this.sending = false;
                });
        },
    },
    computed: {
        ...mapGetters("cover-letter", ["coverLetter"]),
    },
};
</script>