<template>
    <div id="myo__experiences" class="card">
        <div class="card__header">
            <div class="card__header-left">
                <div class="card__header-icon">
                    <i class="icon-work"></i>
                </div>
                <h2 class="card__header-title">Pengalaman Kerja</h2>
            </div>
        </div>
        <div class="card__body card__body--pad-left">
            <ul class="progress-list">
                <li v-for="(exp, index) in user_data.experiences" :key="index">
                    <h4 class="progress-list__title">{{ exp.company }}</h4>
                    <div class="progress-list__sub-title">
                        {{ exp.position }}
                    </div>
                    <div class="progress-list__info pre-line">
                        <div v-if="exp.more_info.length > 250">
                            <div
                                class="el-short-long"
                                :class="{ full: is_full[index] }"
                            >
                                {{ exp.more_info }}
                            </div>
                            <a
                                class="el-short-long-toggle-full exp"
                                v-if="!is_full[index]"
                                href="#"
                                @click.prevent="makeFull(index)"
                                >... See more</a
                            >
                            <a
                                class="el-short-long-toggle-less"
                                v-else
                                href="#"
                                @click.prevent="makeLess(index)"
                                >See less</a
                            >
                            <div class="clearfix"></div>
                        </div>
                        <span v-else>{{ exp.more_info }}</span>
                    </div>
                    <div class="progress-list__footer">
                        {{ getDate(exp.start_time) }} -
                        {{ getDate(exp.end_time, exp.still_working) }}
                    </div>
                </li>
            </ul>
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
        let is_full = [];
        this.user_data.experiences.forEach((exp) => {
            is_full.push(false);
        });

        return {
            is_full: is_full,
        };
    },
    methods: {
        getDate(date, still_progress = false) {
            if (date === null || still_progress) {
                return "Sekarang";
            }

            var newDate = new Date(date);
            return newDate.toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
            });
        },
        makeFull(index) {
            this.$set(this.is_full, index, true);
        },
        makeLess(index) {
            this.$set(this.is_full, index, false);
        },
    },
};
</script>

<style lang="scss">
.el-short-long-toggle-full.exp {
    margin-top: -18px;
}
</style>