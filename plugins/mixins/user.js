import Vue from "vue";
import { mapState } from "vuex";

const User = {
    install(Vue, options) {
        Vue.mixin({
            computed: {
                ...mapState("auth", {
                    user: state => state.user,
                    authenticated: state => state.loggedIn
                })
            },
            methods: {
                getUserFurtherData() {
                    // this.$axios.$get("user/further-data").then(res => {
                    //     let data = res.data;
                    //     this.user_points = parseInt(data.points);
                    //     this.$bus.$emit("update-user-points", this.user_points);
                    // });
                }
            }
        });
    }
};

Vue.use(User);
