<template>
    <main class="container py-4 article">
        <div class="title">
            <h1>{{ article.title }}</h1>
        </div>

        <article v-html="article.content"></article>
    </main>
</template>

<script>
export default {
    head() {
        return {
            title: this.article.meta_title,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.article.meta_description,
                },
                {
                    hid: `og:title`,
                    property: "og:title",
                    content: this.article.meta_title,
                },
                {
                    hid: `og:url`,
                    property: "og:url",
                    content: this.current_article_url,
                },
                {
                    hid: `og:description`,
                    property: "og:description",
                    content: this.article.meta_description,
                },
            ],
        };
    },
    async asyncData({ $axios, params }) {
        let { data } = await $axios.$get(`article/${params.slug}`);
        let baseUrl = process.env.APP_BASE_URL;
        return {
            article: data.article,
            current_page_url: `${baseUrl}/article/${data.article.slug}`,
        };
    },
};
</script>