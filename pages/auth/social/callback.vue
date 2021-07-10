<template>
    <div class="container">Please wait...</div>
</template>

<script>
export default {
    layout: "navless",
    data() {
        return {
            token: this.$route.query.token ? this.$route.query.token : null,
            error: this.$route.query.error ? this.$route.query.error : null,
            origin: this.$route.query.origin
                ? this.$route.query.origin
                : "register",
        };
    },
    mounted() {
        const token = `Bearer ${this.token}`;
        this.$auth.setToken("local", token);
        this.$auth.strategy._setToken(token);
        this.$auth
            .fetchUser()
            .then(() => {
                return this.$router.push("/account/edit-profile");
            })
            .catch((err) => {
                console.log(err);
                this.$auth.logout();
                return this.$router.push(
                    `/auth/${this.origin}?error=${this.error}`
                );
            });
    },
};
</script>
