<template>
    <div class="container jap">
        <client-only>
            <VueStickySidebar
                class="jap__side"
                containerSelector=".container"
                innerWrapperSelector=".jap__side--inner"
                :topSpacing="70"
                :minWidth="992"
            >
                <JobApplicationSide
                    @navigate="navigate"
                    :active_menu="active_menu"
                />
            </VueStickySidebar>
        </client-only>

        <main class="jap__main">
            <All
                v-if="active_menu == 'all'"
                :data="data"
                @navigate="navigate"
            />
            <List
                v-else
                :active_menu="active_menu"
                :job_applications="job_applications"
                :pagination="pagination"
            />
        </main>
    </div>
</template>

<script>
import JobApplicationSide from "~/components/Account/JobApplications/JobApplicationSide";
import All from "~/components/Account/JobApplications/All";
import List from "~/components/Account/JobApplications/List";

export default {
    middleware: ["auth"],
    components: {
        JobApplicationSide,
        All,
        List,
    },
    head() {
        return {
            title: this.data.meta_title,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.data.meta_description,
                },
            ],
        };
    },
    async asyncData({ $axios, query }) {
        const active_menu = query.hasOwnProperty("status")
            ? query.status
            : "all";

        let jap_numbers = {};
        let job_applications = [];
        if (active_menu == "all") {
            let { data } = await $axios.$get("account/job-applications");
            jap_numbers = data;
        } else {
            let { data } = await $axios.$get(
                `account/job-applications-status/${active_menu}`
            );
            job_applications = data.job_applications;
        }

        return {
            data: jap_numbers,
            active_menu: active_menu,
            job_applications: job_applications,
            pagination: {
                current_page: "",
                next_page_url: "",
                prev_page: "",
                prev_page_url: "",
            },
        };
    },
    methods: {
        navigate(to) {
            this.active_menu = to;
            this.job_applications = [];
            this.$bus.$emit("loading-japs");

            if (to == "all") {
                this.$axios
                    .$get("account/job-applications")
                    .then((res) => {
                        this.data = res.data;
                        history.pushState(
                            {},
                            null,
                            `/account/job-applications`
                        );
                    })
                    .catch((err) => {
                        this.axiosError(err);
                    })
                    .finally(() => {
                        this.$bus.$emit("loading-japs-finish");
                    });
                return;
            }

            this.$axios
                .$get(`account/job-applications-status/${to}`)
                .then((res) => {
                    let result = res.data;
                    this.$set(
                        this.pagination,
                        "current_page",
                        result.current_page
                    );
                    this.$set(
                        this.pagination,
                        "next_page_url",
                        result.next_page_url
                    );
                    this.$set(this.pagination, "prev_page", result.prev_page);
                    this.$set(
                        this.pagination,
                        "prev_page_url",
                        result.prev_page_url
                    );
                    this.job_applications = result.job_applications;

                    history.pushState(
                        {},
                        null,
                        `/account/job-applications?status=${to}`
                    );
                })
                .catch((err) => {
                    this.axiosError(err);
                })
                .finally(() => {
                    this.$bus.$emit("loading-japs-finish");
                });
        },
    },
};
</script>