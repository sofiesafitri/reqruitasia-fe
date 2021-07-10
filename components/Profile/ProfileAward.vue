<template>
    <div id="myo__awards" class="card">
        <div class="card__header">
            <div class="card__header-left">
                <div class="card__header-icon">
                    <i class="icon-star"></i>
                </div>
                <h2 class="card__header-title">Penghargaan</h2>
            </div>
            <div class="card__header-right"></div>
        </div>
        <div class="card__body card__body--pad-left">
            <ul class="progress-list">
                <li v-for="(award, index) in user_data.awards" :key="index">
                    <h4 class="progress-list__title">{{ award.title }}</h4>
                    <div class="progress-list__sub-title">
                        {{ award.description }}
                    </div>
                    <div class="progress-list__info pre-line">
                        <div v-if="award.more_info.length > 250">
                            <div
                                class="el-short-long"
                                :class="{ full: is_full[index] }"
                            >
                                {{ award.more_info }}
                            </div>

                            <a
                                class="el-short-long-toggle-full award"
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
                        <span v-else>{{ award.more_info }}</span>
                    </div>
                    <div class="progress-list__footer">
                        Tahun {{ getYear(award.awarded_at) }}
                    </div>
                    <div class="progress-list__actions"></div>
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
        this.user_data.awards.forEach((award) => {
            is_full.push(false);
        });

        return {
            is_full: is_full,
        };
    },
    methods: {
        getYear(date) {
            var newDate = new Date(date);
            return newDate.toLocaleDateString("id-ID", {
                year: "numeric",
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