<template>
    <section
        v-if="featured_jobs.length > 0"
        class="section home__ft-jobs home-ft-jobs"
    >
        <div class="container">
            <h2 class="section__title section__title--full">
                Pekerjaan Yang Mungkin Kamu Tertarik
            </h2>

            <div class="section__inner">
                <div
                    v-for="(job, i) in featured_jobs"
                    :key="i"
                    class="job-list"
                >
                    <div class="job-list__top">
                        <div class="job-list__top-right">
                            <div class="flex items-center">
                                <div class="logo-sq mr2">
                                    <img
                                        :src="job.company.logo_url"
                                        :alt="job.company.name"
                                        class="img-fluid"
                                    />
                                </div>
                                <div class="job-list__details">
                                    <div class="job-list__title">
                                        {{ job.title }}
                                    </div>
                                    <div class="job-list__company">
                                        {{ job.company.name }}
                                    </div>
                                    <div class="job-list__published-time">
                                        Posted
                                        {{ job.created_at_diff_for_human }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="job-list__top-left">
                            <div class="job-list__info-wrapper">
                                <div class="job-list__info">
                                    <div class="job-list__info-title">
                                        Kategori
                                    </div>
                                    <div class="job-list__info-desc">
                                        {{ job.job_function.name }}
                                    </div>
                                </div>
                                <div class="job-list__info">
                                    <div class="job-list__info-title">
                                        Lokasi
                                    </div>
                                    <div class="job-list__info-desc">
                                        {{ job.city.name }}
                                    </div>
                                </div>
                            </div>
                            <div class="job-list__button">
                                <nuxt-link
                                    :to="`/job/${job.slug}/${job.identifier}`"
                                    class="btn btn--primary btn--block"
                                    title="Info Lanjutan"
                                    >Info Lanjutan</nuxt-link
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            featured_jobs: [],
        };
    },
    created() {
        const params = {
            take: 4,
            status: "published",
            order_by: "random",
            paginate: false,
        };

        const urlParams = new URLSearchParams(params).toString();

        this.$axios
            .$get(`job/search?${urlParams}`)
            .then((res) => {
                this.featured_jobs = res.data;
            })
            .catch((err) => {
                console.log(err.response);
            });
    },
};
</script>