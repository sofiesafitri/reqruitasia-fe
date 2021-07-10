<template>
    <div :class="{ 'logo-center': center }">
        <img
            :src="logo_url"
            :alt="site_name"
            class="img-fluid"
            :width="width"
        />
    </div>
</template>

<script>
export default {
    props: {
        center: {
            type: Boolean,
            default: false,
        },
        width: {
            type: String,
            default: "160px",
        },
    },
    data() {
        return {
            site_name: this.$store.getters.site_name,
            logo_url: this.$store.getters.logo.frontend,
        };
    },
};
</script>