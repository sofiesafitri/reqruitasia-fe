<template>
    <div class="container">
        <JobDetail :job="job" :job_application="job_application" />
    </div>
</template>

<script>
import JobDetail from "~/components/Job/JobDetail";

export default {
    components: {
        JobDetail,
    },
    head() {
        return {
            title: this.meta_title,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.meta_description,
                },
                {
                    hid: `og:title`,
                    property: "og:title",
                    content: this.meta_title,
                },
                {
                    hid: `og:url`,
                    property: "og:url",
                    content: this.current_page_url,
                },
                {
                    hid: `og:description`,
                    property: "og:description",
                    content: this.meta_description,
                },
            ],
        };
    },
    async asyncData({ $axios, params }) {
        let { data } = await $axios.$get(
            `job/${params.slug}/${params.identifier}`
        );
        let baseUrl = process.env.APP_BASE_URL;

        return {
            meta_title: data.meta_title,
            meta_description: data.meta_description,
            job: data.job,
            job_application: data.job_application,
            current_page_url: `${baseUrl}/job/${data.job.slug}/${data.job.identifier}`,
        };
    },
};
</script>