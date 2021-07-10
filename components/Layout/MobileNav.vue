<template>
    <div v-if="!keyboard_displayed">
        <nav id="mobile-nav" class="mobile-nav">
            <ul>
                <li>
                    <nuxt-link
                        to="/"
                        title="Home"
                        :class="{ active: home_active }"
                        ><i class="icon-home"></i
                    ></nuxt-link>
                </li>
                <li>
                    <nuxt-link
                        to="/account/bookmark"
                        title="Bookmark"
                        :class="{ active: bookmark_active }"
                        ><i class="icon-bookmark"></i
                    ></nuxt-link>
                </li>
                <li>
                    <nuxt-link
                        to="/account/notification"
                        title="Notification"
                        :class="{ active: notification_active }"
                    >
                        <div class="mobile-nav__icon-wrapper">
                            <i class="icon-notification"></i>
                            <span
                                v-if="has_unread_notifications"
                                class="mobile-nav__notification-dot"
                                >&nbsp;</span
                            >
                        </div>
                    </nuxt-link>
                </li>
                <li>
                    <a
                        href="#"
                        title="Account"
                        @click.prevent="openAccountNav"
                        :class="{ active: open_menu }"
                        ><i class="icon-profile"></i
                    ></a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            open_menu: false,
            home_active: false,
            bookmark_active: false,
            notification_active: false,
            account_active: false,
            keyboard_displayed: false,
        };
    },
    created() {
        this.setActiveMenu();

        this.$nuxt.$on("close-account-nav", () => {
            this.open_menu = false;
        });

        if (this.authenticated) {
            this.has_unread_notifications = this.user.has_unread_notifications;
        }

        this.$nuxt.$on("is-notification-clean", (is_clean) => {
            this.has_unread_notifications = is_clean;
        });

        if (process.client) {
            const unsubscribe = this.$detect_keyboard((visibility) => {
                if (visibility === "hidden") {
                    this.keyboard_displayed = false;
                } else {
                    this.keyboard_displayed = true;
                }
            });
        }
    },
    methods: {
        setActiveMenu() {
            this.resetActiveMenu();

            switch (this.$route.path) {
                case "/":
                    this.home_active = true;
                    break;
                case "/account/bookmark":
                    this.bookmark_active = true;
                    break;
                case "/account/notification":
                    this.notification_active = true;
                    break;
                default:
                    this.home_active = false;
                    this.bookmark_active = false;
                    this.notification_active = false;
                    break;
            }
        },
        resetActiveMenu() {
            this.home_active = false;
            this.bookmark_active = false;
            this.notification_active = false;
            this.account_active = false;
        },
        openAccountNav() {
            this.$bus.$emit("show-account-nav");
            this.open_menu = true;
        },
    },
    watch: {
        $route() {
            this.setActiveMenu();
        },
    },
};
</script>