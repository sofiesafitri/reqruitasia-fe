import Vue from "vue";

const SwalMixin = {
    install(Vue, options) {
        Vue.mixin({
            methods: {
                swalToast(icon, title) {
                    this.$swal({
                        toast: true,
                        icon,
                        title,
                        position: "center",
                        showConfirmButton: false,
                        timer: 3000
                    });
                },
                swalSuccess(text = "") {
                    this.$swal({
                        icon: "success",
                        title: "Success",
                        text: text != "" ? text : "Success"
                    });
                },
                swalWrong(text = "") {
                    this.$swal({
                        icon: "error",
                        title: "Oops...",
                        text: text != "" ? text : "Something went wrong!"
                    });
                },
                swalLoginPlease(text) {
                    this.$swal({
                        icon: "warning",
                        title: "Login please",
                        text: text,
                        showCancelButton: true,
                        confirmButtonText: "Login",
                        cancelButtonText: "Later"
                    }).then(result => {
                        if (result.value) {
                            this.$router.push("/auth/login");
                        }
                    });
                }
            }
        });
    }
};

Vue.use(SwalMixin);
