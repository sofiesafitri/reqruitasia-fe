<template>
    <div>
        <h1>{{ title[active_menu] }}</h1>
        <div v-if="loading" class="loading-image">
            <img src="~/assets/images/loading.gif" alt="Loading" />
        </div>
        <template v-else>
            <div v-if="job_applications.length > 0" class="clearfix mxn2">
                <div
                    v-for="(jap, i) in job_applications"
                    :key="i"
                    class="sm-col sm-col-12 md-col-6 p2"
                >
                    <JobApplicationCard :jap="jap" />
                </div>

                <div class="clearfix"></div>
                <div
                    v-if="pagination_data.next_page_url != ''"
                    class="flex justify-center mt-3"
                >
                    <button
                        type="button"
                        class="btn btn--lg btn--primary"
                        @click="showMore"
                        :disabled="loading"
                    >
                        <span v-if="loading">Memuat...</span>
                        <span v-else
                            ><i class="icon-arrow-down"></i> Selanjutnya</span
                        >
                    </button>
                </div>
            </div>
            <div v-else class="jap__not-found">
                <div class="image">
                    <img
                        src="~/assets/images/content-images/lonely.png"
                        alt="Not found"
                        class="img-fluid"
                    />
                </div>
                <div class="center mt-3 mb-3">
                    <strong>Upps</strong>, tidak ditemukan.
                </div>
                <div class="button-cta">
                    <nuxt-link
                        to="/explore-jobs"
                        title="cari Pekerjaan"
                        class="btn btn--primary"
                        >Cari Pekerjaan</nuxt-link
                    >
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import JobApplicationCard from "~/components/Share/Job/JobApplicationCard";

export default {
    props: {
        job_applications: {
            type: Array,
            required: true,
        },
        pagination: {
            type: Object,
            required: true,
        },
        active_menu: {
            type: String,
            required: true,
        },
    },
    components: {
        JobApplicationCard,
    },
    data() {
        return {
            pagination_data: this.pagination,
            loading: false,
            title: {
                all: "Semua",
                pending: "Menunggu",
                shortlisted: "Daftar Pendek",
                interview: "Wawancara",
                offered: "Ditawarkan",
                hired: "Dipekerjakan",
                unsuitable: "Ditolak",
            },
        };
    },
    created() {
        this.$bus.$on("loading-japs", () => {
            this.loading = true;
        });
        this.$bus.$on("loading-japs-finish", () => {
            this.loading = false;
        });
    },
    methods: {
        showMore() {
            this.loading = true;
            this.$axios.setBaseURL("");
            this.$axios
                .$get(this.pagination_data.next_page_url)
                .then((res) => {
                    let result = res.data;
                    this.pagination_data = result;
                    result.job_applications.forEach((jap) => {
                        this.job_applications.push(jap);
                    });
                })
                .catch((err) => {
                    console.log(err.response);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>