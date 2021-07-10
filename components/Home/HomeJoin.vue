<template>
    <section class="section home__join home-join">
        <div class="home-join__image">
            <img :src="banner" alt="Join us" class="img-fluid" />
        </div>
        <div class="home-join__cta center">
            <h3>Come Join Us!</h3>
            <nuxt-link
                to="/auth/register"
                class="btn btn--lg btn---long btn--primary"
                title="Daftar"
                >Join Us</nuxt-link
            >
        </div>
    </section>
</template>

<script>
export default {
    props: {
        banner: {
            type: String,
            required: true,
        },
    },
};
</script>