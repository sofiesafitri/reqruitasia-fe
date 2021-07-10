<template>
    <div class="job">
        <div class="job__details">
            <div class="job__main-info">
                <div v-if="!job.hide_company" class="logo-sq job__company-logo">
                    <img
                        :src="job.company.logo_url"
                        :alt="job.company.name"
                        class="img-fluid"
                    />
                </div>
                <div class="job__main-info-inner">
                    <h1 class="job__title">{{ job.title }}</h1>
                    <div v-if="!job.hide_company" class="job__company-name">
                        <nuxt-link
                            :to="`/company/${job.company.slug}`"
                            :title="job.company.name"
                            >{{ job.company.name }}</nuxt-link
                        >
                    </div>
                </div>
            </div>

            <div class="job__detail-2">
                <div class="job__detail-2-item">
                    <dl>
                        <dt>Lokasi</dt>
                        <dd>{{ job.city.name }}</dd>

                        <dt>Tipe Pekerjaan</dt>
                        <dd>{{ job.type.description }}</dd>
                    </dl>
                </div>
                <div class="job__detail-2-item">
                    <dl>
                        <dt>Kategory</dt>
                        <dd>{{ job.job_function.name }}</dd>

                        <dt>Pengalaman Kerja</dt>
                        <dd>{{ job.work_experience.description }}</dd>
                    </dl>
                </div>
            </div>

            <div class="job__detail-acc">
                <Accordion title="Skills">
                    <template v-slot:panel>
                        <div class="job__skills">
                            <div class="job__skills-item must-skills">
                                <p><strong>Skill Wajib:</strong></p>
                                <ul>
                                    <li
                                        v-for="(skill, i) in job.must_skills"
                                        :key="i"
                                    >
                                        {{ skill.name }}
                                    </li>
                                </ul>
                            </div>
                            <div class="job__skills-item nice-skills">
                                <p><strong>Skill Opsional:</strong></p>
                                <ul>
                                    <li
                                        v-for="(skill, i) in job.nice_skills"
                                        :key="i"
                                    >
                                        {{ skill.name }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </template>
                </Accordion>
                <Accordion title="Gaji">
                    <template v-slot:panel>
                        <div class="job__salary">
                            <div class="job__salary-item common-salary">
                                <dl>
                                    <dt
                                        v-if="
                                            job.salary_min > 0 &&
                                            job.salary_max > 0
                                        "
                                    >
                                        Gaji Pokok
                                    </dt>
                                    <dd
                                        v-if="
                                            job.salary_min > 0 &&
                                            job.salary_max > 0
                                        "
                                    >
                                        {{ job.salary_currency }}
                                        {{ job.salary_min }} -
                                        {{ job.salary_max }}
                                    </dd>

                                    <dt>Durasi Gaji</dt>
                                    <dd>
                                        {{ job.salary_duration.description }}
                                    </dd>
                                </dl>
                            </div>
                            <div class="job__salary-item bonus-salary">
                                <dl>
                                    <dt>Gaji Bonus</dt>
                                    <dd>
                                        <span v-if="job.bonus_salary"
                                            >{{ job.salary_currency }}
                                            {{ job.salary_min }} -
                                            {{ job.salary_max }}</span
                                        >
                                        <span v-else>Tidak ada</span>
                                    </dd>

                                    <template v-if="job.bonus_salary">
                                        <dt>Durasi Gaji Bonus</dt>
                                        <dd>
                                            {{
                                                job.bonus_salary_duration
                                                    .description
                                            }}
                                        </dd>
                                    </template>
                                </dl>
                            </div>
                        </div>
                    </template>
                </Accordion>

                <Accordion title="Deskripsi">
                    <template v-slot:panel>
                        <div class="pre-line" v-html="job.description"></div>
                    </template>
                </Accordion>
            </div>
        </div>

        <div class="job-company">
            <div class="job-company__inner">
                <div
                    class="job-company__bookmark"
                    :class="{ 'job-company__bookmark--marked': marked }"
                    @click="bookmark"
                >
                    <i class="icon-bookmark"></i>
                </div>
                <div v-if="!job.hide_company" class="job-company__logo">
                    <div class="logo-sq">
                        <img
                            :src="job.company.logo_url"
                            :alt="job.company.name"
                            class="img-fluid"
                        />
                    </div>
                </div>
                <div v-if="!job.hide_company" class="job-company__name">
                    <nuxt-link
                        :to="`/company/${job.company.slug}`"
                        :title="job.company.name"
                        >{{ job.company.name }}</nuxt-link
                    >
                </div>
                <div class="job-company__city">{{ job.city_name }}</div>
                <div class="job-company__website">
                    <a
                        :href="job.company.website_url"
                        :title="job.company.name"
                        >{{ job.company.website_url }}</a
                    >
                </div>
                <template v-if="job_application.applied">
                    <div class="center mt-2">
                        <h3>Sudah Melamar</h3>
                        <p>Status: {{ job_application.status.description }}</p>
                    </div>
                    <div class="job-company__button">
                        <button
                            type="button"
                            @click="cancelJobApplication"
                            class="btn btn--primary btn--block submit-confirm"
                            title="Batalkan Lamaran"
                            :disabled="processing"
                        >
                            <span v-if="!processing">Batalkan Lamaran</span>
                            <span v-else>Memproses</span>
                        </button>
                    </div>
                </template>
                <div v-else class="job-company__button">
                    <ModalTrigger
                        type="button"
                        class_names="btn btn--primary btn--block"
                        target="apply-job-modal"
                    >
                        <template v-slot:content> Apply </template>
                    </ModalTrigger>
                </div>
                <div class="job-company__share">
                    <span class="social-link facebook">
                        <a
                            :href="`https://www.facebook.com/sharer/sharer.php?u=${current_url}`"
                            target="_blank"
                            title="Facebook"
                        >
                            <svg>
                                <image
                                    xlink:href="~/assets/images/icons/social/facebook.svg"
                                    alt="Facebook"
                                />
                            </svg>
                        </a>
                    </span>
                    <span class="social-link twitter">
                        <a
                            :href="`https://twitter.com/intent/tweet?url=${current_url}&text=Lowongan%20kerja`"
                            target="_blank"
                            title="Twitter"
                        >
                            <svg>
                                <image
                                    xlink:href="~/assets/images/icons/social/twitter.svg"
                                    alt="Twitter"
                                />
                            </svg>
                        </a>
                    </span>
                    <span class="social-link whatsapp">
                        <a
                            :href="`https://api.whatsapp.com/send?text=${current_url}`"
                            target="_blank"
                            title="whatsapp"
                        >
                            <svg>
                                <image
                                    xlink:href="~/assets/images/icons/social/whatsapp.svg"
                                    alt="Twitter"
                                />
                            </svg>
                        </a>
                    </span>
                    <span class="social-link linkedin">
                        <a
                            :href="`http://www.linkedin.com/shareArticle?mini=true&url=${current_url}`"
                            target="_blank"
                        >
                            <svg>
                                <image
                                    xlink:href="~/assets/images/icons/social/linkedin.svg"
                                    alt="Twitter"
                                    title="Twitter"
                                />
                            </svg>
                        </a>
                    </span>
                    <span class="social-link email">
                        <a :href="`mailto:?&subject=&body=${current_url}`">
                            <svg>
                                <image
                                    xlink:href="~/assets/images/icons/social/mail.svg"
                                    alt="Twitter"
                                    title="Email"
                                />
                            </svg>
                        </a>
                    </span>
                </div>
            </div>
        </div>

        <Modal title="Lamar Pekerjaan" name="apply-job-modal" :footer="true">
            <template v-slot:body>
                <div class="form__group">
                    <label class="cb-container"
                        >Tulis surat lamaran?
                        <input
                            type="checkbox"
                            name="have_cover_letter"
                            v-model="form.have_cover_letter"
                        />
                        <span class="checkmark"></span>
                    </label>
                    <span
                        v-if="errors.have_cover_letter"
                        class="invalid-feedback"
                        role="alert"
                    >
                        {{ errors.have_cover_letter[0] }}
                    </span>
                </div>
                <div v-if="form.have_cover_letter" class="form__group">
                    <label class="form__label" for="about">Surat Lamaran</label>
                    <textarea
                        class="form__control"
                        name="cover_letter"
                        v-model="form.cover_letter"
                        rows="5"
                    />
                    <span
                        v-if="errors.cover_letter"
                        class="invalid-feedback"
                        role="alert"
                        >{{ errors.cover_letter[0] }}</span
                    >
                </div>
            </template>
            <template v-slot:footer>
                <div class="flex justify-end">
                    <ModalCloseButton target="apply-job-modal" />
                    <button
                        type="button"
                        @click="applyJob"
                        class="btn btn--primary"
                        :disabled="processing"
                    >
                        <span v-if="!processing">Lamar Sekarang</span>
                        <span v-else>Memproses</span>
                    </button>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script>
import BookmarkMixin from "~/plugins/mixins/bookmark";
import Modal from "~/components/Share/Modal/Modal";
import ModalTrigger from "~/components/Share/Modal/ModalTrigger";
import ModalCloseButton from "~/components/Share/Modal/ModalCloseButton";
import Accordion from "~/components/Share/Accordion";

export default {
    mixins: ["BookmarkMixin"],
    props: {
        job: {
            type: Object,
            required: true,
        },
        job_application: {
            type: Object,
            required: true,
        },
    },
    components: {
        Modal,
        ModalTrigger,
        ModalCloseButton,
        Accordion,
    },
    data() {
        return {
            processing: false,
            current_url: `${process.env.APP_BASE_URL}/job/${this.job.slug}/${this.job.identifier}`,
            form: {
                have_cover_letter: false,
                cover_letter: "",
            },
        };
    },
    created() {
        if (this.authenticated) {
            const bookmark = this.user.bookmarks.filter(
                (bm) => bm.job_id === this.job.id
            );
            if (bookmark.length > 0) {
                this.marked = true;
                this.bookmark_id = bookmark[0].id;
            }
        }
    },
    methods: {
        applyJob() {
            this.processing = true;
            this.$store.dispatch("cover-letter/clearCoverLetter");

            this.$axios
                .$post(
                    `/job/${this.job.slug}/${this.job.identifier}/apply`,
                    this.form
                )
                .then((res) => {
                    if (res.data.hasOwnProperty("redirect_route")) {
                        this.$store.dispatch(
                            "cover-letter/setCoverLetter",
                            this.form.cover_letter
                        );

                        this.$swal({
                            title: "Failed",
                            text: res.message,
                            icon: "warning",
                            showCancelButton: false,
                            confirmButtonText: "Do it!",
                        }).then((result) => {
                            this.$router.push(res.data.redirect_route);
                        });

                        return;
                    }
                    if (res.data.hasOwnProperty("login")) {
                        this.swalLoginPlease(res.message);
                        return;
                    }
                    this.job_application = res.data;
                    this.swalSuccess(res.message);
                })
                .catch((err) => {
                    if (err.respons.status !== 422) {
                        this.axiosError(err);
                    }
                })
                .finally(() => {
                    this.processing = false;
                    this.$bus.$emit("close-modal", "apply-job-modal");
                });
        },
        cancelJobApplication() {
            this.$swal({
                title: "Batalkan Lamaran?",
                text: "Anda akan membatalkan lamaran pekerjaan ini.",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Ya, Batalkan!",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.processing = true;
                    this.$axios
                        .$post(
                            `/job/${this.job.slug}/${this.job.identifier}/cancel-application`
                        )
                        .then((res) => {
                            if (res.data.hasOwnProperty("login")) {
                                this.swalLoginPlease(res.message);
                                return;
                            }
                            this.job_application = res.data;
                            this.swalSuccess(res.message);
                        })
                        .catch((err) => {
                            console.log(err.response);
                            this.swalWrong(err.response.data.message);
                        })
                        .finally(() => {
                            this.processing = false;
                        });
                }
            });
        },
    },
};
</script>