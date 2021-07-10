<template>
    <div id="myo__portofolio" class="card">
        <div class="card__header">
            <div class="card__header-left">
                <div class="card__header-icon">
                    <i class="icon-more-square"></i>
                </div>
                <h2 class="card__header-title">Portofolio</h2>
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

            <div v-if="user_data.yt_video != ''" class="clearfix mb2">
                <div class="col col-12 md-col-4">
                    <h4>Video Profile</h4>
                </div>
                <div
                    class="col col-12 md-col-8"
                    v-html="user_data.yt_video_embed"
                ></div>
            </div>

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