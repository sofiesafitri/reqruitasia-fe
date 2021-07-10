<template>
    <div class="card">
        <div class="card__body">
            <div class="jap-card__main">
                <div class="jap-card__logo">
                    <div>&nbsp;</div>
                    <img
                        :src="jap_data.workjob.company.logo_url"
                        :alt="jap_data.workjob.company.name"
                        class="img-fluid"
                    />
                </div>
                <div class="jap-card__info">
                    <div class="jap-card__title">
                        <nuxt-link
                            :to="`/job/${jap_data.workjob.slug}/${jap_data.workjob.identifier}`"
                            :title="jap_data.workjob.title"
                        >
                            {{ jap_data.workjob.title }}
                        </nuxt-link>
                    </div>
                    <div class="jap-card__company">
                        <nuxt-link
                            :to="`/company/${jap_data.workjob.company.slug}`"
                            :title="jap_data.workjob.company.name"
                        >
                            {{ jap_data.workjob.company.name }}
                        </nuxt-link>
                    </div>
                    <div class="jap-card__location">
                        <i class="icon-location"></i>
                        <span>{{ jap_data.workjob.city.name }}</span>
                    </div>
                    <div class="jap-card__salary">
                        <span
                            >{{ jap_data.workjob.salary_currency }}
                            {{ jap_data.workjob.salary_min }}
                            -
                            {{ jap_data.workjob.salary_max }}</span
                        >
                    </div>
                    <div
                        v-if="
                            jap_data.status.value === 'unsuitable' &&
                            jap_data.data.hasOwnProperty('rejection_message')
                        "
                        class="jap-card__rejection-msg"
                    >
                        <strong>Alasan ditolak:</strong><br />
                        {{ jap_data.data.rejection_message }}
                    </div>
                    <div
                        v-if="jap_data.status.value === 'interview'"
                        class="jap-card__interview-detail"
                    >
                        <p>
                            <strong>Jadwal Wawancara:</strong>
                            {{ jap_data.interview_time | format_date }} di
                            {{ jap_data.interview_location }}
                        </p>
                        <p
                            v-if="jap_data.interview_status.value === 'accept'"
                            class="text--success"
                        >
                            <i class="icon-tick-square"></i> Jadwal wawancara
                            telah Anda setujui
                        </p>
                        <p
                            v-if="jap_data.interview_status.value === 'decline'"
                            class="text--danger"
                        >
                            <i class="icon-close-square"></i> Jadwal wawancara
                            telah Anda tolak
                        </p>
                        <p
                            v-if="
                                jap_data.interview_status.value ===
                                'time-not-suit'
                            "
                        >
                            <i class="icon-time-square"></i> Waktu wawancara
                            tidak sesuai
                        </p>
                    </div>
                </div>
            </div>
            <div class="jap-card__actions">
                <div
                    v-if="
                        jap_data.status.value === 'interview' &&
                        !jap_data.interview_status.hasOwnProperty('value')
                    "
                    class="jap-card__interview-action mt-4"
                >
                    <button
                        type="button"
                        class="btn btn--primary btn--block btn--sm mb-3"
                        @click="interviewAction('accept')"
                    >
                        Terima Wawancara
                    </button>
                    <button
                        type="button"
                        class="btn btn--danger btn--block btn--sm mb-3"
                        @click="interviewAction('decline')"
                    >
                        Tolak Wawancara
                    </button>
                    <button
                        type="button"
                        class="btn btn-outline btn-outline--danger btn--block btn--sm mb-3"
                        @click="interviewAction('time-not-suit')"
                    >
                        Waktu Tidak Sesuai
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        jap: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            jap_data: this.jap,
        };
    },
    methods: {
        interviewAction(action) {
            let warnMsg;
            switch (action) {
                case "accept":
                    warnMsg = "Setuju dengan jadwal wawancara?";
                    break;
                case "decline":
                    warnMsg = "Tolak jadwal wawancara?";
                    break;
                case "time-not-suit":
                    warnMsg = "Waktu wawancara tidak sesuai?";
                    break;
                default:
                    warnMsg = "";
                    break;
            }

            this.$swal({
                title: "Anda Yakin?",
                text: warnMsg,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya, Lanjutkan!",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$bus.$emit("show-loading-block");

                    this.$axios
                        .$post(`account/job-applications/interview-action`, {
                            id: this.jap_data.id,
                            action: action,
                        })
                        .then((res) => {
                            this.swalToast(res.status, res.message);
                            this.jap_data = res.data;
                        })
                        .catch((err) => {
                            this.axiosError(err);
                        })
                        .finally(() => {
                            this.$bus.$emit("hide-loading-block");
                        });
                }
            });
        },
    },
};
</script>
