<template>
    <aside>
        <div class="card card--over-show">
            <div class="card__body">
                <div class="myo__progress">
                    <h2>Kelengkapan Profile</h2>

                    <div
                        :class="`progress-bar progress-bar--${completion.percentage}`"
                    ></div>

                    <div class="myo__progress-list">
                        <ul>
                            <li>
                                <a
                                    href="#myo__basic"
                                    title="Info Dasar"
                                    v-smooth-scroll
                                >
                                    <span
                                        class="name"
                                        :class="{
                                            completed: completion.basic_info,
                                        }"
                                        >Info Dasar</span
                                    >
                                    <span
                                        v-if="completion.basic_info"
                                        class="icon text--success"
                                        ><i class="icon-tick-square"></i
                                    ></span>
                                    <span v-else class="icon text--danger"
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
                                    <span
                                        class="name"
                                        :class="{ completed: completion.about }"
                                        >Tentang Saya</span
                                    >
                                    <span
                                        v-if="completion.about"
                                        class="icon text--success"
                                        ><i class="icon-tick-square"></i
                                    ></span>
                                    <span v-else class="icon text--danger"
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
                                    <span
                                        class="name"
                                        :class="{
                                            completed: completion.experiences,
                                        }"
                                        >Pengalaman Kerja</span
                                    ><span
                                        v-if="completion.experiences"
                                        class="icon text--success"
                                        ><i class="icon-tick-square"></i
                                    ></span>
                                    <span v-else class="icon text--danger"
                                        ><i class="icon-arrow-right-2"></i
                                    ></span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#myo__organization-experiences"
                                    title="Pengalaman Organisasi"
                                    v-smooth-scroll
                                >
                                    <span
                                        class="name"
                                        :class="{
                                            completed:
                                                completion.organization_experiences,
                                        }"
                                        >Pengalaman Organisasi</span
                                    ><span
                                        v-if="
                                            completion.organization_experiences
                                        "
                                        class="icon text--success"
                                        ><i class="icon-tick-square"></i
                                    ></span>
                                    <span v-else class="icon text--danger"
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
                                    <span
                                        class="name"
                                        :class="{
                                            completed: completion.educations,
                                        }"
                                        >Pendidikan</span
                                    ><span
                                        v-if="completion.educations"
                                        class="icon text--success"
                                        ><i class="icon-tick-square"></i
                                    ></span>
                                    <span v-else class="icon text--danger"
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
                                    <span
                                        class="name"
                                        :class="{
                                            completed: completion.skills,
                                        }"
                                        >Keahlian</span
                                    ><span
                                        v-if="completion.skills"
                                        class="icon text--success"
                                        ><i class="icon-tick-square"></i
                                    ></span>
                                    <span v-else class="icon text--danger"
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
                                    <span
                                        class="name"
                                        :class="{
                                            completed: completion.awards,
                                        }"
                                        >Penghargaan</span
                                    ><span
                                        v-if="completion.awards"
                                        class="icon text--success"
                                        ><i class="icon-tick-square"></i
                                    ></span>
                                    <span v-else class="icon text--danger"
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
                                    <span
                                        class="name"
                                        :class="{
                                            completed: completion.interest,
                                        }"
                                        >Minat Pekerjaan</span
                                    ><span
                                        v-if="completion.interest"
                                        class="icon text--success"
                                        ><i class="icon-tick-square"></i
                                    ></span>
                                    <span v-else class="icon text--danger"
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
                                    <span
                                        class="name"
                                        :class="{
                                            completed: completion.resume,
                                        }"
                                        >Resume</span
                                    ><span
                                        v-if="completion.resume"
                                        class="icon text--success"
                                        ><i class="icon-tick-square"></i
                                    ></span>
                                    <span v-else class="icon text--danger"
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
                                    <span
                                        class="name"
                                        :class="{
                                            completed: completion.portofolio,
                                        }"
                                        >Social Passport</span
                                    ><span
                                        v-if="completion.portofolio"
                                        class="icon text--success"
                                        ><i class="icon-tick-square"></i
                                    ></span>
                                    <span v-else class="icon text--danger"
                                        ><i class="icon-arrow-right-2"></i
                                    ></span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#myo__video"
                                    title="Video"
                                    v-smooth-scroll
                                >
                                    <span
                                        class="name"
                                        :class="{
                                            completed: completion.video,
                                        }"
                                        >Video</span
                                    ><span
                                        v-if="completion.video"
                                        class="icon text--success"
                                        ><i class="icon-tick-square"></i
                                    ></span>
                                    <span v-else class="icon text--danger"
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
                                    <span
                                        class="name"
                                        :class="{
                                            completed:
                                                completion.english_assessment,
                                        }"
                                        >Tes Bahasa Inggris</span
                                    ><span
                                        v-if="completion.english_assessment"
                                        class="icon text--success"
                                        ><i class="icon-tick-square"></i
                                    ></span>
                                    <span v-else class="icon text--danger"
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
                                    <span
                                        class="name"
                                        :class="{
                                            completed:
                                                completion.personality_test,
                                        }"
                                        >Tes Personality</span
                                    ><span
                                        v-if="completion.personality_test"
                                        class="icon text--success"
                                        ><i class="icon-tick-square"></i
                                    ></span>
                                    <span v-else class="icon text--danger"
                                        ><i class="icon-arrow-right-2"></i
                                    ></span>
                                </a>
                            </li>
                        </ul>
                    </div>
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
        completion: {
            type: Object,
            required: true,
        },
    },
};
</script>
