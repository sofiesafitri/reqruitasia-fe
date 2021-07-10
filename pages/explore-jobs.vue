<template>
    <div class="container">
        <JobSearchForm :data="explore_data" @update_result="updateResult" />
        <JobSearchResult :data="job_data" />
    </div>
</template>

<script>
import JobSearchForm from "~/components/ExploreJobs/JobSearchForm";
import JobSearchResult from "~/components/ExploreJobs/JobSearchResult";

export default {
    components: {
        JobSearchForm,
        JobSearchResult,
    },
    head() {
        return {
            bodyAttrs: {
                class: "explore-jobs",
            },
            title: `Pencarian Pekerjaan`,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: `Hasil pencarian pekerjaan`,
                },
                {
                    hid: `og:title`,
                    property: "og:title",
                    content: `Pencarian Pekerjaan`,
                },
                {
                    hid: `og:url`,
                    property: "og:url",
                    content: this.current_page_url,
                },
                {
                    hid: `og:description`,
                    property: "og:description",
                    content: `Hasil pencarian pekerjaan`,
                },
            ],
        };
    },
    async asyncData({ $axios, query }) {
        let { data } = await $axios.$get("explore-jobs");
        const baseUrl = process.env.APP_BASE_URL;

        data = {
            ...data,
            keyword: query.keyword !== undefined ? query.keyword : "",
        };

        return {
            explore_data: data,
            job_data: null,
            current_page_url: `${baseUrl}/explore-jobs`,
        };
    },
    created() {
        const params = {
            status: "published",
        };

        if (this.explore_data.keyword !== "") {
            params["keyword"] = this.explore_data.keyword;
        }

        const urlParams = new URLSearchParams(params).toString();

        this.$axios
            .$get(`job/search?${urlParams}`)
            .then((res) => {
                this.job_data = res.data;
            })
            .catch((err) => {
                console.log(err.response);
            });
    },
    methods: {
        updateResult(data) {
            this.job_data = data;
        },
    },
};
</script>