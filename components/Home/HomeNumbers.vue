<template>
    <section class="section home__numbers home-numbers">
        <div class="container">
            <div class="section__inner">
                <div class="home-numbers__item">
                    <div class="home-numbers__big-text">
                        {{ home.job_applications_count }}+
                    </div>
                    <div class="home-numbers__small-text">Pelamar Kerja</div>
                </div>

                <div class="home-numbers__item">
                    <div class="home-numbers__big-text">
                        {{ home.companies_count }}+
                    </div>
                    <div class="home-numbers__small-text">Perusahaan</div>
                </div>

                <div class="home-numbers__item">
                    <div class="home-numbers__big-text">
                        {{ home.jobs_count }}+
                    </div>
                    <div class="home-numbers__small-text">Pekerjaan</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        home: {
            type: Object,
            requeried: true,
        },
    },
};
</script>