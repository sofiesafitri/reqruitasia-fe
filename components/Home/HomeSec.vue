<template>
<!-- this is componnent  -->
    <section class="home__secondary home-sec glide">
        <div data-glide-el="track" class="glide__track">
            <ul class="glide__slides">
                <li
                    v-for="index in 32"
                    :key="index"
                    class="home-sec__item items-center glide__slide"
                >
                    <img
                        :src="
                            require(`~/assets/images/clients/client-${index}.png`)
                        "
                        alt="Client logo"
                        class="img-fluid"
                    />
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import Glide from "@glidejs/glide";

export default {
    mounted() {
        if (process.client) {
            new Glide(".home__secondary", {
                autoplay: 2000,
                type: "carousel",
                perView: 4,
                gap: 60,
                peek: {
                    before: 20,
                    after: 20,
                },
                breakpoints: {
                    992: {
                        perView: 3,
                    },
                    768: {
                        perView: 3,
                        gap: 40,
                    },
                    576: {
                        perView: 2,
                        gap: 40,
                        peek: {
                            before: 20,
                            after: 20,
                        },
                    },
                },
            }).mount();
        }
    },
};
</script>