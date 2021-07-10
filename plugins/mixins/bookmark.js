import Vue from "vue";

const BookmarkMixin = {
    install(Vue, options) {
        Vue.mixin({
            data() {
                return {
                    marked: false,
                    bookmark_id: null
                };
            },
            methods: {
                bookmark() {
                    if (!this.authenticated) {
                        this.swalToast(
                            "error",
                            "Kamu harus login untuk bookmark"
                        );
                        return;
                    }

                    if (this.marked && this.bookmark_id !== null) {
                        this.$axios
                            .$delete(`account/bookmarks/${this.bookmark_id}`)
                            .then(res => {
                                this.marked = false;
                                this.$nuxt.$emit(
                                    "bookmark_deleted",
                                    this.bookmark_id
                                );
                                this.swalToast(res.status, res.message);
                            })
                            .catch(err => {
                                if (err.response.status === 404) {
                                    this.$nuxt.$emit(
                                        "bookmark_deleted",
                                        this.bookmark_id
                                    );
                                }
                                this.axiosError(err);
                            });
                    } else {
                        this.$axios
                            .$post("account/bookmarks", {
                                job_id: this.job.id
                            })
                            .then(res => {
                                this.marked = true;
                                this.bookmark_id = res.data.id;
                                this.swalToast(res.status, res.message);
                            })
                            .catch(err => {
                                this.axiosError(err);
                            });
                    }
                }
            }
        });
    }
};

Vue.use(BookmarkMixin);
