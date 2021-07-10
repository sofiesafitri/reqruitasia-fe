<template>
    <li
        class="tab__nav-item"
        :class="{ active: is_active }"
        @click="showTabContent"
    >
        {{ title }}
    </li>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        target: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            is_active: this.active,
        };
    },
    created() {
        this.$bus.$on("set-active-tab-nav", (target) => {
            this.is_active = this.target === target ? true : false;
        });
    },
    methods: {
        showTabContent() {
            this.$bus.$emit("show-tab-content", this.target);
        },
    },
};
</script>