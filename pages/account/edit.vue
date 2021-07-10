<template>
    <div class="container myo">
        <client-only>
            <VueStickySidebar
                class="myo__side"
                containerSelector=".container"
                innerWrapperSelector=".myo__side--inner"
                :topSpacing="70"
                :minWidth="992"
            >
                <AccountEditSide
                    :user_data="user_data"
                    @navigate="navigate"
                    :active_menu="active_menu"
                />
            </VueStickySidebar>
        </client-only>

        <main class="myo__main">
            <ManagePassword @updated="userUpdated" :active_menu="active_menu" />
        </main>
    </div>
</template>

<script>
import AccountEditSide from "~/components/Account/Edit/AccountEditSide";
import ManagePassword from "~/components/Account/Edit/ManagePassword";

export default {
    middleware: ["auth"],
    components: {
        AccountEditSide,
        ManagePassword,
    },
    async asyncData({ $axios }) {
        const { data } = await $axios.$get("user-data");
        return {
            user_data: data,
            active_menu: "manage-password",
        };
    },
    methods: {
        navigate(to) {
            this.active_menu = to;
        },
        userUpdated(user) {
            this.user_data = user;
        },
    },
};
</script>