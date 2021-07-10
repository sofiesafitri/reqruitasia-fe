<template>
    <div id="myo__resume" class="card">
        <div class="card__header">
            <div class="card__header-left">
                <div class="card__header-icon">
                    <i class="icon-document"></i>
                </div>
                <h2 class="card__header-title">Resume</h2>
            </div>
        </div>
        <div class="card__body card__body--pad-left">
            <object
                v-if="user_data.resume.file_url != ''"
                :data="user_data.resume.file_url"
                type="application/pdf"
                width="100%"
                height="650"
            >
                <a
                    :href="user_data.resume.file_url"
                    target="_blank"
                    title="Lihat resume"
                    >Lihat resume</a
                >
            </object>
            <div v-else>Tidak ada resume</div>
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
};
</script>