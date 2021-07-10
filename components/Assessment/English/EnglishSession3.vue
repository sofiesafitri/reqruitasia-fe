<template>
    <div>
        <p>
            <strong>
                Play the audio below, then answer the following
                questions!</strong
            >
        </p>

        <audio v-if="questions.audio != undefined" controls>
            <source :src="questions.audio" type="audio/mpeg" />
        </audio>

        <ol>
            <li v-for="(q, i) in questions.questions" :key="i">
                <p>{{ q.question }}</p>

                <ul class="list-no-style">
                    <li v-for="(text, alp) in q.choices" :key="alp">
                        <label class="ir-container"
                            >{{ text }}
                            <input
                                type="radio"
                                :value="alp"
                                :name="`session_3_${i}`"
                                @click="answer({ i, alp })"
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
            type: Object,
            required: true,
        },
    },
    methods: {
        answer(answer) {
            this.$emit("answer", answer);
        },
    },
};
</script>