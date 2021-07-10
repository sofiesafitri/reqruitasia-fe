<template>
    <div class="container write-review">
        <div class="clearfix">
            <nav
                class="simple-side-nav write-review__nav col col-12 sm-col-12 md-col-3 lg-col-3"
            >
                <ul>
                    <li
                        class="nav-link"
                        :class="{
                            active:
                                this.$route.path ===
                                '/account/write-review/company-review',
                        }"
                    >
                        <nuxt-link
                            to="/account/write-review/company-review"
                            title="Company Review"
                            >Company</nuxt-link
                        >
                    </li>
                    <li
                        class="nav-link"
                        :class="{
                            active:
                                this.$route.path ===
                                '/account/write-review/salary',
                        }"
                    >
                        <nuxt-link
                            to="/account/write-review/salary"
                            title="Salary Review"
                            >Salary</nuxt-link
                        >
                    </li>
                    <li
                        class="nav-link"
                        :class="{
                            active:
                                this.$route.path ===
                                '/account/write-review/interview',
                        }"
                    >
                        <nuxt-link
                            to="/account/write-review/interview"
                            title="Interview Review"
                            >Interview</nuxt-link
                        >
                    </li>
                    <li
                        class="nav-link"
                        :class="{
                            active:
                                this.$route.path ===
                                '/account/write-review/benefits',
                        }"
                    >
                        <nuxt-link
                            to="/account/write-review/benefits"
                            title="Benefits Review"
                            >Benefits</nuxt-link
                        >
                    </li>
                    <li
                        class="nav-link"
                        :class="{
                            active:
                                this.$route.path ===
                                '/account/write-review/workplace-photo',
                        }"
                    >
                        <nuxt-link
                            to="/account/write-review/workplace-photo"
                            title="Workplace Photo"
                            >Workplace Photo</nuxt-link
                        >
                    </li>
                </ul>
            </nav>
            <div class="col md-col-9">
                <nuxt-child />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    middleware: ["auth"],
};
</script>