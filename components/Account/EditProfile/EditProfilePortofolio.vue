<template>
    <div id="myo__portofolio" class="card">
        <div class="card__header">
            <div class="card__header-left">
                <div class="card__header-icon">
                    <i class="icon-more-square"></i>
                </div>
                <h2 class="card__header-title">Social Passport</h2>
            </div>
            <div class="card__header-right">
                <ModalTrigger
                    type="link"
                    class_names="card__edit modal-trigger"
                    target="myo__portofolio-modal"
                >
                    <template v-slot:content>
                        <i class="icon-edit"></i> Edit
                    </template>
                </ModalTrigger>
            </div>
        </div>
        <div class="card__body card__body--pad-left">
            <div v-if="user_data.website !== ''" class="clearfix mb2">
                <div class="col col-12 md-col-4">
                    <h4>Website</h4>
                </div>
                <div class="col col-12 md-col-8">
                    <a
                        :href="user_data.website"
                        :title="user_data.name"
                        target="_blank"
                        >{{ user_data.website }}</a
                    >
                </div>
            </div>

            <!-- <div v-if="user_data.yt_video != ''" class="clearfix mb2">
                <div class="col col-12 md-col-4">
                    <h4>Video Profile</h4>
                </div>
                <div
                    class="col col-12 md-col-8"
                    v-html="user_data.yt_video_embed"
                ></div>
            </div> -->

            <div class="clearfix mb2">
                <div class="col col-12 md-col-4">
                    <h4>Sosial Media</h4>
                </div>
                <div class="col col-12 md-col-8">
                    <ul class="sosmed">
                        <li v-if="user_data.linkedin !== ''">
                            <a
                                :href="user_data.linkedin"
                                title="Linkedin"
                                target="_blank"
                            >
                                <svg>
                                    <image
                                        xlink:href="~/assets/images/icons/social/linkedin.svg"
                                        alt="Linkedin"
                                    />
                                </svg>
                            </a>
                        </li>
                        <li v-if="user_data.twitter !== ''">
                            <a
                                :href="user_data.twitter"
                                title="Twitter"
                                target="_blank"
                            >
                                <svg>
                                    <image
                                        xlink:href="~/assets/images/icons/social/twitter.svg"
                                        alt="Twitter"
                                    />
                                </svg>
                            </a>
                        </li>
                        <li v-if="user_data.github !== ''">
                            <a
                                :href="user_data.github"
                                title="Github"
                                target="_blank"
                            >
                                <svg>
                                    <image
                                        xlink:href="~/assets/images/icons/social/github.svg"
                                        alt="Github"
                                    />
                                </svg>
                            </a>
                        </li>
                        <li v-if="user_data.instagram !== ''">
                            <a
                                :href="user_data.instagram"
                                title="Instagram"
                                target="_blank"
                            >
                                <svg>
                                    <image
                                        xlink:href="~/assets/images/icons/social/instagram.svg"
                                        alt="Instagram"
                                    />
                                </svg>
                            </a>
                        </li>
                        <li v-if="user_data.dribbble !== ''">
                            <a
                                :href="user_data.dribbble"
                                title="Dribbble"
                                target="_blank"
                            >
                                <svg>
                                    <image
                                        xlink:href="~/assets/images/icons/social/dribbble.svg"
                                        alt="Dribbble"
                                    />
                                </svg>
                            </a>
                        </li>
                        <li v-if="user_data.codepen !== ''">
                            <a
                                :href="user_data.codepen"
                                title="Codepen"
                                target="_blank"
                            >
                                <svg>
                                    <image
                                        xlink:href="~/assets/images/icons/social/codepen.svg"
                                        alt="Codepen"
                                    />
                                </svg>
                            </a>
                        </li>
                        <li v-if="user_data.youtube !== ''">
                            <a
                                :href="user_data.youtube"
                                title="Youtube"
                                target="_blank"
                            >
                                <svg>
                                    <image
                                        xlink:href="~/assets/images/icons/social/youtube.svg"
                                        alt="Youtube"
                                    />
                                </svg>
                            </a>
                        </li>
                        <li v-if="user_data.facebook !== ''">
                            <a
                                :href="user_data.facebook"
                                title="Facebook"
                                target="_blank"
                            >
                                <svg>
                                    <image
                                        xlink:href="~/assets/images/icons/social/facebook.svg"
                                        alt="Facebook"
                                    />
                                </svg>
                            </a>
                        </li>
                        <li v-if="user_data.vimeo !== ''">
                            <a
                                :href="user_data.vimeo"
                                title="Vimeo"
                                target="_blank"
                            >
                                <svg>
                                    <image
                                        xlink:href="~/assets/images/icons/social/vimeo.svg"
                                        alt="Vimeo"
                                    />
                                </svg>
                            </a>
                        </li>
                        <li v-if="user_data.behance !== ''">
                            <a
                                :href="user_data.behance"
                                title="Behance"
                                target="_blank"
                            >
                                <svg>
                                    <image
                                        xlink:href="~/assets/images/icons/social/behance.svg"
                                        alt="Behance"
                                    />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <Modal title="Portofolio" name="myo__portofolio-modal" footer>
            <template v-slot:body>
                <div class="form__group">
                    <label class="form__label" for="website">Website</label>
                    <input
                        type="text"
                        class="form__control"
                        name="website"
                        v-model="form.website"
                        placeholder="https://www.example.com"
                    />
                    <span
                        v-if="errors.website"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.website">{{
                            errors.website[0]
                        }}</span>
                    </span>
                </div>
                <!-- <div class="form__group">
                    <label class="form__label" for="yt_video"
                        >Youtube Video</label
                    >
                    <input
                        type="text"
                        class="form__control"
                        name="yt_video"
                        v-model="form.yt_video"
                        placeholder="https://www.youtube.com/watch?v=xxx"
                    />
                    <span
                        v-if="errors.yt_video"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.yt_video">{{
                            errors.yt_video[0]
                        }}</span>
                    </span>
                </div> -->
                <div class="form__group">
                    <label for="linkedin" class="form__label form__label--icon">
                        <svg>
                            <image
                                xlink:href="~/assets/images/icons/social/linkedin.svg"
                                alt="linkedin"
                            />
                        </svg>
                        <span>Linkedin</span>
                    </label>
                    <input
                        type="text"
                        class="form__control"
                        name="linkedin"
                        v-model="form.linkedin"
                        placeholder="https://www.linkedin.com/in/xxx"
                    />
                    <span
                        v-if="errors.linkedin"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.linkedin">{{
                            errors.linkedin[0]
                        }}</span>
                    </span>
                </div>
                <div class="form__group">
                    <label for="twitter" class="form__label form__label--icon">
                        <svg>
                            <image
                                xlink:href="~/assets/images/icons/social/twitter.svg"
                                alt="twitter"
                            />
                        </svg>
                        <span>Twitter</span>
                    </label>
                    <input
                        type="text"
                        class="form__control"
                        name="twitter"
                        v-model="form.twitter"
                        placeholder="https://twitter.com/xxx"
                    />
                    <span
                        v-if="errors.twitter"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.twitter">{{
                            errors.twitter[0]
                        }}</span>
                    </span>
                </div>
                <div class="form__group">
                    <label for="github" class="form__label form__label--icon">
                        <svg>
                            <image
                                xlink:href="~/assets/images/icons/social/github.svg"
                                alt="github"
                            />
                        </svg>
                        <span>Github</span>
                    </label>
                    <input
                        type="text"
                        class="form__control"
                        name="github"
                        v-model="form.github"
                        placeholder="https://github.com/xxx"
                    />
                    <span
                        v-if="errors.github"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.github">{{ errors.github[0] }}</span>
                    </span>
                </div>
                <div class="form__group">
                    <label
                        for="instagram"
                        class="form__label form__label--icon"
                    >
                        <svg>
                            <image
                                xlink:href="~/assets/images/icons/social/instagram.svg"
                                alt="instagram"
                            />
                        </svg>
                        <span>Instagram</span>
                    </label>
                    <input
                        type="text"
                        class="form__control"
                        name="instagram"
                        v-model="form.instagram"
                        placeholder="https://www.instagram.com/xxx"
                    />
                    <span
                        v-if="errors.instagram"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.instagram">{{
                            errors.instagram[0]
                        }}</span>
                    </span>
                </div>
                <div class="form__group">
                    <label for="dribbble" class="form__label form__label--icon">
                        <svg>
                            <image
                                xlink:href="~/assets/images/icons/social/dribbble.svg"
                                alt="dribbble"
                            />
                        </svg>
                        <span>Dribbble</span>
                    </label>
                    <input
                        type="text"
                        class="form__control"
                        name="dribbble"
                        v-model="form.dribbble"
                        placeholder="https://dribbble.com/xxx"
                    />
                    <span
                        v-if="errors.dribbble"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.dribbble">{{
                            errors.dribbble[0]
                        }}</span>
                    </span>
                </div>
                <div v-if="more">
                    <div class="form__group">
                        <label
                            for="codepen"
                            class="form__label form__label--icon"
                        >
                            <svg>
                                <image
                                    xlink:href="~/assets/images/icons/social/codepen.svg"
                                    alt="codepen"
                                />
                            </svg>
                            <span>Codepen</span>
                        </label>
                        <input
                            type="text"
                            class="form__control"
                            name="codepen"
                            v-model="form.codepen"
                            placeholder="https://codepen.io/xxx"
                        />
                        <span
                            v-if="errors.codepen"
                            class="invalid-feedback"
                            role="alert"
                        >
                            <span v-if="errors.codepen">{{
                                errors.codepen[0]
                            }}</span>
                        </span>
                    </div>
                    <div class="form__group">
                        <label
                            for="youtube"
                            class="form__label form__label--icon"
                        >
                            <svg>
                                <image
                                    xlink:href="~/assets/images/icons/social/youtube.svg"
                                    alt="youtube"
                                />
                            </svg>
                            <span>Youtube</span>
                        </label>
                        <input
                            type="text"
                            class="form__control"
                            name="youtube"
                            v-model="form.youtube"
                            placeholder="https://www.youtube.com/c/xxx"
                        />
                        <span
                            v-if="errors.youtube"
                            class="invalid-feedback"
                            role="alert"
                        >
                            <span v-if="errors.youtube">{{
                                errors.youtube[0]
                            }}</span>
                        </span>
                    </div>
                    <div class="form__group">
                        <label
                            for="facebook"
                            class="form__label form__label--icon"
                        >
                            <svg>
                                <image
                                    xlink:href="~/assets/images/icons/social/facebook.svg"
                                    alt="Facebook"
                                />
                            </svg>
                            <span>Facebook</span>
                        </label>
                        <input
                            type="text"
                            class="form__control"
                            name="facebook"
                            v-model="form.facebook"
                            placeholder="https://www.facebook.com/xxx"
                        />
                        <span
                            v-if="errors.facebook"
                            class="invalid-feedback"
                            role="alert"
                        >
                            <span v-if="errors.facebook">{{
                                errors.facebook[0]
                            }}</span>
                        </span>
                    </div>
                    <div class="form__group">
                        <label
                            for="vimeo"
                            class="form__label form__label--icon"
                        >
                            <svg>
                                <image
                                    xlink:href="~/assets/images/icons/social/vimeo.svg"
                                    alt="vimeo"
                                />
                            </svg>
                            <span>Vimeo</span>
                        </label>
                        <input
                            type="text"
                            class="form__control"
                            name="vimeo"
                            v-model="form.vimeo"
                            placeholder="https://vimeo.com/xxx"
                        />
                        <span
                            v-if="errors.vimeo"
                            class="invalid-feedback"
                            role="alert"
                        >
                            <span v-if="errors.vimeo">{{
                                errors.vimeo[0]
                            }}</span>
                        </span>
                    </div>
                    <div class="form__group">
                        <label
                            for="behance"
                            class="form__label form__label--icon"
                        >
                            <svg>
                                <image
                                    xlink:href="~/assets/images/icons/social/behance.svg"
                                    alt="behance"
                                />
                            </svg>
                            <span>Behance</span>
                        </label>
                        <input
                            type="text"
                            class="form__control"
                            name="behance"
                            v-model="form.behance"
                            placeholder="https://www.behance.net/xxx"
                        />
                        <span
                            v-if="errors.behance"
                            class="invalid-feedback"
                            role="alert"
                        >
                            <span v-if="errors.behance">{{
                                errors.behance[0]
                            }}</span>
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    class="btn btn--sm btn-outline btn-outline--primary"
                    @click="more = !more"
                >
                    <span v-if="!more"
                        ><i class="icon-arrow-down"></i> Tampilkan Semua</span
                    >
                    <span v-else
                        ><i class="icon-arrow-up"></i> Tampilkan Sedikit</span
                    >
                </button>
            </template>
            <template v-slot:footer>
                <div class="flex justify-end">
                    <ModalCloseButton target="myo__portofolio-modal" />
                    <button
                        type="button"
                        @click="save('myo__portofolio-modal')"
                        class="btn btn--primary"
                        :disabled="saving"
                    >
                        <span v-if="!saving">Simpan</span>
                        <span v-else>Memproses</span>
                    </button>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script>
import Modal from "~/components/Share/Modal/Modal";
import ModalTrigger from "~/components/Share/Modal/ModalTrigger";
import ModalCloseButton from "~/components/Share/Modal/ModalCloseButton";

export default {
    props: {
        user_data: {
            type: Object,
            required: true,
        },
    },
    components: {
        Modal,
        ModalTrigger,
        ModalCloseButton,
    },
    data() {
        return {
            saving: false,
            more: false,
            form: {
                website: this.user_data.website,
                // yt_video: this.user_data.yt_video,
                linkedin: this.user_data.linkedin,
                twitter: this.user_data.twitter,
                github: this.user_data.github,
                instagram: this.user_data.instagram,
                dribbble: this.user_data.dribbble,
                codepen: this.user_data.codepen,
                youtube: this.user_data.youtube,
                facebook: this.user_data.facebook,
                vimeo: this.user_data.vimeo,
                behance: this.user_data.behance,
            },
        };
    },
    methods: {
        save(modal) {
            this.saving = true;

            this.$axios
                .$post(`account/update-portofolio`, this.form)
                .then((res) => {
                    let user = res.data;
                    this.$emit("updated", user);
                    this.swalToast(res.status, res.message);
                    this.$bus.$emit("close-modal", modal);
                })
                .catch((err) => {
                    this.axiosError(err);
                })
                .finally(() => {
                    this.saving = false;
                });
        },
    },
};
</script>
