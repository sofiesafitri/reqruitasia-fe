<template>
    <div id="myo__video" class="card">
        <div class="card__header">
            <div class="card__header-left">
                <div class="card__header-icon">
                    <i class="icon-video"></i>
                </div>
                <h2 class="card__header-title">Video</h2>
            </div>
            <div class="card__header-right">
                <ModalTrigger
                    v-if="is_supported"
                    type="link"
                    class_name="card__edit modal-trigger"
                    target="myo__video-modal"
                >
                    <template v-slot:content>
                        <i class="icon-edit"></i> Edit
                    </template>
                </ModalTrigger>
            </div>
        </div>
        <div class="card__body card__body--pad-left">
            <p class="text--center">
                Ceritakan tentang diri Anda maksimal 1 menit.
            </p>
            <p class="text--danger" v-if="!is_supported">
                Gunakan
                <a
                    href="https://www.google.com/chrome/"
                    title="Google Chrome"
                    target="_blank"
                    >browser Chrome</a
                >
                untuk merekam video!
            </p>

            <video
                id="user-video"
                class="video-fluid"
                v-if="user_video_src != ''"
                :src="user_video_src"
                controls
            ></video>
        </div>

        <Modal title="Rekam Video" name="myo__video-modal" footer full_height>
            <template v-slot:body>
                <div class="myo__video-record-wrapper">
                    <div class="myo__video-timer">{{ video_timer }}</div>
                    <div
                        v-if="time_left_alert > 0 && time_left_alert < 11"
                        class="myo__video-timer-alert"
                    >
                        {{ time_left_alert }}
                    </div>
                    <video v-if="video_src != ''" class="video-fluid" controls>
                        <source :src="video_src" type="video/mp4" />
                    </video>
                    <video
                        v-show="video_src == ''"
                        id="video-stream"
                        class="video-fluid"
                        autoplay
                    ></video>
                </div>
                <div class="myo__video-record-button-wrapper">
                    <RecordVideo
                        mode="press"
                        @standby="onStandBy"
                        @stream="onStream"
                        @result="onResult"
                    />
                </div>
            </template>
            <template v-slot:footer>
                <div class="flex justify-end">
                    <ModalCloseButton target="myo__video-modal" />

                    <button
                        type="button"
                        @click="save('myo__video-modal')"
                        class="btn btn--primary"
                        :disabled="$v.$invalid || saving"
                    >
                        <span v-if="!saving">Simpan</span>
                        <span v-else>Memproses</span>
                    </button>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import RecordVideo from "~/components/Share/RecordVideo/RecordVideo";
import Modal from "~/components/Share/Modal/Modal";
import ModalTrigger from "~/components/Share/Modal/ModalTrigger";
import ModalCloseButton from "~/components/Share/Modal/ModalCloseButton";

const default_time_left = 60; // in seconds

export default {
    props: {
        user_data: {
            type: Object,
            required: true,
        },
    },
    components: {
        RecordVideo,
        Modal,
        ModalTrigger,
        ModalCloseButton,
    },
    data() {
        return {
            saving: false,
            form: {
                video: "",
            },
            video_src: "",
            user_video_src: this.user_data.video.file_url,
            time_left_alert: default_time_left,
            recording_time: default_time_left * 1000,
            video_timer: "",
            count_timer: "",
            is_supported: false,
        };
    },
    validations: {
        form: {
            video: { required },
        },
    },
    mounted() {
        this.video_timer = this.formatTime(this.time_left_alert);

        if (process.client) {
            const isChromium =
                !!window.chrome && !/Edge/.test(navigator.userAgent);
            this.is_supported = isChromium;
        }
    },
    methods: {
        onStandBy(stream) {
            this.video_src = "";

            if (process.client) {
                document.getElementById("video-stream").srcObject = stream;
            }
        },
        onStream(stream) {
            this.form.video = "";
            this.video_src = "";

            if (process.client) {
                document.getElementById("video-stream").srcObject = stream;
            }

            this.countTimer();

            setTimeout(() => {
                this.$bus.$emit("stop-recording");
                this.resetTimer();
            }, 60000);
        },
        onResult(data) {
            this.form.video = data;
            this.video_src = window.URL.createObjectURL(data);
            this.resetTimer();
        },
        countTimer() {
            this.count_timer = setInterval(() => {
                this.time_left_alert = this.time_left_alert - 1;
                this.video_timer = this.formatTime(this.time_left_alert);
            }, 1000);
        },
        resetTimer() {
            clearInterval(this.count_timer);
            this.time_left_alert = default_time_left;
            this.recording_time = default_time_left * 1000;
        },
        save(modal) {
            this.saving = true;

            let formData = new FormData();
            formData.append("video", this.form.video);

            this.$axios
                .$post(`account/upload-video`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    let user = res.data;
                    this.$emit("updated", user);
                    this.user_video_src = user.video.file_url;
                    this.swalToast(res.status, res.message);
                    this.$bus.$emit("close-modal", modal);
                    this.form.video = "";
                    this.video_src = "";
                })
                .catch((err) => {
                    this.axiosError(err);
                })
                .finally(() => {
                    this.saving = false;
                });
        },
        formatTime(ms) {
            return new Date(ms * 1000).toISOString().slice(11, -5);
        },
    },
};
</script>