<template>
    <div>
        <div v-if="data === null" class="loading-image">
            <img src="~/assets/images/loading.gif" alt="Loading" />
        </div>
        <template v-else>
            <h2
                class="section__title section__title--small section__title--left"
            >
                Menampilkan {{ data.showing_items_count }} lowongan dari
                {{ data.total }}
            </h2>

            <!-- <div class="section__right">
                <div class="select form__control form__control--border">
                    <select name="sort" id="sort" v-model="sort">
                        <option value="recommended">Recomendasi</option>
                        <option value="new">Terbaru</option>
                        <option value="relevancy">Paling Relevan</option>
                    </select>
                    <span class="focus"></span>
                </div>
            </div> -->

            <div class="section__inner">
                <div v-if="searching" class="loading-image">
                    <img src="~/assets/images/loading.gif" alt="Loading" />
                </div>
                <div v-else>
                    <div v-if="data.jobs.length > 0" class="job-grid">
                        <template v-for="(job, i) in data.jobs">
                            <JobCard :job="job" :key="i" />
                        </template>
                    </div>
                    <div v-else class="job-not-found">
                        <div class="icon"><i class="icon-info-circle"></i></div>
                        <div class="h3">Hasil tidak ditemukan</div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import JobCard from "~/components/Share/Job/JobCard";

export default {
    props: {
        data: {
            type: Object,
            required: false,
        },
    },
    components: {
        JobCard,
    },
    data() {
        return {
            sort: "recommended",
            searching: false,
        };
    },
    created() {
        this.$bus.$on("search_job", () => {
            this.searching = true;
        });

        this.$bus.$on("search_job_finish", () => {
            this.searching = false;
        });
    },
};
</script>