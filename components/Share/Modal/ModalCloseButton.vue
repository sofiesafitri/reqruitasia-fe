<template>
    <button
        type="button"
        class="btn btn--grey mr2 close-modal"
        @click="closeModal"
    >
        Batal
    </button>
</template>

<script>
export default {
    props: {
        target: {
            type: String,
            required: true,
        },
    },
    methods: {
        closeModal() {
            this.$bus.$emit("close-modal", this.target);
        },
    },
};
</script>