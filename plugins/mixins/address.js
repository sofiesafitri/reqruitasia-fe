import Vue from "vue";

const AddressMixin = {
    install(Vue, options) {
        Vue.mixin({
            data() {
                return {
                    city_keyword: "",
                    countries: [],
                    provinces: [],
                    cities: [],
                    cities_search_result: [],
                    subdistricts: []
                };
            },
            methods: {
                getCountries() {
                    this.$axios
                        .$get(`countries`)
                        .then(res => {
                            this.countries = res.data;
                        })
                        .catch(err => {
                            console.log(err.response);
                        });
                },
                getProvinces() {
                    this.$axios
                        .$get(`provinces`)
                        .then(res => {
                            this.provinces = res.data;
                        })
                        .catch(err => {
                            console.log(err.response);
                        });
                },
                getCities(province_id) {
                    this.$axios
                        .$get(`cities/${province_id}`)
                        .then(res => {
                            this.cities = res.data;
                            this.subdistricts = [];
                        })
                        .catch(err => {
                            console.log(err.response);
                        });
                },
                searchCities(search, loading) {
                    loading(true);

                    this.$axios
                        .$get(`cities-search/?s=${escape(search)}`)
                        .then(res => {
                            this.cities_search_result = res.data;
                        })
                        .catch(err => {
                            console.log(err.response);
                        })
                        .finally(() => {
                            loading(false);
                        });
                },
                getSubdistricts(city_id) {
                    this.$axios
                        .$get(`subdistricts/${city_id}`)
                        .then(res => {
                            this.subdistricts = res.data;
                        })
                        .catch(err => {
                            console.log(err.response);
                        });
                }
            }
        });
    }
};

Vue.use(AddressMixin);
