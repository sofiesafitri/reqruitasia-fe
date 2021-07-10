<template>
    <div id="myo__personality" class="card">
        <div class="card__header">
            <div class="card__header-left">
                <div class="card__header-icon">
                    <i class="icon-document"></i>
                </div>
                <h2 class="card__header-title">Tes Personality</h2>
            </div>
            <div class="card__header-right"></div>
        </div>
        <div class="card__body card__body--pad-left">
            <div class="flex justify-center">
                <div v-if="user_data.personal_test.has_data">
                    <div class="mb-3">
                        <strong>Tanggal test</strong>:
                        {{ user_data.personal_test.test_date | format_date }}
                    </div>

                    <nuxt-link
                        v-if="user_data.personal_test.can_redo"
                        to="/assessment/personality"
                        class="btn btn--primary mb-3"
                        title="Mulai Tes"
                        >Mulai Tes Kembali<i class="icon-arrow-right"></i
                    ></nuxt-link>

                    <PersonalTest
                        :personality="personality_test.behaviour.most"
                        personality_name="Most"
                    />

                    <client-only>
                        <LineChart
                            :labels="chartMost.labels"
                            :label="chartMost.label"
                            :data="chartMost.data"
                            :title="chartMost.title"
                        />
                    </client-only>

                    <hr />

                    <PersonalTest
                        :personality="personality_test.behaviour.least"
                        personality_name="Least"
                    />

                    <client-only>
                        <LineChart
                            :labels="chartLeast.labels"
                            :label="chartLeast.label"
                            :data="chartLeast.data"
                            :title="chartLeast.title"
                        />
                    </client-only>
                </div>
                <nuxt-link
                    v-else
                    to="/assessment/personality"
                    class="btn btn--primary"
                    title="Mulai Tes"
                    >Mulai Tes <i class="icon-arrow-right"></i
                ></nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
import PersonalTest from "~/components/Share/PersonalTest/PersonalTest";
import LineChart from "~/components/Share/Chart/LineChart";

export default {
    props: {
        user_data: {
            type: Object,
            required: true,
        },
        personality_test: {
            type: Object,
        },
    },
    components: {
        PersonalTest,
        LineChart,
    },
    data() {
        return {
            chartMost: {
                labels: ["D", "I", "S", "C"],
                label: "Score",
                data: [
                    this.getConversionScore("D", this.personality_test, "most"),
                    this.getConversionScore("I", this.personality_test, "most"),
                    this.getConversionScore("S", this.personality_test, "most"),
                    this.getConversionScore("C", this.personality_test, "most"),
                ],
                title: "Most Behaviour Chart",
            },
            chartLeast: {
                labels: ["D", "I", "S", "C"],
                label: "Score",
                data: [
                    this.getConversionScore(
                        "D",
                        this.personality_test,
                        "least"
                    ),
                    this.getConversionScore(
                        "I",
                        this.personality_test,
                        "least"
                    ),
                    this.getConversionScore(
                        "S",
                        this.personality_test,
                        "least"
                    ),
                    this.getConversionScore(
                        "C",
                        this.personality_test,
                        "least"
                    ),
                ],
                title: "Least Behaviour Chart",
            },
        };
    },
    methods: {
        getConversionScore(char, data, type) {
            if (!this.user_data.personal_test.has_data) {
                return 0;
            }

            const index = data.behaviour[type].total.findIndex(
                (total) => total.char == char
            );
            if (index === -1) {
                return 0;
            }

            return data.behaviour[type].total[index].conversion;
        },
    },
};
</script>