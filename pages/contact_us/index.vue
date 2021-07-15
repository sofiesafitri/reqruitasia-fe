<template>
    <div>
        <Contact> </Contact>
    </div>
</template>
<script>
import Contact from "~/components/Contact_Us/Contact.vue"
export default {
  components : {
   Contact,
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