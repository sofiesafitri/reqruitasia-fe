<template>
    <div id="myo__interests" class="card">
        <div class="card__header">
            <div class="card__header-left">
                <div class="card__header-icon">
                    <i class="icon-heart"></i>
                </div>
                <h2 class="card__header-title">Minat Pekerjaan</h2>
            </div>
        </div>
        <div class="card__body card__body--pad-left">
            <div v-if="user_data.interest != ''">
                <div class="clearfix mb2">
                    <div class="col col-12 md-col-4">
                        <h4>Bidang Minat</h4>
                    </div>
                    <div class="col col-12 md-col-8">
                        <div
                            v-for="(foi, i) in user_data.interest
                                .field_of_interests"
                            :key="i"
                        >
                            <div>{{ foi.jobfunction.name }}</div>
                            <ul class="check-list">
                                <li
                                    v-for="(role, index) in foi.jobroles"
                                    :key="index"
                                >
                                    {{ role.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="clearfix mb2">
                    <div class="col col-12 md-col-4">
                        <h4>Tipe Pekerjaan</h4>
                    </div>
                    <div class="col col-12 md-col-8">
                        <ul class="check-list">
                            <li
                                v-for="(job_type, i) in user_data.interest
                                    .job_types"
                                :key="i"
                            >
                                {{ job_type.name }}
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="clearfix mb2">
                    <div class="col col-12 md-col-4">
                        <h4>Gaji Sekarang</h4>
                    </div>
                    <div class="col col-12 md-col-8">
                        {{
                            user_data.interest.current_salary
                                | format_currency("id-ID", "IDR")
                        }}
                    </div>
                </div>

                <div class="clearfix mb2">
                    <div class="col col-12 md-col-4">
                        <h4>Ekspektasi Gaji</h4>
                    </div>
                    <div class="col col-12 md-col-8">
                        {{
                            user_data.interest.expected_salary
                                | format_currency("id-ID", "IDR")
                        }}
                    </div>
                </div>

                <div class="clearfix mb2">
                    <div class="col col-12 md-col-4">
                        <h4>Preferensi Kota Kerja</h4>
                    </div>
                    <div class="col col-12 md-col-8">
                        <ul class="check-list">
                            <li
                                v-for="(city, i) in user_data.interest.cities"
                                :key="i"
                            >
                                {{ city.name }}
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="clearfix mb2">
                    <div class="col col-12 md-col-4">
                        <h4>Bersedia Direlokasi</h4>
                    </div>
                    <div class="col col-12 md-col-8">
                        {{ user_data.interest.relocated ? "Ya" : "Tidak" }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        user_data: {
            type: Object,
            required: true,
        },
    },
};
</script>