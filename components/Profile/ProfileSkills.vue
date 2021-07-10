<template>
    <div id="myo__skills" class="card">
        <div class="card__header">
            <div class="card__header-left">
                <div class="card__header-icon">
                    <i class="icon-star"></i>
                </div>
                <h2 class="card__header-title">Keahlian</h2>
            </div>
        </div>
        <div class="card__body card__body--pad-left">
            <div class="flex flex-wrap">
                <div
                    v-for="(skill, index) in user_data.skills"
                    :key="index"
                    class="badge mr2"
                >
                    {{ skill.name }}
                </div>
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