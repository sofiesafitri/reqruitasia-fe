<template>
    <div id="myo__basic" class="myo__basic">
        <div class="myo__basic-detail">
            <div class="myo__basic-detail-top">
                <div class="myo__avatar">
                    <img
                        :src="user_data.avatar_url"
                        :alt="user_data.name"
                        class="img-fluid"
                    />
                    <label class="myo__update-avatar">
                        <i class="icon-edit"></i>
                        <input
                            type="file"
                            ref="avatar"
                            @change="handleFileChange"
                        />
                    </label>
                </div>

                <div>
                    <h1 class="myo__name">
                        {{ user_data.name }}
                        <small v-if="user_data.age != ''"
                            >({{ user_data.age }} Tahun)</small
                        >
                    </h1>
                    <div class="myo__status">
                        {{ user_data.job_status.description }}
                    </div>
                    <div class="myo__start-work">
                        <span
                            v-if="
                                user_data.when_can_start.value === 'choose-date'
                            "
                            >Bisa mulai kerja:
                            {{
                                user_data.can_start_date | format_date_only
                            }}</span
                        >
                        <span v-else
                            >Bisa mulai kerja:
                            {{ user_data.when_can_start.description }}</span
                        >
                    </div>
                </div>
            </div>

            <hr />

            <div class="myo__basic-list clearfix">
                <div class="col md-col-6">
                    <dl>
                        <dt>Email</dt>
                        <dd>{{ user_data.email }}</dd>

                        <dt>Jenis Kelamin</dt>
                        <dd>{{ user_data.gender.text }}</dd>

                        <dt>Relationship</dt>
                        <dd>{{ user_data.relationship.description }}</dd>

                        <dt>Kependudukan</dt>
                        <dd>{{ user_data.residence_status.description }}</dd>

                        <dt>Kewarganegaraan</dt>
                        <dd>{{ user_data.citizenship.name }}</dd>
                    </dl>
                </div>
                <div class="col md-col-6">
                    <dl>
                        <dt>Hobi</dt>
                        <dd>{{ user_data.hobby }}</dd>

                        <dt>Telepon</dt>
                        <dd>{{ user_data.phone }}</dd>

                        <dt>Lokasi Domisili</dt>
                        <dd>
                            <span v-if="user_data.address != ''"
                                >{{ user_data.address }},</span
                            >
                            <span v-if="user_data.subdistrict.name != ''"
                                >Kecamatan
                                {{ user_data.subdistrict.name }},</span
                            ><br />
                            <span v-if="user_data.city.name != ''"
                                >{{ user_data.city.name }},</span
                            >
                            {{ user_data.province.name }}<br />
                            <span v-if="user_data.pos_code != ''"
                                >Kode Pos: {{ user_data.pos_code }}</span
                            >
                        </dd>
                    </dl>
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