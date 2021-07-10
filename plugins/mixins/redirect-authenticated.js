export const redirectIfAuthenticatedMixin = {
    beforeMount() {
        if (this.authenticated) {
            this.$router.push("/");
        }
    }
};
