import Vue from "vue";
import { Money } from "v-money";

const MoneyMixin = {
    install(Vue, options) {
        Vue.mixin({
            components: {
                Money,
            },
            data() {
                return {
                    money: {
                        decimal: ".",
                        thousands: ",",
                        prefix: "",
                        suffix: "",
                        precision: 0,
                        masked: false,
                    },
                };
            },
        });
    },
};

Vue.use(MoneyMixin);
