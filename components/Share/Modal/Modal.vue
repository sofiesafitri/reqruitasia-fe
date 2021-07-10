<template>
    <div
        class="c-modal"
        :class="{ show: show, 'c-modal--full-height': full_height }"
        role="dialog"
    >
        <div class="c-modal__wrapper-outside" @click="closeModal">&nbsp;</div>
        <div class="c-modal__wrapper">
            <div class="c-modal__header">
                <h3 class="c-modal__title">{{ title }}</h3>
                <a
                    href="#"
                    class="c-modal__close close-modal"
                    @click.prevent="closeModal"
                    >&nbsp;</a
                >
            </div>
            <div class="c-modal__body">
                <slot name="body"></slot>
            </div>
            <div v-if="footer" class="c-modal__footer">
                <slot name="footer"></slot>
            </div>
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
        name: {
            type: String,
            required: true,
        },
        footer: {
            type: Boolean,
            default: false,
        },
        full_height: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            show: false,
        };
    },
    created() {
        this.$bus.$on("show-modal", (target) => {
            if (target === this.name) {
                this.show = true;
                if (process.client) {
                    document.body.classList.add("modal-open");
                }
            }
        });

        this.$bus.$on("close-modal", (target) => {
            if (target === this.name) {
                this.closeModal();
            }
        });
    },
    methods: {
        closeModal() {
            this.show = false;
            document.body.classList.remove("modal-open");
        },
    },
};
</script>