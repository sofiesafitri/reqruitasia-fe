<template>
    <div class="content-wrapper">
        <Header />
        <HeaderSecondary />
        <!-- <NewHeader /> -->
        <div class="content">
            <nuxt />
        </div>
        <MobileNav />
        <MobileAccountNav />
        <NewFooter/>
        <!-- <Footer /> -->
        <LoadingBlock />
    </div>
</template>

<script>
import Header from "~/components/Layout/Header";
import HeaderSecondary from "~/components/Layout/HeaderSecondary";
import MobileNav from "~/components/Layout/MobileNav";
import Footer from "~/components/Layout/Footer";
import LoadingBlock from "~/components/Layout/LoadingBlock";
import MobileAccountNav from "~/components/Layout/MobileAccountNav";
import NewHeader from "~/components/Layout/New-Header.vue"
import NewFooter from "~/components/Layout/New-Footer.vue"

export default {
    components: {
        Header,
        HeaderSecondary,
        MobileNav,
        Footer,
        LoadingBlock,
        MobileAccountNav,
        NewHeader,
        NewFooter,
    },
};
</script>