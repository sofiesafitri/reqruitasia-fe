<template>
    <div>
        <div v-if="rating === 0" class="rating-stars">
            <svg v-for="index in 5" :key="`${index}-0`" class="rating-star">
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-dimmed.svg"
                    alt="rating-dimmed"
                />
            </svg>
        </div>

        <div v-if="rating === 1" class="rating-stars">
            <svg class="rating-star">
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-half.svg"
                    alt="rating-half"
                />
            </svg>
            <svg v-for="index in 4" :key="`${index}-1`" class="rating-star">
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-dimmed.svg"
                    alt="rating-half"
                />
            </svg>
        </div>

        <div v-if="rating === 2" class="rating-stars">
            <svg class="rating-star">
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-light.svg"
                    alt="rating-full"
                />
            </svg>
            <svg v-for="index in 4" :key="`${index}-2`" class="rating-star">
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-dimmed.svg"
                    alt="rating-dimmed"
                />
            </svg>
        </div>

        <div v-if="rating === 3" class="rating-stars">
            <svg class="rating-star">
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-light.svg"
                    alt="rating-full"
                />
            </svg>
            <svg class="rating-star">
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-half.svg"
                    alt="rating-half"
                />
            </svg>
            <svg v-for="index in 3" :key="`${index}-3`" class="rating-star">
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-dimmed.svg"
                    alt="rating-dimmed"
                />
            </svg>
        </div>

        <div v-if="rating === 4" class="rating-stars">
            <svg class="rating-star">
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-light.svg"
                    alt="rating-full"
                />
            </svg>
            <svg class="rating-star">
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-light.svg"
                    alt="rating-full"
                />
            </svg>
            <svg v-for="index in 3" :key="`${index}-4`" class="rating-star">
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-dimmed.svg"
                    alt="rating-dimmed"
                />
            </svg>
        </div>

        <div v-if="rating === 5" class="rating-stars">
            <svg
                v-for="index in 2"
                :key="`${index}-5-left`"
                class="rating-star"
            >
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-light.svg"
                    alt="rating-full"
                />
            </svg>
            <svg class="rating-star">
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-half.svg"
                    alt="rating-half"
                />
            </svg>
            <svg
                v-for="index in 2"
                :key="`${index}-5-right`"
                class="rating-star"
            >
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-dimmed.svg"
                    alt="rating-dimmed"
                />
            </svg>
        </div>

        <div v-if="rating === 6" class="rating-stars">
            <svg
                v-for="index in 3"
                :key="`${index}-6-left`"
                class="rating-star"
            >
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-light.svg"
                    alt="rating-full"
                />
            </svg>
            <svg
                v-for="index in 2"
                :key="`${index}-6-right`"
                class="rating-star"
            >
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-dimmed.svg"
                    alt="rating-dimmed"
                />
            </svg>
        </div>

        <div v-if="rating === 7" class="rating-stars">
            <svg v-for="index in 3" :key="`${index}-7`" class="rating-star">
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-light.svg"
                    alt="rating-full"
                />
            </svg>
            <svg class="rating-star">
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-half.svg"
                    alt="rating-half"
                />
            </svg>
            <svg class="rating-star">
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-dimmed.svg"
                    alt="rating-dimmed"
                />
            </svg>
        </div>

        <div v-if="rating === 8" class="rating-stars">
            <svg v-for="index in 4" :key="`${index}-8`" class="rating-star">
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-light.svg"
                    alt="rating-full"
                />
            </svg>
            <svg class="rating-star">
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-dimmed.svg"
                    alt="rating-dimmed"
                />
            </svg>
        </div>

        <div v-if="rating === 9" class="rating-stars">
            <svg v-for="index in 4" :key="`${index}-9`" class="rating-star">
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-light.svg"
                    alt="rating-full"
                />
            </svg>
            <svg class="rating-star">
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-half.svg"
                    alt="rating-half"
                />
            </svg>
        </div>

        <div v-if="rating === 10" class="rating-stars">
            <svg v-for="index in 5" :key="`${index}-10`" class="rating-star">
                <image
                    xlink:href="~/assets/images/icons/rating-star/rating-star-light.svg"
                    alt="rating-full"
                />
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        rating: {
            type: Number,
            required: true,
        },
    },
};
</script>