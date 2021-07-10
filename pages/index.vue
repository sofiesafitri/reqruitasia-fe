<template>
  <div>
    <NewHomeTop/>
    <NewHomeTestimonion  v-if="home.testimonials !== null" :testimonials="home.testimonials"/>
    <NewHomeClient/>
    <NewHomeFeturedJob/>
    <NewHomeInsights v-if="articles !== null" :articles="articles"/>
    <NewHomeSubFooter/>
  </div>
</template>

<script>
import NewHomeTop from "~/components/Home/NewHomeTop.vue"
import NewHomeTestimonion from  "~/components/Home/NewHomeTestimonion.vue"
import NewHomeFeturedJob from "~/components/Home/NewHomeFeturedJob.vue"
import NewHomeSubFooter from "~/components/Home/NewHomeSubFooter.vue"
import NewHomeClient from "~/components/Home/NewHomeClient.vue"
import NewHomeInsights from "~/components/Home/NewHomeInsights.vue"

export default {
  components : {
    NewHomeTop,
    NewHomeTestimonion,
    NewHomeFeturedJob,
    NewHomeClient,
    NewHomeInsights,
    NewHomeSubFooter,
  },
  head() {
    return {
      bodyAttrs: {
      class: "content-no-padding-top homepage",
      },
      title: this.home.meta_title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.home.meta_description,
        },
        {
          hid: `og:title`,
          property: "og:title",
          content: this.home.meta_title,
        },
        {
          hid: `og:url`,
          property: "og:url",
          content: this.current_page_url,
        },
        {
          hid: `og:description`,
          property: "og:description",
          content: this.home.meta_description,
        },
      ],
    };
  },
  async asyncData({ $axios }) {
    let home = await $axios.$get("home");
    let article = await $axios.$get(`articles`);

    let baseUrl = process.env.APP_BASE_URL;

    return {
      articles: article.data.articles,
      home: home.data,
      current_page_url: baseUrl,
    };
  },
  jsonld() {
    return [
      {
        "@context": "https://schema.org/",
        "@type": "WebSite",
        name: this.$store.getters.site_name,
        url: process.env.APP_BASE_URL,
      },
    ];
  },
}
</script>