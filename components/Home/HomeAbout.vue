<template>
    <section class="section home__about home-about">
        <div class="container">
            <h2 class="section__title section__title--left">Tentang Kami</h2>

            <div class="section__inner">
                <div class="home-about__text">
                    <div v-html="home.about_content"></div>
                    <nuxt-link
                        v-if="aboutLink != '' && about_is_nuxtlink"
                        :to="aboutLink"
                        class="btn btn--lg btn--long btn--primary"
                        ><span>Selengkapnya</span>
                        <i class="icon-arrow-right-circle"></i
                    ></nuxt-link>
                    <a
                        v-if="aboutLink != '' && !about_is_nuxtlink"
                        :href="aboutLink"
                        class="btn btn--lg btn--long btn--primary"
                        ><span>Selengkapnya</span>
                        <i class="icon-arrow-right-circle"></i
                    ></a>
                </div>

                <div
                    v-if="
                        home.about_yt_embed != '' &&
                        home.about_video_image_url != ''
                    "
                    class="home-about__video-wrapper"
                >
                    <div class="home-about__video">
                        <img
                            :src="home.about_video_image_url"
                            alt="About us video"
                            class="img-fluid"
                        />
                        <div class="home-about__play-video">
                            <div class="icon-wrapper"><span>&#9658;</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import tingle from "tingle.js";

export default {
    props: {
        home: {
            type: Object,
            requeried: true,
        },
    },
    data() {
        return {
            about_is_nuxtlink: false,
        };
    },
    mounted() {
        // Modal video about
        if (document.querySelector(".home-about__play-video") != null) {
            // instanciate new modal
            const modal = new tingle.modal({
                closeMethods: ["overlay", "button", "escape"],
                closeLabel: "Close",
                cssClass: ["youtube-embed"],
                onClose: function () {
                    modal.setContent("");
                },
            });
            const yt_embed = this.home.about_yt_embed;

            document
                .querySelector(".home-about__play-video")
                .addEventListener("click", function () {
                    // open modal
                    modal.setContent(yt_embed);
                    modal.open();
                });
        }
    },
    computed: {
        aboutLink() {
            let aboutLink = this.home.about_btn_link;
            if (
                aboutLink === null ||
                aboutLink === undefined ||
                aboutLink === ""
            ) {
                return "";
            }

            const url = aboutLink.split("/page/");

            if (url[0] == process.env.APP_BASE_URL) {
                this.about_is_nuxtlink = true;
                aboutLink = `/page/${url[1]}`;
            }

            return aboutLink;
        },
    },
};
</script>