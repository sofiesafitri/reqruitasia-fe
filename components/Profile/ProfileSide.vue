<template>
    <aside>
        <div class="card card--over-show">
            <div class="card__body">
                <div class="myo__menu">
                    <ul>
                        <li>
                            <a
                                href="#myo__basic"
                                title="Info Dasar"
                                v-smooth-scroll
                            >
                                <span class="name">Info Dasar</span>
                                <span class="icon text--danger"
                                    ><i class="icon-arrow-right-2"></i
                                ></span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#myo__about"
                                title="Tentang Saya"
                                v-smooth-scroll
                            >
                                <span class="name">Tentang Saya</span>
                                <span class="icon text--danger"
                                    ><i class="icon-arrow-right-2"></i
                                ></span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#myo__experiences"
                                title="Pengalaman Kerja"
                                v-smooth-scroll
                            >
                                <span class="name">Pengalaman Kerja</span>
                                <span class="icon text--danger"
                                    ><i class="icon-arrow-right-2"></i
                                ></span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#myo__organization-experiences"
                                title="Pengalaman Kerja"
                                v-smooth-scroll
                            >
                                <span class="name">Pengalaman Organisasi</span>
                                <span class="icon text--danger"
                                    ><i class="icon-arrow-right-2"></i
                                ></span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#myo__educations"
                                title="Pendidikan"
                                v-smooth-scroll
                            >
                                <span class="name">Pendidikan</span>
                                <span class="icon text--danger"
                                    ><i class="icon-arrow-right-2"></i
                                ></span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#myo__skills"
                                title="Keahlian"
                                v-smooth-scroll
                            >
                                <span class="name">Keahlian</span>
                                <span class="icon text--danger"
                                    ><i class="icon-arrow-right-2"></i
                                ></span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#myo__awards"
                                title="Penghargaan"
                                v-smooth-scroll
                            >
                                <span class="name">Penghargaan</span>
                                <span class="icon text--danger"
                                    ><i class="icon-arrow-right-2"></i
                                ></span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#myo__interests"
                                title="Minat Pekerjaan"
                                v-smooth-scroll
                            >
                                <span class="name">Minat Pekerjaan</span>
                                <span class="icon text--danger"
                                    ><i class="icon-arrow-right-2"></i
                                ></span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#myo__resume"
                                title="Resume"
                                v-smooth-scroll
                            >
                                <span class="name">Resume</span>
                                <span class="icon text--danger"
                                    ><i class="icon-arrow-right-2"></i
                                ></span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#myo__portofolio"
                                title="Social Passport"
                                v-smooth-scroll
                            >
                                <span class="name">Social Passport</span>
                                <span class="icon text--danger"
                                    ><i class="icon-arrow-right-2"></i
                                ></span>
                            </a>
                        </li>
                        <li>
                            <a href="#myo__video" title="Video" v-smooth-scroll>
                                <span class="name">Video</span>
                                <span class="icon text--danger"
                                    ><i class="icon-arrow-right-2"></i
                                ></span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#myo__english"
                                title="Tes Bahasa Inggris"
                                v-smooth-scroll
                            >
                                <span class="name">Tes Bahasa Inggris</span>
                                <span class="icon text--danger"
                                    ><i class="icon-arrow-right-2"></i
                                ></span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#myo__personality"
                                title="Tes Personality"
                                v-smooth-scroll
                            >
                                <span class="name">Tes Personality</span
                                ><span class="icon text--danger"
                                    ><i class="icon-arrow-right-2"></i
                                ></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </aside>
</template>

<script>
export default {
    props: {
        user_data: {
            type: Object,
            required: true,
        },
    },
};
</script>
