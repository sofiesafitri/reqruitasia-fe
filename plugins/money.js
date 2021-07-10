import Vue from "vue";
import money from "v-money";

// register directive v-money and component <money>
Vue.use(money, {
    decimal: ",",
    thousands: ".",
    prefix: "",
    suffix: "",
    precision: 0,
    masked: false
});
