<template>
    <div class="card article-card">
        <div class="card__body">
            <div
                v-if="article.featured_image != ''"
                class="article-card__image"
            >
                <img
                    :src="article.featured_image_url"
                    :alt="article.title"
                    class="img-fluid"
                />
            </div>
            <h3>
                <nuxt-link
                    :to="`/blog/${article.slug}`"
                    :title="article.title"
                    >{{ article.title }}</nuxt-link
                >
            </h3>
            <p>{{ article.excerpt }}</p>
            <div class="article-card__meta">
                <div class="meta-item date">
                    {{ article.created_at | format_date }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        article: {
            type: Object,
            required: true,
        },
    },
    created() {
        console.log(this.article);
    },
};
</script>