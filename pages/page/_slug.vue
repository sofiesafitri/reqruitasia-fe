<template>
    <main class="container page py-4">
        <div class="title">
            <h1>{{ page.title }}</h1>
        </div>

        <article v-html="page.content"></article>
    </main>
</template>

<script>
export default {
    head() {
        return {
            title: this.page.meta_title,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.page.meta_description,
                },
                {
                    hid: `og:title`,
                    property: "og:title",
                    content: this.page.meta_title,
                },
                {
                    hid: `og:url`,
                    property: "og:url",
                    content: this.current_page_url,
                },
                {
                    hid: `og:description`,
                    property: "og:description",
                    content: this.page.meta_description,
                },
            ],
        };
    },
    async asyncData({ $axios, params }) {
        let { data } = await $axios.$get(`page/${params.slug}`);
        let baseUrl = process.env.APP_BASE_URL;

        return {
            page: data.page,
            current_page_url: `${baseUrl}/page/${data.page.slug}`,
        };
    },
};
</script>