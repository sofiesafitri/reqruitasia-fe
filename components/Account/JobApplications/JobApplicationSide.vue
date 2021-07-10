<template>
    <nav class="jap__side simple-side-nav">
        <ul>
            <li
                :class="{
                    active: active_menu == 'all',
                }"
            >
                <a href="#" title="Semua" @click.prevent="navigate('all')">
                    Semua
                </a>
            </li>
            <li
                :class="{
                    active: active_menu == 'pending',
                }"
            >
                <a
                    href="#"
                    title="Menunggu"
                    @click.prevent="navigate('pending')"
                >
                    Menunggu
                </a>
            </li>
            <li
                :class="{
                    active: active_menu == 'shortlisted',
                }"
            >
                <a
                    href="#"
                    title="Daftar Pendek"
                    @click.prevent="navigate('shortlisted')"
                >
                    Daftar Pendek
                </a>
            </li>
            <li
                :class="{
                    active: active_menu == 'interview',
                }"
            >
                <a
                    href="#"
                    title="Wawancara"
                    @click.prevent="navigate('interview')"
                >
                    Wawancara
                </a>
            </li>
            <li
                :class="{
                    active: active_menu == 'offered',
                }"
            >
                <a
                    href="#"
                    title="Ditawarkan"
                    @click.prevent="navigate('offered')"
                >
                    Ditawarkan
                </a>
            </li>
            <li
                :class="{
                    active: active_menu == 'hired',
                }"
            >
                <a
                    href="#"
                    title="Dipekerjakan"
                    @click.prevent="navigate('hired')"
                >
                    Dipekerjakan
                </a>
            </li>
            <li
                :class="{
                    active: active_menu == 'unsuitable',
                }"
            >
                <a
                    href="#"
                    title="Ditolak"
                    @click.prevent="navigate('unsuitable')"
                >
                    Ditolak
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: {
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