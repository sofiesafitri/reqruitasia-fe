<template>
    <section class="section home__testi home-testi">
        <div class="container">
            <h2 class="section__title section__title--full">
                Apa Saja Kata Klien Kami
            </h2>

            <div class="section__inner">
                <div id="home-testi-slider" class="glide">
                    <div class="glide__track" data-glide-el="track">
                        <ul class="glide__slides">
                            <li
                                v-for="(testi, i) in testimonials"
                                :key="i"
                                class="glide__slide"
                            >
                                <div class="testi p3">
                                    <div class="testi__top flex items-center">
                                        <div class="testi__avatar">
                                            <img
                                                :src="testi.avatar_url"
                                                :alt="testi.name"
                                                class="img-fluid"
                                            />
                                        </div>
                                        <div class="testi__user-detail">
                                            <div class="testi__user-name">
                                                {{ testi.name }}
                                            </div>
                                            <div class="testi__user-job">
                                                {{ testi.profession }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="testi__content">
                                        {{ testi.content }}
                                    </div>
                                    <div
                                        class="testi__rating flex items-center"
                                    >
                                        <StarRating :rating="testi.rating" />
                                        <div class="testi__rating-score">
                                            {{ testi.rating }}/10
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="glide__arrows" data-glide-el="controls">
                        <button
                            class="glide__arrow glide__arrow--left"
                            data-glide-dir="<"
                        >
                            <svg>
                                <image
                                    xlink:href="~/assets/images/icons/slider/slide-arrow-left.svg"
                                    alt="rating-dimmed"
                                />
                            </svg>
                        </button>
                        <button
                            class="glide__arrow glide__arrow--right"
                            data-glide-dir=">"
                        >
                            <svg>
                                <image
                                    xlink:href="~/assets/images/icons/slider/slide-arrow-right.svg"
                                    alt="rating-dimmed"
                                />
                            </svg>
                        </button>
                    </div>

                    <div class="glide__bullets" data-glide-el="controls[nav]">
                        <button
                            v-for="i in testimonials.length"
                            :key="i"
                            class="glide__bullet"
                            :data-glide-dir="`=${i}`"
                        ></button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import StarRating from "~/components/Share/StarRating";
import Glide from "@glidejs/glide";

export default {
    props: {
        testimonials: {
            type: Array,
            required: true,
        },
    },
    components: {
        StarRating,
    },
    mounted() {
        new Glide("#home-testi-slider", {
            type: "carousel",
            startAt: 0,
            perView: 2,
            gap: 20,
            autoplay: 6000,
            hoverpause: true,
            breakpoints: {
                992: {
                    perView: 1,
                    peek: {
                        before: 150,
                        after: 150,
                    },
                },
                768: {
                    perView: 1,
                },
            },
        }).mount();
    },
};
</script>