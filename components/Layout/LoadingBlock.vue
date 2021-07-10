<template>
    <div id="loading-block" :class="{ show: show }">
        <img src="~/assets/images/loading.gif" alt="Loading" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
        };
    },
    created() {
        this.$bus.$on("show-loading-block", () => {
            this.show = true;
        });

        this.$bus.$on("hide-loading-block", () => {
            this.show = false;
        });
    },
};
</script>
