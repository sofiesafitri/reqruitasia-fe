<template>
    <div class="tab__content-item" :class="{ active: is_active }">
        <slot name="content"></slot>
    </div>
</template>

<script>
export default {
    props: {
        name: {
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
        this.$bus.$on("show-tab-content", (target) => {
            this.is_active = this.name === target ? true : false;
            this.$bus.$emit("set-active-tab-nav", target);
        });
    },
};
</script>