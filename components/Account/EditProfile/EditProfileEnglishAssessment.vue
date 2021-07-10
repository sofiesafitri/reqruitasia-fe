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
                    <div v-if="user_data.english_test.can_redo" class="mt-2">
                        <nuxt-link
                            to="/assessment/english"
                            class="btn btn--primary"
                            title="Mulai Ujian"
                            >Mulai Test Kembali <i class="icon-arrow-right"></i
                        ></nuxt-link>
                    </div>
                </div>
                <nuxt-link
                    v-else
                    to="/assessment/english"
                    class="btn btn--primary"
                    title="Mulai Ujian"
                    >Mulai Ujian <i class="icon-arrow-right"></i
                ></nuxt-link>
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