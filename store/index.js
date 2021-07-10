export const state = () => ({
    site_name: "",
    logo: [],
    locale: "",
    base_currency: "",
    currency_symbol: "",
    menus: [],
    footer_content: "",
    footer_bg_image_enable: "",
    footer_bg_image_url: "",
    social_media: [],
    option_select: []
});

// Getters
export const getters = {
    site_name(state) {
        return state.site_name;
    },
    logo(state) {
        return state.logo;
    },
    locale(state) {
        return state.locale;
    },
    base_currency(state) {
        return state.base_currency;
    },
    currency_symbol(state) {
        return state.currency_symbol;
    },
    menus(state) {
        return state.menus;
    },
    footer_content(state) {
        return state.footer_content;
    },
    footer_bg_image_enable(state) {
        return state.footer_bg_image_enable;
    },
    footer_bg_image_url(state) {
        return state.footer_bg_image_url;
    },
    social_media(state) {
        return state.social_media;
    },
    option_select(state) {
        return state.option_select;
    }
};

// Mutations
export const mutations = {
    SET_SITE_NAME(state, site_name) {
        state.site_name = site_name;
    },
    SET_LOGO(state, logo) {
        state.logo = logo;
    },
    SET_LOCALE(state, locale) {
        state.locale = locale;
    },
    SET_BASE_CURRENCY(state, base_currency) {
        state.base_currency = base_currency;
    },
    SET_CURRENCY_SYMBOL(state, currency_symbol) {
        state.currency_symbol = currency_symbol;
    },
    SET_MENUS(state, menus) {
        state.menus = menus;
    },
    SET_FOOTER_CONTENT(state, footer_content) {
        state.footer_content = footer_content;
    },
    SET_FOOTER_BG_IMAGE_ENABLE(state, footer_bg_image_enable) {
        state.footer_bg_image_enable = footer_bg_image_enable;
    },
    SET_FOOTER_BG_IMAGE_URL(state, footer_bg_image_url) {
        state.footer_bg_image_url = footer_bg_image_url;
    },
    SET_SOCIAL_MEDIA(state, social_media) {
        state.social_media = social_media;
    },
    SET_OPTION_SELECT(state, option_select) {
        state.option_select = option_select;
    }
};

// Actions
export const actions = {
    async nuxtServerInit(vuexContext, context) {
        return await context.app.$axios
            .$get("/site-content")
            .then(res => {
                vuexContext.commit("SET_SITE_NAME", res.data.site_name);
                vuexContext.commit("SET_LOGO", res.data.logo);
                vuexContext.commit("SET_LOCALE", res.data.locale);
                vuexContext.commit(
                    "SET_BASE_CURRENCY",
                    res.data.currency.base_currency
                );
                vuexContext.commit(
                    "SET_CURRENCY_SYMBOL",
                    res.data.currency.currency_symbol
                );
                vuexContext.commit("SET_MENUS", res.data.menus);
                vuexContext.commit(
                    "SET_FOOTER_CONTENT",
                    res.data.footer.content
                );
                vuexContext.commit(
                    "SET_FOOTER_BG_IMAGE_ENABLE",
                    res.data.footer.enable_bg_image
                );
                vuexContext.commit(
                    "SET_FOOTER_BG_IMAGE_URL",
                    res.data.footer.bg_image
                );
                vuexContext.commit("SET_SOCIAL_MEDIA", res.data.social_media);
                vuexContext.commit("SET_OPTION_SELECT", res.data.option_select);
            })
            .catch(e => context.error(e));
    }
};
