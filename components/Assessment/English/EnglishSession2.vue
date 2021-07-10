<template>
    <div>
        <div class="hide-tablet">
            <p>
                <strong>
                    Drag and drop the following words to the correct place of
                    the blank underlined part of sentence.</strong
                >
            </p>
        </div>
        <div class="show-tablet">
            <p>
                <strong>
                    Click the blank underline block, then choose the
                    answer.</strong
                >
            </p>
        </div>

        <div
            class="answers-block hide-tablet"
            ondragover="onDragOver(event);"
            ondrop="onDrop(event);"
        >
            <span
                v-for="(c, i) in questions.choices"
                :key="i"
                draggable="true"
                :id="`answer-${i}`"
                class="answer"
                ondragstart="onDragStart(event);"
                :data-text="c.answer"
                >{{ c.answer }}</span
            >
        </div>

        <Modal title="Choose an Answer" name="answer-modal" :footer="true">
            <template v-slot:body>
                <span
                    v-for="(c, i) in questions.choices"
                    :key="i"
                    :id="`answer-mobile-${i}`"
                    class="badge inline-block mr-5 mb-5"
                    @click="answerMobile(c.answer, i)"
                >
                    {{ c.answer }}
                </span>
            </template>
            <template v-slot:footer>
                <div class="flex justify-end">
                    <ModalCloseButton target="answer-modal" />
                </div>
            </template>
        </Modal>

        <div v-html="questions.story" class="mb3"></div>
    </div>
</template>

<script>
import Modal from "~/components/Share/Modal/Modal";
import ModalCloseButton from "~/components/Share/Modal/ModalCloseButton";

export default {
    props: {
        questions: {
            type: Object,
            require: true,
        },
    },
    components: {
        Modal,
        ModalCloseButton,
    },
    data() {
        return {
            selected_block_num: null,
        };
    },
    created() {
        if (process.client) {
            window.onClick = this.onClick;
            window.onDragStart = this.onDragStart;
            window.onDragOver = this.onDragOver;
            window.onDrop = this.onDrop;
            window.preReplaceAnswer = this.preReplaceAnswer;
        }
    },
    methods: {
        onClick(event) {
            if (window.innerWidth <= 768) {
                this.$bus.$emit("show-modal", "answer-modal");

                if (event.target.getAttribute("data-number") != null) {
                    this.selected_block_num = event.target.getAttribute(
                        "data-number"
                    );
                }
            }
        },
        answerMobile(text, answer_block_num) {
            this.$emit("answer", {
                answer_number: parseInt(this.selected_block_num) - 1,
                text: text,
            });

            const html = `<span 
                draggable="true" 
                id="answer-${this.selected_block_num}" 
                onclick="preReplaceAnswer(event)" 
                ondragstart="onDragStart(event);" 
                data-text="${text}" 
                data-answer-block="${answer_block_num}" 
                class="answer"
            >${text}</span>`;

            const answerTargetEl = document.getElementById(
                `answer-line-${this.selected_block_num}`
            );

            const existingAnswerEl = answerTargetEl.querySelector(".answer");

            if (existingAnswerEl != null) {
                const prevSelectedBlockNum = existingAnswerEl.getAttribute(
                    "data-answer-block"
                );
                document
                    .getElementById(`answer-mobile-${prevSelectedBlockNum}`)
                    .classList.remove("badge--dimmed");
            }

            answerTargetEl.classList.add("has-answer");
            document
                .getElementById(`answer-mobile-${answer_block_num}`)
                .classList.add("badge--dimmed");
            answerTargetEl.innerHTML = "";
            answerTargetEl.innerHTML = html;

            this.$bus.$emit("close-modal", "answer-modal");
        },
        preReplaceAnswer(event) {
            this.selected_block_num = event.target.parentElement.getAttribute(
                "data-number"
            );
        },
        onDragStart(event) {
            event.dataTransfer.setData("text/plain", event.target.id);

            const parentEl = event.target.parentElement;
            parentEl.classList.remove("has-answer");

            if (parentEl.classList.contains("blank-underline")) {
                const answer_number =
                    parseInt(parentEl.getAttribute("data-number")) - 1;
                this.$emit("dragstart", answer_number);
            }
        },
        onDragOver(event) {
            event.preventDefault();
        },
        onDrop(event) {
            event.preventDefault();
            event.stopPropagation();

            const id = event.dataTransfer.getData("text");
            const draggableElement = document.getElementById(id);
            const dropzone = event.target;

            if (dropzone.classList.contains("blank-underline")) {
                if (!dropzone.hasChildNodes()) {
                    const answer_number =
                        parseInt(dropzone.getAttribute("data-number")) - 1;

                    this.$emit("answer", {
                        answer_number: answer_number,
                        text: draggableElement.getAttribute("data-text"),
                    });

                    dropzone.classList.add("has-answer");
                    dropzone.appendChild(draggableElement);
                    event.dataTransfer.clearData();
                }
            } else {
                if (!dropzone.classList.contains("answer")) {
                    dropzone.appendChild(draggableElement);
                    event.dataTransfer.clearData();
                }
            }
        },
    },
};
</script>