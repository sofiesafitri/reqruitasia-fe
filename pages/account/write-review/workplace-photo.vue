<template>
    <div class="card">
        <div class="card__header">
            <h2 class="card__header-title">Workplace Photo</h2>
        </div>
        <div class="card__body">
            <div v-if="success" class="alert alert--success">
                Thank you for submitting workplace photos!
            </div>
            <form v-else @submit.prevent="send" class="form">
                <div class="form__group">
                    <label class="form__label" for="company"
                        >Company Name</label
                    >
                    <client-only>
                        <v-select
                            label="name"
                            v-model="selected_company"
                            @search="searchCompany"
                            @input="companyChange"
                            :clearable="false"
                            :options="companies"
                            placeholder="Search company"
                        ></v-select>
                    </client-only>
                    <span
                        v-if="errors.company_id"
                        class="invalid-feedback"
                        role="alert"
                        >{{ errors.company_id[0] }}</span
                    >
                </div>
                <div class="form__group">
                    <label class="form__label">Photos</label>
                    <div class="clearfix mxn2">
                        <div
                            v-for="(photo, i) in form.photos"
                            :key="i"
                            class="col sm-col-6 md-col-6 lg-col-4 px2 mb-4"
                        >
                            <DropZone
                                :name="`photo-${i}`"
                                :image_url="form.photos[i].src"
                                @dropped="(file) => photoChange(file, i)"
                            />
                            <span
                                v-if="errors[`photo_file_names.${i}`]"
                                class="invalid-feedback"
                                role="alert"
                                >{{ errors[`photo_file_names.${i}`][0] }}
                            </span>
                            <button
                                type="button"
                                @click="removePhoto(i)"
                                class="btn btn--block btn--danger btn--sm mt-2"
                            >
                                <i class="icon-delete"></i> Remove
                            </button>
                        </div>
                        <div
                            v-if="this.form.photos.length < 5"
                            class="col sm-col-6 md-col-6 lg-col-4 px2 mb-4"
                        >
                            <button
                                type="button"
                                @click="addPhoto"
                                class="drop-zone-add"
                            >
                                <div class="drop-zone-add__icon">
                                    <i class="icon-plus"></i>
                                </div>
                                <div class="drop-zone-add__text">Add more</div>
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    class="btn btn--primary right"
                    :disabled="processing"
                >
                    <span v-if="processing">Processing...</span>
                    <span v-else>Send Review</span>
                </button>
                <div class="clearfix"></div>
            </form>
        </div>
    </div>
</template>

<script>
import DropZone from "~/components/Share/DropZone/DropZone";

export default {
    middleware: ["auth"],
    head() {
        return {
            title: "Workplace Photos",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Workplace photos",
                },
            ],
        };
    },
    components: {
        DropZone,
    },
    data() {
        return {
            form: {
                type: "workplace_photos",
                company_id: "",
                photos: [],
            },
            success: false,
            processing: false,
            companies: [],
            selected_company: null,
        };
    },
    methods: {
        searchCompany(search, loading) {
            loading(true);
            this.$axios
                .$post("companies-search", {
                    keyword: search,
                })
                .then((res) => {
                    this.companies = res.data;
                })
                .catch((err) => {
                    this.axiosError(err);
                })
                .finally(() => {
                    loading(false);
                });
        },
        companyChange(value) {
            this.form.company_id = value.id;
        },
        photoChange(file, index) {
            let prevFileName = this.form.photos[index].file_name;

            let formData = new FormData();
            formData.append("photo", file);
            if (prevFileName != "") {
                formData.append("prev_file_name", prevFileName);
            }

            this.$axios
                .$post(
                    `account/write-review/workplace-photos/add-photo`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                )
                .then((res) => {
                    const data = res.data;
                    this.form.photos[index].src = data.image_url;
                    this.form.photos[index].file_name = data.file_name;
                    this.form.photos[index].new = false;
                    this.swalToast(res.status, res.message);
                })
                .catch((err) => {
                    this.axiosError(err);
                });
            return;
        },
        removePhoto(index) {
            if (this.form.photos[index].new) {
                this.form.photos.splice(index, 1);
                return;
            }

            const fileName = this.form.photos[index].file_name;

            this.$axios
                .delete(
                    `account/write-review/workplace-photos/remove-photo/${fileName}`
                )
                .then((res) => {
                    this.form.photos.splice(index, 1);
                })
                .catch((err) => {
                    this.axiosError(err);
                });
        },
        addPhoto() {
            if (this.form.photos.length === 5) {
                this.swalWrong("Maximum 5 photos!");
                return;
            }

            this.form.photos.push({
                new: true,
                file_name: "",
                src: "",
            });
        },
        send() {
            this.processing = true;

            const photos = [];
            this.form.photos.forEach((photo) => {
                photos.push(photo.file_name);
            });

            this.$axios
                .$post("/account/write-review/workplace-photos", {
                    type: this.form.type,
                    company_id: this.form.company_id,
                    photos: photos,
                })
                .then((res) => {
                    this.swalSuccess(res.message);
                    this.success = true;
                })
                .catch((err) => {
                    this.axiosError(err);
                })
                .finally(() => {
                    this.processing = false;
                });
        },
    },
};
</script>