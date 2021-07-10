<template>
    <!--this is a header which will show when application is opened on mobile screen -->
    <div class="header-secondary">
        <div class="header-secondary__icon">
            <a href="#" title="Kembali" @click.prevent="back"
                ><i class="icon-arrow-left"></i
            ></a>
        </div>
        <div class="header-secondary__icon">
            <nuxt-link to="/explore-jobs" title="Cari Pekerjaan"
                ><i class="icon-search"></i
            ></nuxt-link>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    methods: {
        back() {
            const route_histories_length = this.routeHistories.length;
            const current_route = this.$route.path;

            if (route_histories_length === 1 || route_histories_length == 0) {
                this.$router.push("/");
                this.backRouteAccessed();
                return;
            }

            const last_route = this.routeHistories[route_histories_length - 1];

            if (last_route === current_route) {
                const target = route_histories_length - 2;
                const last_2_route = this.routeHistories[target];
                this.$router.push(last_2_route);
            } else {
                this.$router.push(last_route);
            }

            this.backRouteAccessed();
        },
        backRouteAccessed() {
            this.$store.dispatch(
                "route-history/backRouteAccessed",
                this.$route.path
            );
        },
    },
    computed: {
        ...mapGetters("route-history", ["routeHistories"]),
    },
};
</script>