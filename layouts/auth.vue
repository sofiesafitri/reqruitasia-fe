<template>
    <div class="auth-layout content-wrapper">
        <div v-if="image != ''" class="auth-layout__image">
            <img :src="image" alt="Auth image" />
        </div>
        <Nuxt />
    </div>
</template>

<script>
export default {
    data() {
        return {
            image: "",
        };
    },
    created() {
        this.$axios
            .$get("auth-data")
            .then((res) => {
                this.image = res.data.auth_image;
            })
            .catch((err) => {
                this.axiosError(err);
            });
    },
};
</script>
