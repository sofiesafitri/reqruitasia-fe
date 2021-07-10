<template>
    <div id="myo__english" class="card">
        <div class="card__header">
            <div class="card__header-left">
                <div class="card__header-icon">
                    <i class="icon-document"></i>
                </div>
                <h2 class="card__header-title">Tes Bahasa Inggris</h2>
            </div>
            <div class="card__header-right"></div>
        </div>
        <div class="card__body card__body--pad-left">
            <div class="flex justify-center">
                <div
                    v-if="user_data.english_test.has_data"
                    class="flex flex-column flex-align-center"
                >
                    <div>
                        <strong>Score</strong>:
                        {{ user_data.english_test.score }}/10
                    </div>
                    <div>
                        <strong>Test date</strong>:
                        {{ user_data.english_test.test_date | format_date }}
                    </div>
                </div>
                <div v-else class="text--success">Belum dilakukan</div>
            </div>
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