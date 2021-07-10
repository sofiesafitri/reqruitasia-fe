<template>
    <div class="p-company">
        <div class="p-company__banner">
            <div class="logo-sq">
                <img
                    :src="company.logo_url"
                    :alt="company.name"
                    class="img-fluid"
                />
            </div>
            <img
                :src="company.banner_url"
                :alt="company.name"
                class="img-fluid"
            />
        </div>

        <div class="container">
            <section class="p-company__top">
                <div class="p-company__logo">
                    <img
                        :src="company.logo_url"
                        :alt="company.name"
                        class="img-fluid"
                    />
                </div>

                <div class="p-company__details">
                    <h1>{{ company.name }}</h1>
                    <div class="p-company__short-desc">
                        {{ company.short_description }}
                    </div>
                    <div class="p-company__list">
                        <div class="list-detail">
                            <dl>
                                <dt>Lokasi</dt>
                                <dd>
                                    {{ company.address }}<br />
                                    Kecamatan
                                    {{ company.subdistrict.name }},<br />
                                    {{ company.city_name }} -
                                    {{ company.province.name }}<br />
                                    {{ company.pos_code }}
                                </dd>

                                <dt>Telepon</dt>
                                <dd>{{ company.phone }}</dd>

                                <template v-if="company.website_url !== null">
                                    <dt>Website</dt>
                                    <dd>
                                        <a
                                            :href="company.website_url"
                                            :title="company.name"
                                            >{{ company.website_url }}</a
                                        >
                                    </dd>
                                </template>

                                <dt>Industri</dt>
                                <dd>
                                    <div class="flex flex-wrap">
                                        <div
                                            v-for="(
                                                ind, i
                                            ) in company.industries"
                                            :key="i"
                                            class="badge mr2 mb2"
                                        >
                                            <span>{{ ind.name }}</span>
                                        </div>
                                    </div>
                                </dd>
                            </dl>
                        </div>
                        <div class="list-socials">
                            <ul>
                                <li v-if="company.linkedin != ''">
                                    <a
                                        :href="company.linkedin"
                                        title="Linkedin"
                                    >
                                        <svg>
                                            <image
                                                xlink:href="~/assets/images/icons/social/linkedin.svg"
                                                alt="Linkedin"
                                            />
                                        </svg>
                                    </a>
                                </li>
                                <li v-if="company.instagram != ''">
                                    <a
                                        :href="company.instagram"
                                        title="Instagram"
                                    >
                                        <svg>
                                            <image
                                                xlink:href="~/assets/images/icons/social/instagram.svg"
                                                alt="Instagram"
                                            />
                                        </svg>
                                    </a>
                                </li>
                                <li v-if="company.twitter != ''">
                                    <a :href="company.twitter" title="Twitter">
                                        <svg>
                                            <image
                                                xlink:href="~/assets/images/icons/social/twitter.svg"
                                                alt="Twitter"
                                            />
                                        </svg>
                                    </a>
                                </li>
                                <li v-if="company.facebook != ''">
                                    <a
                                        :href="company.facebook"
                                        title="Facebook"
                                    >
                                        <svg>
                                            <image
                                                xlink:href="~/assets/images/icons/social/facebook.svg"
                                                alt="Facebook"
                                            />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <article class="p-company__description">
                <h2 class="block-title">Overview</h2>
                <div class="description" v-html="company.description"></div>
            </article>

            <article class="p-company__images">
                <h2 class="block-title">Gallery</h2>
                <silent-box :gallery="images"></silent-box>
            </article>

            <section class="p-company__jobs">
                <h2 class="block-title">Pekerjaan</h2>

                <div class="job-grid">
                    <template v-for="(job, i) in jobs">
                        <JobCard :job="job" :key="i" />
                    </template>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import JobCard from "~/components/Share/Job/JobCard";

export default {
    components: {
        JobCard,
    },
    head() {
        return {
            bodyAttrs: {
                class: "content-no-padding-top",
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
                    hid: `og:image`,
                    property: "og:image",
                    content: this.company.logo_url,
                },
                {
                    hid: `og:description`,
                    property: "og:description",
                    content: this.meta_description,
                },
            ],
        };
    },
    async asyncData({ $axios, params }) {
        let { data } = await $axios.$get(`company/${params.slug}`);
        let baseUrl = process.env.APP_BASE_URL;

        return {
            meta_title: data.meta_title,
            meta_description: data.meta_description,
            company: data.company,
            jobs: data.jobs,
            images: data.images,
            current_page_url: `${baseUrl}/company/${data.company.slug}`,
        };
    },
};
</script>