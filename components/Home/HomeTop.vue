<template>
    <section class="home__top">
        <div class="home__banner home__banner--desktop">
            <img :src="banner" alt="Reqruit" />
        </div>
        <div class="home__banner home__banner--mobile">
            <img :src="banner_mobile" alt="Reqruit" />
        </div>
        <div class="home__job-search job-search flex flex-column">
            <h2 class="job-search__headline text-center mb3">
                Find your dream jobs
            </h2>
            <div class="job-search__form">
                <form @submit.prevent="searchJob" class="form">
                    <div class="form__group">
                        <div
                            class="input-group input-group--white input-group--lg"
                        >
                            <div
                                class="input-group__prepend input-group__prepend--icon"
                            >
                                <i class="icon-search"></i>
                            </div>
                            <div class="input-group__main">
                                <input
                                    type="search"
                                    class="form__control form__control--bg-white form__control--lg"
                                    name="keyword"
                                    v-model="keyword"
                                    placeholder="Search job, company, or keyword..."
                                />
                            </div>
                            <div class="input-group__append">
                                <button
                                    type="submit"
                                    class="btn btn--lg btn--primary btn--bold"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="home__top-overlay">&nbsp;</div>
    </section>
</template>

<script>
export default {
    props: {
        banner: {
            type: String,
        },
        banner_mobile: {
            type: String,
        },
    },
    data() {
        return {
            keyword: "",
        };
    },
    methods: {
        searchJob() {
            this.$router.push(`/explore-jobs?keyword=${this.keyword}`);
        },
    },
};
</script>