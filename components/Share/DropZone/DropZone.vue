<template>
    <div
        :dz-name="name"
        class="drop-zone"
        :class="{
            'has-image': image_url != '',
            dragging: dragging,
        }"
    >
        <label class="drop-zone__label">
            <div class="drop-zone__label-inner">
                <span class="text">Browse / Drop File</span>
                <span class="icon"><i class="icon-upload"></i></span>
            </div>
            <img
                v-if="image_url != ''"
                :src="image_url"
                alt="Image"
                class="img-fluid"
            />
            <input type="file" ref="dropzone_image" @change="imageChange" />
        </label>
    </div>
</template>

<script>
export default {
    props: {
        name: { type: String, required: true },
        image_url: { type: String, default: "", required: false },
    },
    data() {
        return {
            dragging: false,
        };
    },
    mounted() {
        let dropArea = document.querySelector('[dz-name="' + this.name + '"]');
        ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
            dropArea.addEventListener(
                eventName,
                (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                },
                false
            );
        });

        dropArea.addEventListener(
            "drop",
            (e) => {
                let dt = e.dataTransfer;
                let files = dt.files;

                this.sendImageChangeEvent(files[0]);
            },
            false
        );

        ["dragenter", "dragover"].forEach((eventName) => {
            dropArea.addEventListener(
                eventName,
                (e) => {
                    this.dragging = true;
                },
                false
            );
        });

        ["dragleave", "drop"].forEach((eventName) => {
            dropArea.addEventListener(
                eventName,
                (e) => {
                    this.dragging = false;
                },
                false
            );
        });
    },
    methods: {
        imageChange(e) {
            let file = this.$refs.dropzone_image.files[0];
            this.sendImageChangeEvent(file);
        },
        sendImageChangeEvent(file) {
            this.$emit("dropped", file);
        },
    },
};
</script>