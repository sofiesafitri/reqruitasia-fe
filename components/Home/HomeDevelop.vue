<template>
    <section class="section home__develop home-develop">
        <div class="container">
            <h2 class="section__title">
                Kembangkan Karirmu Disini Bersama Kami
            </h2>
            <div class="section__inner">
                <div class="home-develop__item">
                    <div class="home-develop__text">
                        <div class="home-develop__text-inner">
                            <h3>
                                Cari Pekerjaan <br />
                                Hanya dengan Satu Klik
                            </h3>
                            <p>
                                Dengan adanya fitur cari beserta filter yang
                                akurat, membuat anda mudah dan efisien dalam
                                pemanfaatan waktu dalam mencari pekerjaan
                            </p>
                        </div>
                    </div>
                    <div class="home-develop__image">
                        <img :src="right_image" alt="Right image" />
                    </div>
                </div>

                <div class="home-develop__item">
                    <div class="home-develop__image">
                        <img :src="left_image" alt="Left image" />
                    </div>
                    <div class="home-develop__text right-align">
                        <div class="home-develop__text-inner right-align">
                            <h3>
                                Beragam Kategori Tersedia <br />
                                Untuk Memudahkan Pencarianmu
                            </h3>
                            <p>
                                Dengan beragam kategori yang kami sediakan anda
                                mudah untuk menyesuaikan dengan keahlian anda
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        right_image: {
            type: String,
        },
        left_image: {
            type: String,
        },
    },
};
</script>