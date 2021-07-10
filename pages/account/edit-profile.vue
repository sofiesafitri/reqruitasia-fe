<template>
    <div class="container myo">
        <client-only>
            <VueStickySidebar
                class="myo__side"
                containerSelector=".container"
                innerWrapperSelector=".myo__side--inner"
                :topSpacing="70"
            >
                <EditProfileSide
                    :user_data="user_data"
                    :completion="completion"
                    @updated="userUpdated"
                />
            </VueStickySidebar>
        </client-only>

        <main class="myo__main">
            <EditProfileBasic
                :user_data="user_data"
                :job_statuses="job_statuses"
                :relationships="relationships"
                :when_can_start_options="when_can_start_options"
                :residence_status_options="residence_status_options"
                :all_countries="all_countries"
                @updated="userUpdated"
            />
            <EditProfileAbout
                class="mb3"
                :user_data="user_data"
                @updated="userUpdated"
            />
            <EditProfileExperience
                class="mb3"
                :user_data="user_data"
                @updated="userUpdated"
            />
            <EditProfileOrganizationExperience
                class="mb3"
                :user_data="user_data"
                @updated="userUpdated"
            />
            <EditProfileEducation
                class="mb3"
                :user_data="user_data"
                :education_degrees="education_degrees"
                :education_fields="education_fields"
                @updated="userUpdated"
            />
            <EditProfileAward
                class="mb3"
                :user_data="user_data"
                @updated="userUpdated"
            />
            <EditProfileSkills
                class="mb3"
                :user_data="user_data"
                :pre_skill_options="skills"
                @updated="userUpdated"
            />
            <EditProfileInterest
                class="mb3"
                :user_data="user_data"
                :job_types="job_types"
                :jobfunctions="job_functions"
                :all_cities="all_cities"
                @updated="userUpdated"
            />
            <EditProfileResume
                class="mb3"
                :user_data="user_data"
                @updated="userUpdated"
            />
            <EditProfilePortofolio
                class="mb3"
                :user_data="user_data"
                @updated="userUpdated"
            />
            <EditProfileVideo
                class="mb3"
                :user_data="user_data"
                @updated="userUpdated"
            />
            <EditProfileEnglishAssessment class="mb3" :user_data="user_data" />
            <EditProfilePersonalityTest
                class="mb3"
                :user_data="user_data"
                :personality_test="personality_test"
            />
        </main>
    </div>
</template>

<script>
import EditProfileSide from "~/components/Account/EditProfile/EditProfileSide";
import EditProfileBasic from "~/components/Account/EditProfile/EditProfileBasic";
import EditProfileAbout from "~/components/Account/EditProfile/EditProfileAbout";
import EditProfileExperience from "~/components/Account/EditProfile/EditProfileExperience";
import EditProfileOrganizationExperience from "~/components/Account/EditProfile/EditProfileOrganizationExperience";
import EditProfileEducation from "~/components/Account/EditProfile/EditProfileEducation";
import EditProfileAward from "~/components/Account/EditProfile/EditProfileAward";
import EditProfileSkills from "~/components/Account/EditProfile/EditProfileSkills";
import EditProfileInterest from "~/components/Account/EditProfile/EditProfileInterest";
import EditProfileResume from "~/components/Account/EditProfile/EditProfileResume";
import EditProfilePortofolio from "~/components/Account/EditProfile/EditProfilePortofolio";
import EditProfileVideo from "~/components/Account/EditProfile/EditProfileVideo";
import EditProfileEnglishAssessment from "~/components/Account/EditProfile/EditProfileEnglishAssessment";
import EditProfilePersonalityTest from "~/components/Account/EditProfile/EditProfilePersonalityTest";

export default {
    middleware: ["auth"],
    components: {
        EditProfileSide,
        EditProfileBasic,
        EditProfileAbout,
        EditProfileExperience,
        EditProfileOrganizationExperience,
        EditProfileEducation,
        EditProfileAward,
        EditProfileSkills,
        EditProfileInterest,
        EditProfileResume,
        EditProfilePortofolio,
        EditProfileVideo,
        EditProfileEnglishAssessment,
        EditProfilePersonalityTest,
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
            ],
        };
    },
    async asyncData({ $axios }) {
        const { data } = await $axios.$get("account/profile");
        return {
            meta_title: data.meta_title,
            meta_description: data.meta_description,
            user_data: data.user,
            job_statuses: data.job_statuses,
            relationships: data.relationships,
            when_can_start_options: data.when_can_start_options,
            job_types: data.job_types,
            job_functions: data.job_functions,
            education_degrees: data.education_degrees,
            education_fields: data.education_fields,
            skills: data.skills,
            all_cities: data.all_cities,
            residence_status_options: data.residence_status_options,
            all_countries: data.all_countries,
            personality_test: data.personality_test,
            completion: {
                basic_info: false,
                about: false,
                experiences: false,
                organization_experience: false,
                educations: false,
                skills: false,
                awards: false,
                interest: false,
                resume: false,
                portofolio: false,
                video: false,
                english_assessment: false,
                percentage: 0,
            },
        };
    },
    mounted() {
        this.profileCompletion();
    },
    methods: {
        profileCompletion() {
            this.$axios
                .$get(`account/profile-completion`)
                .then((res) => {
                    this.completion = res.data;
                    if (res.data.percentage < 60) {
                        this.$swal({
                            icon: "warning",
                            title: "Profile",
                            text: "Silahkan lengkapi data profile Anda!",
                        });
                    }
                })
                .catch((err) => {
                    console.log(err.response);
                    if (err.response.data.message != undefined) {
                        this.swalWrong(err.response.data.message);
                    } else {
                        this.swalWrong();
                    }
                });
        },
        userUpdated(user) {
            this.user_data = user;
            this.profileCompletion();
        },
    },
};
</script>