<template>
    <aside>
        <div class="card card--over-show">
            <div class="card__body">
                <div class="myo__avatar">
                    <img
                        :src="user_data.avatar_url"
                        :alt="user_data.name"
                        class="img-fluid"
                    />
                </div>

                <nav class="myo__menu">
                    <ul>
                        <li
                            :class="{
                                active: active_menu == 'manage-password',
                            }"
                        >
                            <a
                                href="#"
                                title="Ganti Password"
                                @click.prevent="navigate('manage-password')"
                            >
                                <span class="name">Ganti Password</span>
                                <span class="icon"
                                    ><i class="icon-arrow-right-2"></i
                                ></span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </aside>
</template>

<script>
export default {
    props: {
        user_data: {
            type: Object,
            required: true,
        },
        active_menu: {
            type: String,
            required: true,
        },
    },
    methods: {
        navigate(to) {
            this.$emit("navigate", to);
        },
    },
};
</script>