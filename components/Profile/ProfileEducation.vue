<template>
    <div id="myo__educations" class="card">
        <div class="card__header">
            <div class="card__header-left">
                <div class="card__header-icon">
                    <i class="icon-document"></i>
                </div>
                <h2 class="card__header-title">Pendidikan</h2>
            </div>
        </div>
        <div class="card__body card__body--pad-left">
            <ul class="progress-list">
                <li v-for="(edu, index) in user_data.educations" :key="index">
                    <h4 class="progress-list__title">{{ edu.institution }}</h4>
                    <div class="progress-list__sub-title">
                        {{ edu.degree.name }} - {{ edu.field_of_study.name
                        }}<br />
                        {{ edu.city.name }}, {{ edu.province.name }}
                    </div>
                    <div class="progress-list__info">
                        <div v-if="edu.more_info.length > 250">
                            <div
                                class="el-short-long pre-line"
                                :class="{ full: is_full[index] }"
                            >
                                {{ edu.more_info }}
                            </div>
                            <a
                                class="el-short-long-toggle-full edu"
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
                        <span class="pre-line" v-else>{{ edu.more_info }}</span>
                    </div>
                    <div class="progress-list__footer">
                        {{ getDate(edu.start_time) }} -
                        {{ getDate(edu.end_time, edu.still_studying) }}
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
.el-short-long-toggle-full.edu {
    margin-top: -18px;
}
</style>
