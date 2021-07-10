<template>
    <div>
        <a
            v-if="type === 'link'"
            href="#"
            :class="class_names"
            @click.prevent="showModal"
        >
            <slot name="content"></slot>
        </a>
        <button
            v-if="type === 'button'"
            type="button"
            @click.prevent="showModal"
            class="btn"
            :class="class_names"
        >
            <slot name="content"></slot>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: "link",
        },
        class_names: {
            type: String,
        },
        target: {
            type: String,
            required: true,
        },
    },
    methods: {
        showModal() {
            this.$bus.$emit("show-modal", this.target);
        },
    },
};
</script>