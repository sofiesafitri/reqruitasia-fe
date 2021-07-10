<template>
    <div class="container">
        <h1 class="section__title section__title--left">Tes Personality</h1>

        <div v-if="completed">
            <h3 class="center">Selesai, tunggu sebentar...</h3>
            <div class="loading-image">
                <img src="~/assets/images/loading.gif" alt="Loading" />
            </div>
        </div>

        <div v-else class="card">
            <div class="card__body">
                <p>Pilih 2 macam jawaban.</p>
                <ul class="list-no-style">
                    <li><strong>Most</strong>: Lebih cenderung</li>
                    <li><strong>Least</strong>: Kurang cenderung</li>
                </ul>

                <table v-if="statements.length > 0" class="mt2">
                    <colgroup>
                        <col width="70px" />
                        <col width="70px" />
                        <col />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Most</th>
                            <th>Least</th>
                            <th>Pernyataan</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(statement, choice) in statements[s_number]
                                .statements"
                            :key="choice"
                        >
                            <td class="text-center">
                                <label class="ir-container">
                                    &nbsp;
                                    <input
                                        type="radio"
                                        :value="choice"
                                        name="choice_most"
                                        v-model="user_statements[s_number].most"
                                    />
                                    <span class="checkmark"></span>
                                </label>
                            </td>
                            <td class="text-center">
                                <label class="ir-container">
                                    &nbsp;
                                    <input
                                        type="radio"
                                        :value="choice"
                                        name="choice_least"
                                        v-model="
                                            user_statements[s_number].least
                                        "
                                    />
                                    <span class="checkmark"></span>
                                </label>
                            </td>
                            <td>{{ statement }}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="flex justify-center mt-4">
                    <button
                        v-if="s_number > 0"
                        type="button"
                        class="btn btn-outline btn-outline--primary mr-4"
                        @click="prev"
                        :disabled="processing"
                    >
                        <i class="icon-arrow-left"></i> Prev
                    </button>
                    <button
                        v-if="s_number < statements.length - 1"
                        type="button"
                        class="btn btn-outline btn-outline--primary mr-4"
                        @click="next"
                        :disabled="processing"
                    >
                        Next <i class="icon-arrow-right"></i>
                    </button>
                    <button
                        v-if="s_number === statements.length - 1"
                        type="button"
                        class="btn btn--primary"
                        @click="finish"
                        :disabled="processing"
                    >
                        <span v-if="processing">Processing...</span>
                        <span v-else>Finish</span>
                    </button>
                </div>

                <div
                    class="mt-4"
                    :class="`progress-bar progress-bar--${completion_percent}`"
                ></div>

                <p class="center">
                    {{ s_number + 1 }} / {{ statements.length }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
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
            statements: [],
            s_number: 0,
            completion_percent: 0,
            user_statements: [
                {
                    most: "",
                    least: "",
                },
            ],
            processing: false,
            completed: false,
        };
    },
    created() {
        this.$axios
            .$get("account/assessment/personality")
            .then((res) => {
                const data = res.data;
                this.meta_title = data.meta_title;
                this.meta_description = data.meta_description;
                this.statements = data.statements;
                this.countCompletionPercent();
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    this.swalWrong(err.response.data.message);
                    this.$router.push("/account/edit-profile");
                }
            });
    },
    methods: {
        prev() {
            if (this.s_number === 0) {
                return;
            }

            this.s_number = this.s_number - 1;
            this.countCompletionPercent();
        },
        next() {
            if (this.s_number === this.statements.length - 1) {
                return;
            }

            const process = this.processStatement();
            if (!process) {
                return;
            }

            const nextNum = this.s_number + 1;

            if (this.user_statements[nextNum] === undefined) {
                this.user_statements.push({
                    most: "",
                    least: "",
                });
            }

            this.s_number = nextNum;
            this.countCompletionPercent();
        },
        processStatement() {
            if (this.user_statements[this.s_number].most === "") {
                this.swalWrong("Mohon pilih jawaban Most!");
                return false;
            }

            if (this.user_statements[this.s_number].least === "") {
                this.swalWrong("Mohon pilih jawaban Least!");
                return false;
            }

            return true;
        },
        finish() {
            const process = this.processStatement();
            if (!process) {
                return;
            }

            if (this.s_number !== this.statements.length - 1) {
                return this.swalWrong("Mohon selesaikan tes!");
            }

            this.processing = true;
            this.$bus.$emit("show-loading-block");

            this.$axios
                .$post("/account/assessment/personality", {
                    statements: this.user_statements,
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
        countCompletionPercent() {
            const percentRaw =
                ((this.s_number + 1) / this.statements.length) * 100;
            this.completion_percent = Math.ceil(percentRaw);
        },
    },
};
</script>