<template>
  <div class="my4">
    <h1 class="col-11 mx-auto my3">Our Latest News</h1>
    <div class="insights">

      <div class="col-11 mx-auto news-one">
        <div class="col-6 mx2 preview-image" v-html="getImageUrl(articles[0].content)"></div>
        <div class="col-6 mx2 preview-text my-auto">
          <span>{{ articles[0].created_at | format_date }}</span>
          <h3>{{ articles[0].title }}</h3>
          <p>{{ preview(articles[0].content) }}</p>
          <nuxt-link :to="`/blog/${articles[0].slug}`" :title="articles[0].title" class="underline">Read more</nuxt-link>
        </div>  
      </div>

      <div class="col-11 mx-auto my2 flex">

        <div class="col-6 mx2 news-second">
          <div class="preview-image" v-html="getImageUrl(articles[1].content)"></div>
          <nuxt-link :to="`/blog/${articles[1].slug}`" :title="articles[1].title" class="title-news">
            <span class="color-white">{{ articles[1].created_at | format_date }}</span>
            <h3 class="color-white">{{ articles[1].title }}</h3>
          </nuxt-link>
        </div>

         <div class="col-6 mx2 news-second">
          <div class="preview-image" v-html="getImageUrl(articles[2].content)"></div>
          <nuxt-link :to="`/blog/${articles[2].slug}`" :title="articles[2].title" class="title-news">
            <span class="color-white">{{ articles[2].created_at | format_date }}</span>
            <h3 class="color-white">{{ articles[2].title }}</h3>
          </nuxt-link>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import ArticleCard from "~/components/Article/ArticleCard";


export default {

  props : {
    articles : {
      type: Array,
      required: true,
    }
  },

  components: {
        ArticleCard,
  },

  methods : {
    joinTill(arr, count = -1) {
        let sum = ""
        let end = count
        if (count === -1) {
            end = arr.length
        }
    
        for (let i = 0; i < end; i++) {
            if (i >= arr.length) {
                continue
            } else {
                i === 0 ? sum = sum + "" + arr[i] : sum = sum + " " + arr[i]
            }
        }
        return sum + "..."
    },

    wordslpit(text) {
        let sum = []
        let start = 0
        for (let i = 0; i < text.length; i++) {
            if (text[i] === " " || i === text.length-1) {
                let slicer = text.slice(start, i)
                sum.push(slicer)
                start = i + 1;
            }
        }
        return sum
    },

    removeTag(text) {
    let tag = []
    let t = []
    let start = null
    let end = null 
    for (let i = 0; i < text.length; i++) {
        if (text[i] === "<") {
            start = i
        } 
        if (text[i] === ">") {
            end = i+1
            if (start != null && end != null) {
                let slicer = text.slice(start, end)
                tag.push({s:start, e:end, tag:slicer})
            }
        }
    }

    for (let i = 0; i < tag.length; i++) {
        if (i !== tag.length - 1) {
            let split = text.slice(tag[i].e, tag[i + 1].s)
            if (split.length !== 0) {
                t.push(split)
            }
        }
    }
    return { tag:tag, text: t }
    },

    preview(text) {
      let kontent = this.removeTag(text);
      let preview = this.joinTill(kontent.text);

      return this.joinTill(this.wordslpit(preview), 60);
    },

    getImageUrl(text) {
      let kontent = this.removeTag(text);
      let img = kontent.tag[1];
      return img.tag
    }
  }
}
</script>