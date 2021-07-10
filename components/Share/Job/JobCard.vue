<template>
    <div class="col-12 job-card" :class="{ grow: grow }">
        <div v-if="!grow">
            <div class="job-card__main">
                <div v-if="!job.hide_company" class="job-card__logo">
                    <div>&nbsp;</div>
                    <img
                        :src="job.company.logo_url"
                        :alt="job.company.name"
                        class="img-fluid"
                    />
                </div>
                <div class="job-card__info">
                    <div class="job-card__title mb1">
                        <nuxt-link
                            event=""
                            @click.native="showDetail"
                            :to="`/job/${job.slug}/${job.identifier}`"
                            :title="job.title"
                        >
                            {{ job.title }}
                        </nuxt-link>
                    </div>
                    <div v-if="!job.hide_company" class="job-card__company">
                        <nuxt-link
                            :to="`/company/${job.company.slug}`"
                            :title="job.company.name"
                        >
                            {{ job.company.name }}
                        </nuxt-link>
                    </div>
                    <div class="job-card__location">
                        <i class="icon-location"></i>
                        <span>{{ job.city.name }}</span>
                    </div>
                    <div
                        v-if="job.salary_min > 0 && job.salary_max > 0"
                        class="job-card__salary"
                    >
                        <span
                            >{{ job.salary_currency }}
                            {{ job.salary_min }}
                            -
                            {{ job.salary_max }}</span
                        >
                    </div>
                </div>
            </div>
            <div class="job-card__created-time">
                <i class="icon-time-circle"></i>
                <span>{{ job.created_at | format_date }}</span>
            </div>
            <div
                class="job-card__bookmark"
                :class="{ 'job-card__bookmark--marked': marked }"
                @click="bookmark"
            >
                <i class="icon-bookmark"></i>
            </div>
        </div>  
        <div v-if="grow && job_application !== null" class="job-card__detail">
            <div class="job-card__back">
                <a href="#" title="Kembali" @click.prevent="back"
                    ><i class="icon-arrow-left"></i>
                    <span class="text">Kembali</span></a
                >
            </div>
            <JobDetail :job="job" :job_application="job_application" />
        </div>
    </div>
</template>

<script>
import JobDetail from "~/components/Job/JobDetail";
import BookmarkMixin from "~/plugins/mixins/bookmark";

export default {
    mixins: ["BookmarkMixin"],
    props: {
        job: {
            type: Object,
            required: true,
        },
    },
    components: {
        JobDetail,
    },
    data() {
        return {
            grow: false,
            job_application: null,
        };
    },
    created() {
        if (this.authenticated) {
            const bookmark = this.user.bookmarks.filter(
                (bm) => bm.job_id === this.job.id
            );
            if (bookmark.length > 0) {
                this.marked = true;
                this.bookmark_id = bookmark[0].id;
            }
        }
    },
    methods: {
        showDetail() {
            this.$axios
                .$get(
                    `/job/${this.job.slug}/${this.job.identifier}/applied-status`
                )
                .then((res) => {
                    this.job_application = res.data;
                    this.grow = true;
                    history.pushState(
                        {},
                        null,
                        `/job/${this.job.slug}/${this.job.identifier}`
                    );
                })
                .catch((err) => {
                    this.axiosError(err);
                });
        },
        back() {
            this.grow = false;
            this.job_application = null;
            history.pushState({}, null, this.$route.path);
        },
    },
};
</script>
