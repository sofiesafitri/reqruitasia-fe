<template>
    <div class="job-search__form">
        <form @submit.prevent="search" class="form">
            <div class="form__group">
                <div
                    class="input-group input-group--full input-group--no-append input-group--white"
                >
                    <div
                        class="input-group__prepend input-group__prepend--icon input-group__prepend--border"
                    >
                        <i class="icon-search"></i>
                    </div>
                    <div class="input-group__main input-group__main--border">
                        <input
                            type="search"
                            autocomplete="off"
                            v-model="form.keyword"
                            class="form__control form__control--bg-white"
                            name="job-keyword"
                            placeholder="Cari Pekerjaan..."
                        />
                    </div>
                </div>
            </div>
        </form>

        <a
            href="#"
            @click.prevent="show_mobile_filter = true"
            class="ffi__mobile-trigger"
        >
            <i class="icon-filter"></i>
        </a>

        <div
            class="form__filter-input ffi"
            :class="{ show: show_mobile_filter }"
        >
            <div class="ffi__mobile-action">
                <a
                    href="#"
                    @click.prevent="show_mobile_filter = false"
                    title="Kembali"
                    ><i class="icon-arrow-left"></i
                ></a>
                <a href="#" @click.prevent="resetFilter" title="Reset Filter"
                    ><i class="icon-delete"></i> Reset Filter</a
                >
            </div>

            <div class="ffi__items">
                <div class="ffi__item-wrapper">
                    <div class="ffi__item" @click="active_filter = 'category'">
                        <div class="ffi__name">
                            <span class="text">Kategori</span>
                            <sup
                                class="badge"
                                v-if="form.jobfunctions.length > 0"
                            >
                                {{ form.jobfunctions.length }}
                            </sup>
                        </div>
                        <div class="ffi__icon">
                            <i class="icon-arrow-down-2"></i>
                        </div>
                    </div>
                    <div
                        class="ffi__search-filter"
                        :class="{ active: active_filter == 'category' }"
                    >
                        <div class="ffi__search-filter-form form__group">
                            <input
                                type="text"
                                class="form__control"
                                placeholder="Ketik kategori"
                                v-model="jobfunction_keyword"
                                @keyup="searchJobfunction"
                            />
                            <div
                                v-if="jobfunction_search_result.length > 0"
                                class="ffi__search-result"
                            >
                                <ul>
                                    <li
                                        v-for="(
                                            jobfunction, i
                                        ) in jobfunction_search_result"
                                        :key="i"
                                        @click="selectJobFunction(jobfunction)"
                                    >
                                        {{ jobfunction.name }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="ffi__popular-text">Popular Kategori</div>
                        <div class="ffi__filter-list">
                            <ul>
                                <li
                                    v-for="(
                                        jobfunction, i
                                    ) in data.popular_cats"
                                    :key="i"
                                    @click="selectJobFunction(jobfunction)"
                                >
                                    {{ jobfunction.name }}
                                </li>
                            </ul>
                        </div>
                        <div
                            class="ffi__remove"
                            @click="removeFilters('jobfunction')"
                        >
                            <i class="icon-delete"></i> Hapus filter
                        </div>
                    </div>
                </div>

                <div class="ffi__item-wrapper">
                    <div class="ffi__item" @click="active_filter = 'skill'">
                        <div class="ffi__name">
                            <span class="text">Skill</span>
                            <sup class="badge" v-if="form.skills.length > 0">
                                {{ form.skills.length }}
                            </sup>
                        </div>
                        <div class="ffi__icon">
                            <i class="icon-arrow-down-2"></i>
                        </div>
                    </div>
                    <div
                        class="ffi__search-filter"
                        :class="{ active: active_filter == 'skill' }"
                    >
                        <div class="ffi__search-filter-form form__group">
                            <input
                                type="text"
                                class="form__control"
                                placeholder="Ketik skill"
                                v-model="skill_keyword"
                                @keyup="searchSkill"
                            />
                            <div
                                v-if="skill_search_result.length > 0"
                                class="ffi__search-result"
                            >
                                <ul>
                                    <li
                                        v-for="(
                                            skill, i
                                        ) in skill_search_result"
                                        :key="i"
                                        @click="selectSkill(skill)"
                                    >
                                        {{ skill.name }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="ffi__popular-text">Popular Skills</div>
                        <div class="ffi__filter-list">
                            <ul>
                                <li
                                    v-for="(skill, i) in data.popular_skills"
                                    :key="i"
                                    @click="selectSkill(skill)"
                                >
                                    {{ skill.name }}
                                </li>
                            </ul>
                        </div>
                        <div
                            class="ffi__remove"
                            @click="removeFilters('skill')"
                        >
                            <i class="icon-delete"></i> Hapus filter
                        </div>
                    </div>
                </div>

                <div class="ffi__item-wrapper">
                    <div class="ffi__item" @click="active_filter = 'location'">
                        <div class="ffi__name">
                            <span class="text">Lokasi</span>
                            <sup class="badge" v-if="form.cities.length > 0">
                                {{ form.cities.length }}
                            </sup>
                        </div>
                        <div class="ffi__icon">
                            <i class="icon-arrow-down-2"></i>
                        </div>
                    </div>
                    <div
                        class="ffi__search-filter"
                        :class="{ active: active_filter == 'location' }"
                    >
                        <div class="ffi__search-filter-form form__group">
                            <input
                                type="text"
                                class="form__control"
                                placeholder="Ketik name kota"
                                v-model="city_keyword"
                                @keyup="searchCity"
                            />
                            <div
                                v-if="city_search_result.length > 0"
                                class="ffi__search-result"
                            >
                                <ul>
                                    <li
                                        v-for="(city, i) in city_search_result"
                                        :key="i"
                                        @click="selectCity(city)"
                                    >
                                        {{ city.name }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="ffi__popular-text">Popular Cities</div>
                        <div class="ffi__filter-list">
                            <ul>
                                <li
                                    v-for="(city, i) in data.popular_cities"
                                    :key="i"
                                    @click="selectCity(city)"
                                >
                                    {{ city.name }}
                                </li>
                            </ul>
                        </div>
                        <div class="ffi__remove" @click="removeFilters('city')">
                            <i class="icon-delete"></i> Hapus filter
                        </div>
                    </div>
                </div>

                <div class="ffi__item-wrapper">
                    <div class="ffi__item" @click="active_filter = 'job_type'">
                        <div class="ffi__name">
                            <span class="text">Tipe Pekerjaan</span>
                            <sup class="badge" v-if="form.job_types.length > 0">
                                {{ form.job_types.length }}
                            </sup>
                        </div>
                        <div class="ffi__icon">
                            <i class="icon-arrow-down-2"></i>
                        </div>
                    </div>
                    <div
                        class="ffi__search-filter"
                        :class="{ active: active_filter == 'job_type' }"
                    >
                        <div class="ffi__filter-list">
                            <ul>
                                <li
                                    v-for="(type, i) in data.job_type_select"
                                    :key="i"
                                    @click="selectType(type)"
                                >
                                    {{ type.text }}
                                </li>
                            </ul>
                        </div>
                        <div
                            class="ffi__remove"
                            @click="removeFilters('job_type')"
                        >
                            <i class="icon-delete"></i> Hapus filter
                        </div>
                    </div>
                </div>

                <div class="ffi__item-wrapper">
                    <div class="ffi__item" @click="active_filter = 'company'">
                        <div class="ffi__name">
                            <span class="text">Perusahaan</span>
                            <sup class="badge" v-if="form.companies.length > 0">
                                {{ form.companies.length }}
                            </sup>
                        </div>
                        <div class="ffi__icon">
                            <i class="icon-arrow-down-2"></i>
                        </div>
                    </div>
                    <div
                        class="ffi__search-filter"
                        :class="{ active: active_filter == 'company' }"
                    >
                        <div class="ffi__search-filter-form form__group">
                            <input
                                type="text"
                                class="form__control"
                                placeholder="Ketik nama perusahaan"
                                v-model="company_keyword"
                                @keyup="searchCompany"
                            />
                            <div
                                v-if="company_search_result.length > 0"
                                class="ffi__search-result"
                            >
                                <ul>
                                    <li
                                        v-for="(
                                            company, i
                                        ) in company_search_result"
                                        :key="i"
                                        @click="selectCompany(company)"
                                    >
                                        {{ company.name }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="ffi__popular-text">Popular Companies</div>
                        <div class="ffi__filter-list">
                            <ul>
                                <li
                                    v-for="(
                                        company, i
                                    ) in data.popular_companies"
                                    :key="i"
                                    @click="selectCompany(company)"
                                >
                                    {{ company.name }}
                                </li>
                            </ul>
                        </div>
                        <div
                            class="ffi__remove"
                            @click="removeFilters('company')"
                        >
                            <i class="icon-delete"></i> Hapus filter
                        </div>
                    </div>
                </div>

                <div class="ffi__item-wrapper">
                    <div class="ffi__item" @click="active_filter = 'salary'">
                        <div class="ffi__name">Salary</div>
                        <div class="ffi__icon">
                            <i class="icon-arrow-down-2"></i>
                        </div>
                    </div>
                    <div
                        class="ffi__search-filter"
                        :class="{ active: active_filter == 'salary' }"
                    >
                        <div class="ffi__search-filter-form">
                            <input
                                type="text"
                                class="form__control"
                                placeholder="Gaji Minimum"
                                v-model.number="form.salary_min"
                                @keyup="salaryUpdate('salary_min')"
                            />
                        </div>
                        <div class="ffi__search-filter-form">
                            <input
                                type="text"
                                class="form__control"
                                placeholder="Gaji Maksimum"
                                v-model.number="form.salary_max"
                                @keyup="salaryUpdate('salary_max')"
                            />
                        </div>

                        <div
                            class="ffi__remove"
                            @click="removeFilters('salary')"
                        >
                            <i class="icon-delete"></i> Hapus filter
                        </div>
                    </div>
                </div>

                <div class="ffi__item-wrapper">
                    <div
                        class="ffi__item"
                        @click="active_filter = 'experience'"
                    >
                        <div class="ffi__name">
                            <span class="text">Pengalaman</span>
                            <sup class="badge" v-if="form.experience !== null"
                                >1</sup
                            >
                        </div>
                        <div class="ffi__icon">
                            <i class="icon-arrow-down-2"></i>
                        </div>
                    </div>
                    <div
                        class="ffi__search-filter"
                        :class="{ active: active_filter == 'experience' }"
                    >
                        <div class="ffi__filter-list">
                            <ul>
                                <li
                                    v-for="(
                                        experience, i
                                    ) in data.job_experience_select"
                                    :key="i"
                                >
                                    <label class="ir-container"
                                        >{{ experience.text }}
                                        <input
                                            type="radio"
                                            :value="experience.value"
                                            name="experience"
                                            v-model="form.experience"
                                            @click="
                                                selectExperience(experience)
                                            "
                                        />
                                        <span class="checkmark"></span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div
                            class="ffi__remove"
                            @click="removeFilters('experience')"
                        >
                            <i class="icon-delete"></i> Hapus filter
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="job-search__filter-list">
            <div class="job-search__filter-text">Filter:</div>
            <div class="job-search__filter-items">
                <div
                    class="job-search__filter-item"
                    v-for="(filter, i) in filter_list"
                    :key="i"
                >
                    <span class="text">{{ filter.text }}</span>
                    <span class="remove" @click="removeFilter(i)"
                        ><i class="icon-close-square"></i
                    ></span>
                </div>
            </div>
            <a
                v-if="filter_list.length > 0"
                href="#"
                @click.prevent="resetFilter"
                class="reset-filters"
                ><i class="icon-delete"></i> Reset filter</a
            >
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            active_filter: "",
            show_mobile_filter: false,
            jobfunction_keyword: "",
            timer: null,
            jobfunction_search_result: [],
            skill_keyword: "",
            skill_search_result: [],
            city_keyword: "",
            city_search_result: [],
            company_keyword: "",
            company_search_result: [],
            form: {
                keyword: this.data.keyword,
                jobfunctions: [],
                skills: [],
                cities: [],
                job_types: [],
                companies: [],
                salary_min: null,
                salary_max: null,
                experience: null,
            },
            filter_list: [],
        };
    },
    mounted() {
        if (process.client) {
            document.addEventListener("click", (e) => {
                if (e.target.closest(".ffi__item-wrapper") === null) {
                    let filter_elements = document.querySelectorAll(
                        ".ffi__search-filter"
                    );
                    filter_elements.forEach((element) => {
                        element.classList.remove("active");
                    });
                }
            });
        }
    },
    methods: {
        search() {
            this.$bus.$emit("search_job");

            let params = {
                status: "published",
            };

            if (this.form.keyword != "") {
                params["keyword"] = this.form.keyword;
            }
            if (this.form.jobfunctions.length > 0) {
                params["jobfunctions"] = this.form.jobfunctions.join();
            }
            if (this.form.skills.length > 0) {
                params["skills"] = this.form.skills.join();
            }
            if (this.form.cities.length > 0) {
                params["cities"] = this.form.cities.join();
            }
            if (this.form.job_types.length > 0) {
                params["job_types"] = this.form.job_types.join();
            }
            if (this.form.companies.length > 0) {
                params["companies"] = this.form.companies.join();
            }
            if (this.form.salary_min > 0) {
                params["salary_min"] = this.form.salary_min;
            }
            if (this.form.salary_max > 0) {
                params["salary_max"] = this.form.salary_max;
            }
            if (this.form.experience !== null) {
                params["work_experience"] = this.form.experience;
            }

            let urlParams = new URLSearchParams(params).toString();

            this.$axios
                .$get(`job/search?${urlParams}`)
                .then((res) => {
                    let data = res.data;
                    this.$emit("update_result", data);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    this.$bus.$emit("search_job_finish");
                });
        },
        resetFilter() {
            // this.form.keyword = "";
            this.form.jobfunctions = [];
            this.form.skills = [];
            this.form.cities = [];
            this.form.job_types = [];
            this.form.companies = [];
            this.form.salary_min = null;
            this.form.salary_max = null;
            this.form.experience = null;
            this.filter_list = [];
        },
        searchJobfunction() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                if (this.jobfunction_keyword.length > 2) {
                    this.$axios
                        .$post(`jobfunctions-search`, {
                            keyword: this.jobfunction_keyword,
                        })
                        .then((res) => {
                            let data = res.data;
                            this.jobfunction_search_result = data;
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }, 800);
        },
        selectJobFunction(jobfunction) {
            if (!this.isInFilterList("jobfunction", jobfunction.id)) {
                this.form.jobfunctions.push(jobfunction.id);

                let new_filter = {
                    type: "jobfunction",
                    id: jobfunction.id,
                    text: jobfunction.name,
                };
                this.filter_list.push(new_filter);
            }
            this.jobfunction_keyword = "";
            this.jobfunction_search_result = [];
            this.active_filter = "";
        },
        searchSkill() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                if (this.skill_keyword.length > 2) {
                    this.$axios
                        .$post(`skills-search`, {
                            keyword: this.skill_keyword,
                        })
                        .then((res) => {
                            let data = res.data;
                            this.skill_search_result = data;
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }, 800);
        },
        selectSkill(skill) {
            if (!this.isInFilterList("skill", skill.id)) {
                this.form.skills.push(skill.id);

                let new_filter = {
                    type: "skill",
                    id: skill.id,
                    text: skill.name,
                };
                this.filter_list.push(new_filter);
            }
            this.skill_keyword = "";
            this.skill_search_result = [];
            this.active_filter = "";
        },
        selectType(type) {
            if (!this.isInFilterList("job_type", type.value)) {
                this.form.job_types.push(type.value);

                let new_filter = {
                    type: "job_type",
                    id: type.value,
                    text: type.text,
                };
                this.filter_list.push(new_filter);
            }
            this.active_filter = "";
        },
        searchCity() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                if (this.city_keyword.length > 2) {
                    this.$axios
                        .$post(`cities-search`, {
                            name: this.city_keyword,
                        })
                        .then((res) => {
                            let data = res.data;
                            this.city_search_result = data;
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }, 800);
        },
        selectCity(city) {
            if (!this.isInFilterList("city", city.id)) {
                this.form.cities.push(city.id);

                let new_filter = {
                    type: "city",
                    id: city.id,
                    text: city.name,
                };
                this.filter_list.push(new_filter);
            }
            this.city_keyword = "";
            this.city_search_result = [];
            this.active_filter = "";
        },
        searchCompany() {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                if (this.company_keyword.length > 2) {
                    this.$axios
                        .$post(`companies-search`, {
                            name: this.company_keyword,
                        })
                        .then((res) => {
                            let data = res.data;
                            this.company_search_result = data;
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }, 800);
        },
        selectCompany(company) {
            if (!this.isInFilterList("company", company.id)) {
                this.form.companies.push(company.id);

                let new_filter = {
                    type: "company",
                    id: company.id,
                    text: company.name,
                };
                this.filter_list.push(new_filter);
            }
            this.company_keyword = "";
            this.company_search_result = [];
            this.active_filter = "";
        },
        selectExperience(experience) {
            this.form.experience = experience.value;

            if (!this.isInFilterList("experience", experience.value)) {
                let new_filter = {
                    type: "experience",
                    id: experience.value,
                    text: experience.text,
                };

                if (this.filter_list.length > 0) {
                    let index_to_update = null;
                    this.filter_list.forEach((filter, index) => {
                        if (filter.type == "experience") {
                            index_to_update = index;
                        }
                    });

                    if (index_to_update === null) {
                        this.filter_list.push(new_filter);
                    } else {
                        this.filter_list.splice(index_to_update, 1, new_filter);
                    }
                } else {
                    this.filter_list.push(new_filter);
                }
            }
            this.active_filter = "";
        },
        salaryUpdate(type) {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }

            this.timer = setTimeout(() => {
                let amount = this.formatCurrency(this.form[type]);
                let new_filter = {
                    type: type,
                    id: this.form[type],
                    text:
                        type == "salary_min"
                            ? `Min: ${amount}`
                            : `Max: ${amount}`,
                };

                if (this.filter_list.length > 0) {
                    let index_to_update = null;
                    this.filter_list.forEach((filter, index) => {
                        if (filter.type == type) {
                            index_to_update = index;
                        }
                    });

                    if (index_to_update === null) {
                        this.filter_list.push(new_filter);
                    } else {
                        this.filter_list.splice(index_to_update, 1, new_filter);
                    }
                } else {
                    this.filter_list.push(new_filter);
                }
            }, 800);
        },
        formatCurrency(num) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(num);
        },
        removeFilter(i) {
            let targetFilter = this.filter_list[i];
            if (targetFilter.type == "jobfunction") {
                let key = this.form.jobfunctions.indexOf(targetFilter.id);
                this.form.jobfunctions.splice(key, 1);
            }

            if (targetFilter.type == "skill") {
                let key = this.form.skills.indexOf(targetFilter.id);
                this.form.skills.splice(key, 1);
            }

            if (targetFilter.type == "city") {
                let key = this.form.cities.indexOf(targetFilter.id);
                this.form.cities.splice(key, 1);
            }

            if (targetFilter.type == "job_type") {
                let key = this.form.job_types.indexOf(targetFilter.id);
                this.form.job_types.splice(key, 1);
            }

            if (targetFilter.type == "company") {
                let key = this.form.companies.indexOf(targetFilter.id);
                this.form.companies.splice(key, 1);
            }

            if (targetFilter.type == "salary_min") {
                this.form.salary_min = null;
            }

            if (targetFilter.type == "salary_max") {
                this.form.salary_max = null;
            }

            if (targetFilter.type == "experience") {
                this.form.experience = null;
            }

            this.filter_list.splice(i, 1);
        },
        removeFilters(type) {
            this.filter_list = this.filter_list.filter((value, index, arr) => {
                if (type == "salary") {
                    return (
                        value.type != "salary_min" || value.type != "salary_max"
                    );
                } else {
                    return value.type != type;
                }
            });

            if (type == "jobfunction") {
                this.form.jobfunctions = [];
            }

            if (type == "skill") {
                this.form.skills = [];
            }

            if (type == "city") {
                this.form.cities = [];
            }

            if (type == "job_type") {
                this.form.job_types = [];
            }

            if (type == "company") {
                this.form.companies = [];
            }

            if (type == "salary") {
                this.form.salary_min = null;
                this.form.salary_max = null;
            }

            if (type == "experience") {
                this.form.experience = null;
            }

            this.active_filter = "";
        },
        isInFilterList(type, id) {
            let isInfilter = this.filter_list.filter((obj) => {
                return obj.type === type && obj.id === id;
            });

            return isInfilter.length > 0 ? true : false;
        },
    },
    watch: {
        filter_list: {
            deep: true,
            handler(newVal, oldVal) {
                this.search();
            },
        },
    },
};
</script>