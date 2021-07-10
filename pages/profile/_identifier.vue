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
                <ProfileSide :user_data="user_data" />
            </VueStickySidebar>
        </client-only>

        <main class="myo__main">
            <ProfileBasic :user_data="user_data" />
            <ProfileAbout class="mb3" :user_data="user_data" />
            <ProfileExperience class="mb3" :user_data="user_data" />
            <ProfileOrganizationExperience class="mb3" :user_data="user_data" />
            <ProfileEducation class="mb3" :user_data="user_data" />
            <ProfileSkills class="mb3" :user_data="user_data" />
            <ProfileAward class="mb3" :user_data="user_data" />
            <ProfileInterest class="mb3" :user_data="user_data" />
            <ProfileResume class="mb3" :user_data="user_data" />
            <ProfilePortofolio class="mb3" :user_data="user_data" />
            <ProfileVideo class="mb3" :user_data="user_data" />
            <ProfileEnglishAssessment class="mb3" :user_data="user_data" />
            <ProfilePersonalityTest
                class="mb3"
                :user_data="user_data"
                :personality_test="personality_test"
            />
        </main>
    </div>
</template>

<script>
import ProfileSide from "~/components/Profile/ProfileSide";
import ProfileBasic from "~/components/Profile/ProfileBasic";
import ProfileAbout from "~/components/Profile/ProfileAbout";
import ProfileExperience from "~/components/Profile/ProfileExperience";
import ProfileOrganizationExperience from "~/components/Profile/ProfileOrganizationExperience";
import ProfileEducation from "~/components/Profile/ProfileEducation";
import ProfileSkills from "~/components/Profile/ProfileSkills";
import ProfileAward from "~/components/Profile/ProfileAward";
import ProfileInterest from "~/components/Profile/ProfileInterest";
import ProfileResume from "~/components/Profile/ProfileResume";
import ProfilePortofolio from "~/components/Profile/ProfilePortofolio";
import ProfileVideo from "~/components/Profile/ProfileVideo";
import ProfileEnglishAssessment from "~/components/Profile/ProfileEnglishAssessment";
import ProfilePersonalityTest from "~/components/Profile/ProfilePersonalityTest";

export default {
    components: {
        ProfileSide,
        ProfileBasic,
        ProfileAbout,
        ProfileExperience,
        ProfileOrganizationExperience,
        ProfileEducation,
        ProfileSkills,
        ProfileAward,
        ProfileInterest,
        ProfileResume,
        ProfilePortofolio,
        ProfileVideo,
        ProfileEnglishAssessment,
        ProfilePersonalityTest,
    },
    head() {
        return {
            title: this.meta_title,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: this.meta_description,
                },
                {
                    hid: `og:title`,
                    property: "og:title",
                    content: this.meta_title,
                },
                {
                    hid: `og:url`,
                    property: "og:url",
                    content: this.current_page_url,
                },
                {
                    hid: `og:description`,
                    property: "og:description",
                    content: this.meta_description,
                },
            ],
        };
    },
    async asyncData({ $axios, params }) {
        const { data } = await $axios.$get(`profile/${params.identifier}`);
        const baseUrl = process.env.APP_BASE_URL;

        return {
            meta_title: data.meta_title,
            meta_description: data.meta_description,
            user_data: data.user,
            personality_test: data.personality_test,
            current_page_url: `${baseUrl}/profile/${data.user.identifier}`,
        };
    },
};
</script>