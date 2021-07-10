<template>
    <section class="section home__clients home-clients">
        <div class="container">
            <h2 class="section__title">Our Clients</h2>
            <div class="section__inner">
                <div class="home-clients__images clearfix">
                    <div
                        v-for="index in 32"
                        :key="index"
                        class="home-clients__image px3 mb3"
                    >
                        <img
                            :src="
                                require(`~/assets/images/clients/client-${index}.png`)
                            "
                            alt="Client logo"
                            class="img-fluid"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    mounted() {
        if (process.client) {
            const slider = document.querySelector(
                ".home__clients .section__inner"
            );
            let isDown = false;
            let startX;
            let scrollLeft;

            slider.addEventListener("mousedown", (e) => {
                isDown = true;
                slider.classList.add("active");
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });
            slider.addEventListener("mouseleave", () => {
                isDown = false;
                slider.classList.remove("active");
            });
            slider.addEventListener("mouseup", () => {
                isDown = false;
                slider.classList.remove("active");
            });
            slider.addEventListener("mousemove", (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 3; //scroll-fast
                slider.scrollLeft = scrollLeft - walk;
                console.log(walk);
            });
        }
    },
};
</script>