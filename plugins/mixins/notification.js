import Vue from "vue";

const NotificationMixin = {
    install(Vue, options) {
        Vue.mixin({
            data() {
                return {
                    notifications: [],
                    next_notif_url: "",
                    loading_notification: false,
                    has_unread_notifications: false,
                    loading_next_page: false,
                    processing_all_read: false
                };
            },
            methods: {
                getNotifications() {
                    this.loading_notification = true;

                    this.$axios
                        .$get("/account/notifications")
                        .then(res => {
                            this.notifications = res.data.notifications;
                            this.next_notif_url = res.data.next_page_url;
                            this.has_unread_notifications = res.data.has_unread;
                            this.$nuxt.$emit(
                                "is-notification-clean",
                                res.data.has_unread
                            );
                        })
                        .catch(err => {
                            this.axiosError(err);
                        })
                        .finally(() => {
                            this.loading_notification = false;
                        });
                },
                visitNotification(notification) {
                    if (!notification.is_read) {
                        this.$axios
                            .$get(
                                `/account/notifications/${notification.id}/read`
                            )
                            .then(res => {
                                this.has_unread_notifications =
                                    res.data.has_unread;
                                this.$nuxt.$emit(
                                    "is-notification-clean",
                                    res.data.has_unread
                                );
                            })
                            .catch(err => {
                                console.log(err.response);
                            });
                    }

                    this.$router.push(notification.data.link);
                },
                markAllNotificatiionAsRead() {
                    if (this.has_unread_notifications) {
                        this.processing_all_read = true;
                        this.$axios
                            .$get("account/notifications/mark-all-read")
                            .then(res => {
                                this.has_unread_notifications = false;
                                this.$nuxt.$emit(
                                    "is-notification-clean",
                                    false
                                );
                                this.getNotifications();
                            })
                            .catch(err => {
                                this.axiosError(err);
                            })
                            .finally(() => {
                                this.processing_all_read = false;
                            });
                    }
                },
                showMoreNotifications() {
                    this.loading_next_page = true;
                    this.$axios
                        .$get(this.next_notif_url)
                        .then(res => {
                            this.notifications.push(...res.data.notifications);
                            this.next_notif_url = res.data.next_page_url;
                        })
                        .catch(err => {
                            this.axiosError(err);
                        })
                        .finally(() => {
                            this.loading_next_page = false;
                        });
                }
            }
        });
    }
};

Vue.use(NotificationMixin);
