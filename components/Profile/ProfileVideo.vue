<template>
    <div id="myo__video" class="card">
        <div class="card__header">
            <div class="card__header-left">
                <div class="card__header-icon">
                    <i class="icon-video"></i>
                </div>
                <h2 class="card__header-title">Video</h2>
            </div>
        </div>
        <div class="card__body card__body--pad-left">
            <video
                id="user-video"
                class="video-fluid"
                v-if="user_video_src != ''"
                :src="user_video_src"
                controls
            ></video>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        user_data: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            user_video_src: this.user_data.video.file_url,
        };
    },
};
</script>