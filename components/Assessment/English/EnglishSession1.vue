<template>
    <div>
        <ol>
            <li v-for="(q, i) in questions" :key="i">
                <p>{{ q.question }}</p>

                <ul class="list-no-style">
                    <li v-for="(ans, ans_i) in q.answers" :key="ans_i">
                        <label class="ir-container"
                            >{{ ans.answer }}
                            <input
                                type="radio"
                                :value="ans.id"
                                :name="`session_1_${i}`"
                                @click="answer({ i, q, ans })"
                            />
                            <span class="checkmark"></span>
                        </label>
                    </li>
                </ul>
            </li>
        </ol>
    </div>
</template>

<script>
export default {
    props: {
        questions: {
            type: Array,
            require: true,
        },
    },
    methods: {
        answer(answer) {
            this.$emit("answer", answer);
        },
    },
};
</script>