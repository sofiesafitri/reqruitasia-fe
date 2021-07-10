<template>
    <header class="header" :class="header_class">
        <div class="container">
            <div class="header__logo col col-12 sm-col-12 md-col-12 lg-col-2">
                <!-- tag at the down is for showing logo on left of the header or on center if it's showing on mobile screen  -->
                <h1>
                    <nuxt-link to="/" :title="site_name">
                        <span v-if="logo_url == ''">{{ site_name }}</span>
                        <img v-else :src="logo_url" :alt="site_name" />
                    </nuxt-link>
                </h1>

                <div v-if="!explore_jobs" class="header__mobile-search">
                    <form @submit.prevent="searchJob" class="form">
                        <div class="form__group">
                            <div
                                class="input-group input-group--full input-group--no-append input-group--white"
                            >
                                <div
                                    class="input-group__prepend input-group__prepend--icon input-group__prepend--border"
                                >
                                    <i class="icon-search"></i>
                                </div>
                                <div
                                    class="input-group__main input-group__main--border"
                                >
                                    <input
                                        type="search"
                                        autocomplete="off"
                                        class="form__control form__control--bg-white"
                                        name="job-keyword"
                                        v-model="keyword"
                                        placeholder="Cari Pekerjaan..."
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
            <div class="header__top-menu col col-10">
                <!-- tag at the down is the header navigation menu which will appear only on desktop mode-->
                <nav class="top-menu-links flex items-center">
                    <ul>
                        <li v-for="(menu, i) in top_menu.links" :key="i">
                            <nuxt-link
                                v-if="menu.type == 'page'"
                                :to="`/page/${menu.url}`"
                                class="nav-link"
                                :title="menu.text"
                                >{{ menu.text }}</nuxt-link
                            >
                            <a
                                v-else
                                :href="menu.url"
                                :title="menu.text"
                                class="nav-link"
                                >{{ menu.text }}</a
                            >
                        </li>
                    </ul>
                </nav>
                <!-- authentication option (sign in and sign up)  -->
                <div class="header__auth">
                    <div
                        v-show="authenticated"
                        id="header__notification"
                        class="header__notification"
                        @click="showNotifications"
                    >
                        <i class="icon-notification"></i>
                        <span
                            v-if="has_unread_notifications"
                            class="header__notification-dot"
                            >&nbsp;</span
                        >
                        <div
                            v-show="notifListShow"
                            id="header__notification-list"
                            class="header__notification-list"
                        >
                            <div
                                v-if="loading_notification"
                                class="loading-image"
                            >
                                <img
                                    src="~/assets/images/loading.gif"
                                    alt="Loading"
                                />
                            </div>
                            <ul
                                v-else-if="
                                    !loading_notification &&
                                    notifications.length > 0
                                "
                                class="list"
                            >
                                <li
                                    v-for="(nt, i) in notifications"
                                    :key="i"
                                    :class="{ unread: !nt.is_read }"
                                    @click.stop="visitNotif(nt)"
                                >
                                    <span>{{ nt.data.text }}</span>
                                    <span class="created_at">{{
                                        nt.created_at_for_human
                                    }}</span>
                                </li>
                                <li
                                    v-if="next_notif_url !== ''"
                                    @click.stop="showMoreNotifications"
                                    class="action"
                                >
                                    <span v-if="!loading_next_page"
                                        >Tampilkan lagi</span
                                    >
                                    <span v-else>Memuat...</span>
                                </li>
                                <li
                                    @click.stop="markAllNotificatiionAsRead"
                                    v-if="has_unread_notifications"
                                    class="action"
                                >
                                    <span v-if="!processing_all_read"
                                        >Jadikan terbaca semua</span
                                    >
                                    <span v-else>Memproses...</span>
                                </li>
                            </ul>
                            <div
                                v-if="
                                    !loading_notification &&
                                    notifications.length === 0
                                "
                                class="header__notification-empty"
                            >
                                Tidak ada
                            </div>
                        </div>
                    </div>

                    <div v-if="authenticated" class="header__authenticated">
                        <div class="header__avatar">
                            <img
                                :src="user_avatar"
                                :alt="user.name"
                                class="img-fluid"
                            />
                        </div>
                        <div
                            class="header__auth-menu-trigger"
                            :class="header_text_class"
                        >
                            <i class="icon-arrow-down-2"></i>
                        </div>
                        <div class="header__auth-menu-wrapper">
                            <nav class="header__auth-menu">
                                <ul>
                                    <li>
                                        <nuxt-link
                                            to="/account/job-applications"
                                            title="Lamaran Saya"
                                            >Lamaran Saya</nuxt-link
                                        >
                                    </li>
                                    <li>
                                        <nuxt-link
                                            to="/account/bookmark"
                                            title="Bookmark"
                                            >Bookmark</nuxt-link
                                        >
                                    </li>
                                    <li>
                                        <nuxt-link
                                            to="/account/edit"
                                            title="Edit Akun"
                                            >Edit Akun</nuxt-link
                                        >
                                    </li>
                                    <li>
                                        <nuxt-link
                                            to="/account/edit-profile"
                                            title="Edit Profile"
                                            >Edit Profile</nuxt-link
                                        >
                                    </li>
                                    <li>
                                        <nuxt-link
                                            to="/account/write-review"
                                            title="Write Review"
                                            >Write Review</nuxt-link
                                        >
                                    </li>
                                    <li id="logout-link">
                                        <a
                                            href="#"
                                            title="Logout"
                                            @click.prevent="logout"
                                            >Logout <i class="icon-logout"></i
                                        ></a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div v-else class="header__auth-link flex items-center">
                        <ul>
                            <li>
                                <nuxt-link to="/auth/register" title="Register"
                                    >Register</nuxt-link
                                >
                            </li>
                            <li>
                                <nuxt-link to="/auth/login" title="Login"
                                    ><i class="icon-login"></i> Login</nuxt-link
                                >
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import NotificationMixin from "~/plugins/mixins/notification";

export default {
    mixins: ["NotificationMixin"],
    data() {
        return {
            keyword: "",
            is_home: false,
            explore_jobs: false,
            user_avatar: "",
            site_name: this.$store.getters.site_name,
            // header_class: this.$route.path == "/" ? "dark" : "light",
            header_class: "light",
            // header_text_class: this.$route.path == "/" ? "light" : "",
            header_text_class: "",
            btn_outline_class:
                this.$route.path == "/"
                    ? "btn-outline--color-light"
                    : "btn-outline--color-dark",
            // logo_url:
            //     this.$route.path == "/"
            //         ? this.$store.getters.logo.light
            //         : this.$store.getters.logo.frontend,
            logo_url: this.$store.getters.logo.frontend,
            notifListShow: false,
            employer_site_url: process.env.EMPLOYER_BASE_URL,
            top_menu: this.$store.getters.menus.top_menu,
        };
    },
    created() {
        if (this.authenticated) {
            this.user_avatar = this.user.avatar_url;
            this.has_unread_notifications = this.user.has_unread_notifications;
        }

        this.$bus.$on("avatar-update", (avatar_url) => {
            this.user_avatar = avatar_url;
        });

        // this.routeCheck();

        if (process.client) {
            const notifEl = document.getElementById("header__notification");
            const vm = this;
            document.addEventListener("click", function (event) {
                const isClickInsideEl = notifEl.contains(event.target);
                if (!isClickInsideEl) {
                    vm.notifListShow = false;
                }
            });
        }
    },
    methods: {
        logout() {
            this.$auth.logout().then((res) => {
                this.$router.push("/");
            });
        },
        searchJob() {
            this.$router.push(`/explore-jobs?keyword=${this.keyword}`);
        },
        routeCheck() {
            let route_path = this.$route.path;
            if (route_path == "/") {
                this.is_home = true;
                this.logo_url = this.$store.getters.logo.light;
                this.header_class = "dark";
                this.btn_outline_class = "btn-outline--color-light";
                this.header_text_class = "light";
            } else {
                this.is_home = false;
                this.logo_url = this.$store.getters.logo.frontend;
                this.header_class = "light";
                this.btn_outline_class = "btn-outline--color-dark";
                this.header_text_class = "";
            }

            this.explore_jobs = route_path == "/explore-jobs" ? true : false;
        },
        showNotifications() {
            this.notifListShow = !this.notifListShow;

            if (this.notifListShow) {
                this.getNotifications();
            }
        },
        visitNotif(notification) {
            this.visitNotification(notification);
            this.notifListShow = false;
        },
    },
    // watch: {
    //     $route() {
    //         this.routeCheck();
    //     },
    // },
};
</script>