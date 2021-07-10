<template>
    <div>
        <button
            type="button"
            class="accordion"
            @click="show = !show"
            :class="{ active: show }"
        >
            <span class="text">{{ title }}</span
            ><span class="icon"><i class="icon-arrow-down-2"></i></span>
        </button>
        <div class="accordion__panel" :class="{ active: show }">
            <slot name="panel"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            show: false,
        };
    },
};
</script>