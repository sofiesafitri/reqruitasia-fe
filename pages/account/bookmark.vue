<template>
    <div class="container">
        <h1 class="section__title section__title--left">Bookmarks</h1>

        <div v-if="bookmarks.length > 0" class="job-grid mb3">
            <template v-for="(bm, i) in bookmarks">
                <JobCard :job="bm.job" :key="i" />
            </template>
        </div>

        <button
            v-if="next_page_url != ''"
            class="btn btn-outline btn-outline--primary btn--block"
            :disabled="loading"
            @click="next"
        >
            <span v-if="!loading">Tampilkan Lagi</span>
            <span v-else>Memprosess...</span>
        </button>
    </div>
</template>

<script>
export default {
    middleware: ["auth"],
    head() {
        return {
            title: this.meta_title,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.meta_description,
                },
            ],
        };
    },
    async asyncData({ $axios }) {
        const { data } = await $axios.$get("account/bookmarks");

        return {
            meta_title: data.meta_title,
            meta_description: data.meta_description,
            bookmarks: data.bookmarks,
            per_page: data.per_page,
            current_page: data.current_page,
            next_page_url: data.next_page_url,
            prev_page_url: data.prev_page_url,
            loading: false,
        };
    },
    created() {
        this.$nuxt.$on("bookmark_deleted", (bookmark_id) => {
            const index = this.bookmarks.findIndex(
                (bm) => bm.id === bookmark_id
            );

            if (index > -1) {
                this.bookmarks.splice(index, 1);
            }
        });
    },
    methods: {
        next() {
            this.loading = true;
            this.$axios
                .$get(this.next_page_url)
                .then((res) => {
                    const data = res.data;
                    this.bookmarks.push(...data.bookmarks);
                    this.current_page = data.current_page;
                    this.next_page_url = data.next_page_url;
                    this.prev_page_url = data.prev_page_url;
                })
                .catch((err) => {
                    this.axiosError(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>