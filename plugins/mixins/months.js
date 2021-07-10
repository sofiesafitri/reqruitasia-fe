import Vue from "vue";

const MonthsMixin = {
    install(Vue, options) {
        Vue.mixin({
            data() {
                return {
                    months_list: [
                        { number: 1, text: "Januari" },
                        { number: 2, text: "Februari" },
                        { number: 3, text: "Maret" },
                        { number: 4, text: "April" },
                        { number: 5, text: "Mei" },
                        { number: 6, text: "Juni" },
                        { number: 7, text: "Juli" },
                        { number: 8, text: "Agustus" },
                        { number: 9, text: "September" },
                        { number: 10, text: "Oktober" },
                        { number: 11, text: "November" },
                        { number: 12, text: "Desember" }
                    ]
                };
            }
        });
    }
};

Vue.use(MonthsMixin);
