<template>
    <div class="mobile-notification">
        <div v-if="loading_notification" class="loading-image">
            <img src="~/assets/images/loading.gif" alt="Loading" />
        </div>
        <ul v-else-if="!loading_notification && notifications.length > 0">
            <li
                v-for="(nt, i) in notifications"
                :key="i"
                :class="{ unread: !nt.is_read }"
                @click="visitNotification(nt)"
            >
                <span>{{ nt.data.text }}</span>
                <span class="created_at">{{ nt.created_at_for_human }}</span>
            </li>
        </ul>
        <div
            class="mobile-notification__empty"
            v-if="!loading_notification && notifications.length === 0"
        >
            Tidak ada
        </div>
        <div class="mobile-notification__actions">
            <div
                class="action"
                :class="{ full: !has_unread_notifications }"
                v-if="next_notif_url !== ''"
                @click="showMoreNotifications"
            >
                <span v-if="!loading_next_page">Lagi</span>
                <span v-else>Memuat...</span>
            </div>
            <div
                class="action"
                :class="{ full: next_notif_url === '' }"
                @click="markAllNotificatiionAsRead"
                v-if="has_unread_notifications"
            >
                <span v-if="!processing_all_read">Terbaca semua</span>
                <span v-else>Memproses...</span>
            </div>
        </div>
    </div>
</template>

<script>
import NotificationMixin from "~/plugins/mixins/notification";

export default {
    middleware: ["auth"],
    mixins: ["NotificationMixin"],
    head() {
        return {
            bodyAttrs: {
                class: "content-no-padding-top content-no-padding-bottom",
            },
            title: "Notifikasi",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: "Halaman notifikasi",
                },
            ],
        };
    },
    created() {
        this.getNotifications();
    },
};
</script>