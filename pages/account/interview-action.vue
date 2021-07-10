<template>
    <div class="container">
        <div v-if="processing" class="loading-image">
            <img src="~/assets/images/loading.gif" alt="Loading" />
        </div>
    </div>
</template>

<script>
export default {
    layout: "navless",
    middleware: ["auth"],
    data() {
        return {
            processing: false,
            form: {
                id: this.$route.query.jap,
                action: this.$route.query.action,
            },
        };
    },
    created() {
        this.processing = true;
        this.$axios
            .$post(`account/job-applications/interview-action`, this.form)
            .then((res) => {
                this.swalToast(res.status, res.message);
            })
            .catch((err) => {
                this.axiosError(err);
            })
            .finally(() => {
                this.$router.push("/account/job-applications?status=interview");
            });
    },
};
</script>