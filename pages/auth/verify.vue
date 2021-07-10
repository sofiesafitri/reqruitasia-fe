<template>
    <div class="container">
        <div v-if="error" class="alert alert--error">{{ message }}</div>
        <div v-else class="alert alert--success">
            Verifikasi berhasil.
            <nuxt-link to="/auth/login" title="Login">Login sekarang</nuxt-link
            >.
        </div>
    </div>
</template>

<script>
export default {
    async asyncData({ $axios, query }) {
        try {
            await $axios.$post(`verify-email`, {
                token: query.token,
                email: query.email,
            });

            return {
                error: false,
            };
        } catch (err) {
            console.log(err.response);
            return {
                error: true,
                message: err.response.data.message,
            };
        }
    },
};
</script>
