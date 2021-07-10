<template>
    <div>
        <div v-if="isSupported">
            <div
                v-if="camera_is_open"
                class="video-rec"
                :class="{
                    active: isRecording,
                    paused: isPaused,
                }"
                @click="recordAction"
            >
                <div v-if="isRecording" class="video-rec__inner recording">
                    <span class="icon">&nbsp;</span>
                </div>
                <div v-else class="video-rec__inner not-recording">
                    <span class="text">Rec</span>
                    <span class="icon">&nbsp;</span>
                </div>
            </div>
            <button
                v-else
                type="button"
                class="btn btn--primary btn--block"
                @click="openCamera"
            >
                Buka Kamera
            </button>
        </div>
        <div v-else>
            <div class="text--danger">
                Gunakan
                <a
                    href="https://www.google.com/chrome/"
                    title="Google Chrome"
                    target="_blank"
                    >browser Chrome</a
                >
                untuk merekam video!
            </div>
        </div>
    </div>
</template>

<script>
import ElementMixin from "~/plugins/mixins/record-video/element-mixin";

const supportedTypes = [
    "video/x-msvideo",
    "video/ogg",
    "video/mpeg",
    "video/webm",
];
export default {
    mixins: [ElementMixin],
    props: {
        mimeType: {
            type: String,
            default: "video/webm",
            validator: (v) => supportedTypes.includes(v),
        },
        audio: {
            type: Boolean,
            default: true,
        },
        mode: {
            default: "press",
        },
    },
    data() {
        return {
            camera_is_open: false,
        };
    },
    created() {
        this.$bus.$on("stop-recording", () => {
            this.autoStopRecording();
        });
    },
    methods: {
        openCamera() {
            this.camera_is_open = true;
            this.cameraStandby();
        },
    },
    computed: {
        constraints() {
            return {
                video: true,
                audio: this.audio,
            };
        },
    },
};
</script>