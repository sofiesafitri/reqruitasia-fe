<template>
    <div>
        <Headhunter> </Headhunter>
    </div>
</template>
<script>
import Headhunter from "~/components/Headhunter/Headhunter.vue"
export default {
  components : {
   Headhunter,
  },
  head() {
    return {
      bodyAttrs: {
      class: "content-no-padding-top homepage",
      },
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
        {
          hid: `og:url`,
          property: "og:url",
          content: this.current_page_url,
        },
        {
          hid: `og:description`,
          property: "og:description",
          content: this.meta_description,
        },
      ],
    };
  },
}
</script>