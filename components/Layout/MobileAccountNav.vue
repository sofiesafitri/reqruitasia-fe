<template>
    <div>
        <div v-if="show_nav" class="man__outer" @click="closeNav">&nbsp;</div>
        <div class="man" :class="{ show: show_nav }">
            <div class="man__logo">
                <img :src="logo_url" :alt="site_name" class="img-fluid" />
            </div>
            <div v-if="authenticated" class="man__avatar">
                <div class="avatar">
                    <img
                        :src="user_avatar"
                        :alt="user.name"
                        class="img-fluid"
                    />
                </div>
                <div class="man__user-name">{{ user.name }}</div>
            </div>

            <nav v-if="authenticated" class="man__auth-menu">
                <ul>
                    <li>
                        <nuxt-link
                            @click.native="closeNav"
                            to="/account/job-applications"
                            title="Lamaran Saya"
                            >Lamaran Saya</nuxt-link
                        >
                    </li>
                    <li>
                        <nuxt-link
                            @click.native="closeNav"
                            to="/account/bookmark"
                            title="Bookmark"
                            >Bookmark</nuxt-link
                        >
                    </li>
                    <li>
                        <nuxt-link
                            @click.native="closeNav"
                            to="/account/edit"
                            title="Edit Akun"
                            >Edit Akun</nuxt-link
                        >
                    </li>
                    <li>
                        <nuxt-link
                            @click.native="closeNav"
                            to="/account/edit-profile"
                            title="Edit Profile"
                            >Edit Profile</nuxt-link
                        >
                    </li>
                </ul>
            </nav>
            <div v-if="authenticated" class="man__logout">
                <a href="#" title="Logout" @click.prevent="logout"
                    >&larr; Logout</a
                >
            </div>

            <div v-if="!authenticated" class="man__auth-buttons">
                <nuxt-link
                    @click.native="closeNav"
                    to="/auth/login"
                    class="btn btn--lg btn--primary btn--block mb3"
                    title="Masuk"
                    ><i class="icon-login"></i> Masuk</nuxt-link
                >
                <nuxt-link
                    @click.native="closeNav"
                    to="/auth/register"
                    class="btn btn--warning btn--lg btn--block"
                    title="Daftar"
                    >Daftar</nuxt-link
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show_nav: false,
            user_avatar: "",
            site_name: this.$store.getters.site_name,
            logo_url: this.$store.getters.logo.frontend,
        };
    },
    created() {
        if (this.authenticated) {
            this.user_avatar = this.user.avatar_url;
        }

        this.$bus.$on("avatar-update", (avatar_url) => {
            this.user_avatar = avatar_url;
        });

        this.$bus.$on("show-account-nav", () => {
            this.show_nav = true;
        });
    },
    methods: {
        logout() {
            this.$auth.logout().then((res) => {
                this.closeNav();
                this.$router.push("/");
            });
        },
        closeNav() {
            this.show_nav = false;
            this.$bus.$emit("close-account-nav");
        },
    },
};
</script>