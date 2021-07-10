require("dotenv").config();

export default {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: "Reqruit",
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            {
                hid: "description",
                name: "description",
                content: "Reqruit website"
            },

            {
                name: "theme-color",
                content: "#015f92"
            }
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
    },

    router: {
        middleware: "route-history"
    },

    /*
     ** Customize the progress-bar color
     */
    loading: { color: "#015f92" },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: ["~/assets/scss/main.scss"],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        { src: "~/plugins/axios" },
        { src: "~/plugins/filters" },
        { src: "~/plugins/mixins/user" },
        { src: "~/plugins/mixins/validation" },
        { src: "~/plugins/vuelidate" },
        { src: "~/plugins/mixins/swal" },
        { src: "~/plugins/bus" },
        { src: "~/plugins/vue-select", ssr: false },
        { src: "~/plugins/mixins/axios-error" },
        { src: "~/plugins/jsonld" },
        { src: "~/plugins/silentbox" },
        { src: "~/plugins/sticky-sidebar", ssr: false },
        { src: "~/plugins/smooth-scroll", ssr: false },
        { src: "~/plugins/money", ssr: false },
        { src: "~/plugins/keyboard-detector", ssr: false },
        { src: "~/plugins/nl2br", ssr: false }
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: ["@nuxtjs/pwa"],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        "@nuxtjs/axios",
        "@nuxtjs/pwa",
        "@nuxtjs/dotenv",
        "@nuxtjs/style-resources",
        "@nuxtjs/auth",
        "vue-sweetalert2/nuxt",
        "@nuxtjs/sitemap",
        "@nuxtjs/robots"
    ],

    manifest: {
        name: "Reqruit",
        short_name: "Reqruit",
        lang: "id",
        display: "standalone"
    },

    styleResources: {
        // your settings here
        scss: ["~assets/scss/abstracts/_variables.scss"]
    },

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
        baseURL: process.env.API_BASE_URL
    },

    auth: {
        redirect: {
            login: "/auth/login",
            logout: "/auth/login",
            callback: "/auth/login",
            home: "/account/edit-profile"
        },
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: "/login",
                        method: "post",
                        propertyName: "token"
                    },
                    logout: { url: "/logout", method: "post" },
                    user: {
                        url: "/user-data",
                        method: "get",
                        propertyName: "data"
                    }
                }
            }
        }
    },

    pageTransition: {
        name: "page",
        mode: "out-in"
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        optimization: {
            splitChunks: {
                chunks: "async"
            }
        },
        splitChunks: {
            pages: true,
            vendor: true,
            commons: true,
            runtime: true,
            layouts: true
        },
        extend(config, ctx) {}
    }
};
