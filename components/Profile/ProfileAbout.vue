<template>
    <div id="myo__about" class="card">
        <div class="card__header">
            <div class="card__header-left">
                <div class="card__header-icon">
                    <i class="icon-profile"></i>
                </div>
                <h2 class="card__header-title">Tentang Saya</h2>
            </div>
        </div>
        <div class="card__body card__body--pad-left pre-line">
            <div class="el-short-long" :class="{ full: full }">
                {{ user_data.about }}
            </div>
            <template v-if="user_data.about != ''">
                <a
                    class="el-short-long-toggle-full"
                    v-if="!full"
                    href="#"
                    @click.prevent="full = true"
                    >... See more</a
                >
                <a
                    class="el-short-long-toggle-less"
                    v-else
                    href="#"
                    @click.prevent="full = false"
                    >See less</a
                >
            </template>
            <div class="clearfix"></div>
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
            full: false,
        };
    },
};
</script>