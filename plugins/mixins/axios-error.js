import Vue from "vue";

const AxiosErrorMixin = {
    install(Vue, options) {
        Vue.mixin({
            methods: {
                axiosError(err) {
                    console.log(err.response);
                    if (err.response.status === 422) {
                        const errors = err.response.data.errors;
                        const [firstError] = Object.keys(errors);
                        this.swalWrong(errors[firstError][0]);
                    } else {
                        if (err.response.data.message != undefined) {
                            this.swalWrong(err.response.data.message);
                        } else {
                            this.swalWrong();
                        }
                    }
                }
            }
        });
    }
};

Vue.use(AxiosErrorMixin);
