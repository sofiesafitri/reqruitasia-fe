<template>
    <footer class="footer" :style="{ 'background-image': bg_image_url }">
        <div class="container">
            <div class="footer__top clearfix">
                <div class="col col-12 md-col-8 lg-col-8 footer__widget">
                    <div class="footer__about">{{ footer_content }}</div>
                </div>

                <div
                    v-if="footer_menu != undefined"
                    class="col col-12 md-col-4 lg-col-4 footer__widget"
                >
                    <h4 class="footer__widget-title">Informasi</h4>
                    <nav class="footer__widget-nav">
                        <ul>
                            <li v-for="(menu, i) in footer_menu.links" :key="i">
                                <nuxt-link
                                    v-if="menu.type == 'page'"
                                    :to="`/page/${menu.url}`"
                                    class="nav-link"
                                    :title="menu.text"
                                    >{{ menu.text }}</nuxt-link
                                >
                                <a
                                    v-else
                                    :href="menu.url"
                                    :title="menu.text"
                                    class="nav-link"
                                    >{{ menu.text }}</a
                                >
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div class="footer__social">
                <div class="footer__social-cta">Ikuti Sosial Media Kami</div>
                <nav class="footer__social-links">
                    <ul>
                        <li v-if="youtube_link != null">
                            <a
                                :href="youtube_link"
                                title="Youtube"
                                target="_blank"
                            >
                                <svg>
                                    <image
                                        xlink:href="~/assets/images/icons/social/youtube.svg"
                                        alt="Youtube"
                                    />
                                </svg>
                            </a>
                        </li>
                        <li v-if="instagram_link != null">
                            <a
                                :href="instagram_link"
                                title="Instagram"
                                target="_blank"
                            >
                                <svg>
                                    <image
                                        xlink:href="~/assets/images/icons/social/instagram.svg"
                                        alt="Instagram"
                                    />
                                </svg>
                            </a>
                        </li>
                        <li v-if="twitter_link != null">
                            <a
                                :href="twitter_link"
                                title="Twitter"
                                target="_blank"
                            >
                                <svg>
                                    <image
                                        xlink:href="~/assets/images/icons/social/twitter.svg"
                                        alt="Twitter"
                                    />
                                </svg>
                            </a>
                        </li>
                        <li v-if="facebook_link != null">
                            <a
                                :href="facebook_link"
                                title="Facebook"
                                target="_blank"
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
                </nav>
            </div>

            <div class="footer__copyright">
                Powered by
                <a
                    href="https://getfluent.id/"
                    target="_blank"
                    title="getfluent"
                    >getfluent</a
                >
                - &copy; {{ year }} {{ site_name }}. All rights reserved.
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            site_name: this.$store.getters.site_name,
            logo_url: this.$store.getters.logo.light,
            footer_menu: this.$store.getters.menus.footer_menu,
            footer_content: this.$store.getters.footer_content,
            enable_bg_image: this.$store.getters.footer_bg_image_enable,
            bg_image: this.$store.getters.footer_bg_image_url,
            youtube_link: this.$store.getters.social_media.youtube,
            instagram_link: this.$store.getters.social_media.instagram,
            twitter_link: this.$store.getters.social_media.twitter,
            facebook_link: this.$store.getters.social_media.facebook,
            year: new Date().getFullYear(),
        };
    },
    computed: {
        bg_image_url() {
            return this.enable_bg_image == "yes"
                ? `url(${this.bg_image})`
                : "none";
        },
    },
};
</script>