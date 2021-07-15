<template>
    <div class="container">
        <div class="articles clearfix mxn2">
            <div
                v-for="(article, i) in articles"
                :key="i"
                class="articles__item col col-6 px2 mb3"
            >
                <ArticleCard :article="article" />
            </div>
        </div>
    </div>
</template>

<script>
import ArticleCard from "~/components/Article/ArticleCard";
export default {
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
            ],
        };
    },
    components: {
        ArticleCard,
    },
    async asyncData({ $axios }) {
        let { data } = await $axios.$get(`articles`);
        return {
            articles: data.articles,
            meta_title: data.meta_title,
            meta_description: data.meta_description,
        };
    },
};
</script>