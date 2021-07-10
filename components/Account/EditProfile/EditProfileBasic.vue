<template>
    <div id="myo__basic" class="myo__basic">
        <ModalTrigger
            type="link"
            class_names="block-edit modal-trigger"
            target="myo__basic-modal"
        >
            <template v-slot:content> <i class="icon-edit"></i> Edit </template>
        </ModalTrigger>

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
                    <nuxt-link
                        :to="`/profile/${user_data.identifier}`"
                        :title="user_data.name"
                        >Lihat profil</nuxt-link
                    >
                </div>
            </div>

            <hr />

            <div class="myo__basic-list clearfix">
                <div class="col md-col-6">
                    <dl>
                        <dt>Email</dt>
                        <dd>{{ user_data.email }}</dd>

                        <dt>Gender</dt>
                        <dd>{{ user_data.gender.text }}</dd>

                        <dt>Relationship</dt>
                        <dd>{{ user_data.relationship.description }}</dd>

                        <dt>Residence Status</dt>
                        <dd>{{ user_data.residence_status.description }}</dd>

                        <dt>Citizenship</dt>
                        <dd>{{ user_data.citizenship.name }}</dd>
                    </dl>
                </div>
                <div class="col md-col-6">
                    <dl>
                        <dt>Hobby</dt>
                        <dd>{{ user_data.hobby }}</dd>

                        <dt>Phone</dt>
                        <dd>{{ user_data.phone }}</dd>

                        <dt>Address Location</dt>
                        <dd>
                            <span v-if="user_data.address != ''"
                                >{{ user_data.address }},</span
                            >
                            <span
                                v-if="
                                    user_data.subdistrict.name != '' &&
                                    user_data.country.code == 'ID'
                                "
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

        <Modal title="Informasi Dasar" name="myo__basic-modal" :footer="true">
            <template v-slot:body>
                <div class="form__group">
                    <label class="form__label" for="name">Nama</label>
                    <input
                        type="text"
                        class="form__control"
                        name="name"
                        v-model="form.name"
                        @blur="$v.form.name.$touch()"
                    />
                    <span
                        v-if="errors.name || $v.form.name.$invalid"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.name">{{ errors.name[0] }}</span>
                        <span v-if="$v.form.name.$error">Required field!</span>
                    </span>
                </div>
                <div class="form__group">
                    <label class="form__label" for="email">Email</label>
                    <input
                        type="text"
                        class="form__control"
                        name="email"
                        v-model="form.email"
                        @blur="$v.form.email.$touch()"
                    />
                    <span
                        v-if="errors.email || $v.form.email.$invalid"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.email">{{ errors.email[0] }}</span>
                        <span v-if="$v.form.email.$error"
                            >Required field and valid email!</span
                        >
                    </span>
                </div>
                <div class="form__group">
                    <label class="form__label" for="address"
                        >Alamat Jalan/RT & RW/No. Rumah</label
                    >
                    <input
                        type="text"
                        class="form__control"
                        name="address"
                        v-model="form.address"
                        @blur="$v.form.address.$touch()"
                    />
                    <span
                        v-if="errors.address || $v.form.address.$invalid"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.address">{{
                            errors.address[0]
                        }}</span>
                        <span v-if="$v.form.address.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
                <div class="form__group">
                    <label class="form__label" for="country_id">Country</label>
                    <client-only>
                        <v-select
                            label="name"
                            :options="countries"
                            v-model="selected_country"
                            @input="countryChange"
                            placeholder="-- Select Country --"
                            :clearable="false"
                        ></v-select>
                    </client-only>
                    <span
                        v-if="errors.country_id || $v.form.country_id.$invalid"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.country_id">{{
                            errors.country_id[0]
                        }}</span>
                        <span v-if="$v.form.country_id.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
                <div class="form__group" v-if="isIndonesia">
                    <label class="form__label" for="province_id"
                        >Province</label
                    >
                    <client-only>
                        <v-select
                            label="name"
                            :options="provinces"
                            v-model="selected_province"
                            @input="provinceChange"
                            placeholder="-- Select Province --"
                            :clearable="false"
                        ></v-select>
                    </client-only>
                    <span
                        v-if="
                            errors.province_id || $v.form.province_id.$invalid
                        "
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.province_id">{{
                            errors.province_id[0]
                        }}</span>
                        <span v-if="$v.form.province_id.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
                <div class="form__group" v-else>
                    <label class="form__label" for="province_name"
                        >Province</label
                    >
                    <input
                        type="text"
                        v-model="form.province_name"
                        class="form__control"
                    />
                    <span
                        v-if="
                            errors.province_name ||
                            $v.form.province_name.$invalid
                        "
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.province_name">{{
                            errors.province_name[0]
                        }}</span>
                        <span v-if="$v.form.province_name.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
                <div class="form__group" v-if="isIndonesia">
                    <label class="form__label" for="city_id"
                        >City / Region</label
                    >
                    <client-only>
                        <v-select
                            label="name"
                            :options="cities"
                            v-model="selected_city"
                            @input="cityChange"
                            placeholder="-- Select City / Region --"
                            :clearable="false"
                        ></v-select>
                    </client-only>
                    <span
                        v-if="errors.city_id || $v.form.city_id.$invalid"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.city_id">{{
                            errors.city_id[0]
                        }}</span>
                        <span v-if="$v.form.city_id.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
                <div class="form__group" v-else>
                    <label class="form__label" for="city_name"
                        >City / Region</label
                    >
                    <input
                        type="text"
                        v-model="form.city_name"
                        class="form__control"
                    />
                    <span
                        v-if="errors.city_name || $v.form.city_name.$invalid"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.city_name">{{
                            errors.city_name[0]
                        }}</span>
                        <span v-if="$v.form.city_name.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
                <div class="form__group" v-if="isIndonesia">
                    <label class="form__label" for="subdistrict_id"
                        >Subdistrict</label
                    >
                    <client-only>
                        <v-select
                            label="name"
                            :options="subdistricts"
                            v-model="selected_subdistrict"
                            @input="subdistrictChange"
                            placeholder="-- Select Subdistrict --"
                            :clearable="false"
                        ></v-select>
                    </client-only>
                    <span
                        v-if="
                            errors.subdistrict_id ||
                            $v.form.subdistrict_id.$invalid
                        "
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.subdistrict_id">{{
                            errors.subdistrict_id[0]
                        }}</span>
                        <span v-if="$v.form.subdistrict_id.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
                <div class="form__group">
                    <label class="form__label" for="pos_code">Post Code</label>
                    <input
                        type="text"
                        class="form__control"
                        name="pos_code"
                        v-model="form.pos_code"
                        @blur="$v.form.pos_code.$touch()"
                    />
                    <span
                        v-if="errors.pos_code || $v.form.pos_code.$invalid"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.pos_code">{{
                            errors.pos_code[0]
                        }}</span>
                        <span v-if="$v.form.pos_code.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
                <div class="form__group">
                    <label class="form__label" for="residence_status"
                        >Residence Status</label
                    >
                    <client-only>
                        <v-select
                            label="name"
                            :options="residence_status_options"
                            v-model="selected_residence_status"
                            @input="residenceStatusChange"
                            placeholder="-- Pilih --"
                            :clearable="false"
                        ></v-select>
                    </client-only>
                    <span
                        v-if="
                            errors.residence_status ||
                            $v.form.residence_status.$invalid
                        "
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.residence_status">{{
                            errors.residence_status[0]
                        }}</span>
                        <span v-if="$v.form.residence_status.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
                <div class="form__group">
                    <label class="form__label" for="citizenship"
                        >Citizenship</label
                    >
                    <client-only>
                        <v-select
                            label="name"
                            :options="all_countries"
                            v-model="selected_citizenship"
                            @input="citizenshipChange"
                            placeholder="-- Pilih --"
                            :clearable="false"
                        ></v-select>
                    </client-only>
                    <span
                        v-if="
                            errors.citizenship || $v.form.citizenship.$invalid
                        "
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.citizenship">{{
                            errors.citizenship[0]
                        }}</span>
                        <span v-if="$v.form.citizenship.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
                <div class="form__group">
                    <label class="form__label" for="dob">Date of Birth</label>
                    <client-only>
                        <date-pick
                            v-model="form.dob"
                            :inputAttributes="{ placeholder: 'Pilih Tanggal' }"
                        ></date-pick>
                    </client-only>
                    <span
                        v-if="errors.dob || $v.form.dob.$invalid"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.dob">{{ errors.dob[0] }}</span>
                        <span v-if="$v.form.dob.$error">Required field!</span>
                    </span>
                </div>
                <div class="form__group">
                    <label class="form__label" for="gender">Gender</label>
                    <client-only>
                        <v-select
                            label="text"
                            :options="[
                                { value: 'male', text: 'Male' },
                                { value: 'female', text: 'Female' },
                            ]"
                            v-model="selected_gender"
                            @input="genderChange"
                            placeholder="-- Pilih --"
                            :clearable="false"
                        ></v-select>
                    </client-only>
                    <span
                        v-if="errors.gender || $v.form.gender.$invalid"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.gender">{{ errors.gender[0] }}</span>
                        <span v-if="$v.form.gender.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
                <div class="form__group">
                    <label class="form__label" for="phone">Phone</label>
                    <input
                        type="text"
                        class="form__control"
                        name="phone"
                        v-model="form.phone"
                        @blur="$v.form.phone.$touch()"
                    />
                    <span
                        v-if="errors.phone || $v.form.phone.$invalid"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.phone">{{ errors.phone[0] }}</span>
                        <span v-if="$v.form.phone.$error">Required field!</span>
                    </span>
                </div>
                <div class="form__group">
                    <label class="form__label" for="phone">Hobby</label>
                    <input
                        type="text"
                        class="form__control"
                        name="hobby"
                        v-model="form.hobby"
                        @blur="$v.form.hobby.$touch()"
                    />
                    <span
                        v-if="errors.hobby || $v.form.hobby.$invalid"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.hobby">{{ errors.hobby[0] }}</span>
                        <span v-if="$v.form.hobby.$error">Required field!</span>
                    </span>
                </div>
                <div class="form__group">
                    <label class="form__label" for="relationship"
                        >Relationship</label
                    >
                    <ul class="list-no-style">
                        <li v-for="(desc, value) in relationships" :key="value">
                            <label class="ir-container"
                                >{{ desc }}
                                <input
                                    type="radio"
                                    :value="value"
                                    name="relationship"
                                    v-model="form.relationship"
                                />
                                <span class="checkmark"></span>
                            </label>
                        </li>
                    </ul>

                    <span
                        v-if="
                            errors.relationship || $v.form.relationship.$invalid
                        "
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.relationship">{{
                            errors.relationship[0]
                        }}</span>
                        <span v-if="$v.form.relationship.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
                <div class="form__group">
                    <label class="form__label" for="job_status">Status</label>
                    <ul class="list-no-style">
                        <li v-for="(desc, value) in job_statuses" :key="value">
                            <label class="ir-container"
                                >{{ desc }}
                                <input
                                    type="radio"
                                    :value="value"
                                    name="job_status"
                                    v-model="form.job_status"
                                />
                                <span class="checkmark"></span>
                            </label>
                        </li>
                    </ul>

                    <span
                        v-if="errors.job_status || $v.form.job_status.$invalid"
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.job_status">{{
                            errors.job_status[0]
                        }}</span>
                        <span v-if="$v.form.job_status.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
                <div class="form__group">
                    <label class="form__label" for="when_can_start"
                        >When Can Start Working</label
                    >
                    <ul class="list-no-style">
                        <li
                            v-for="(desc, value) in when_can_start_options"
                            :key="value"
                        >
                            <label class="ir-container"
                                >{{ desc }}
                                <input
                                    type="radio"
                                    :value="value"
                                    name="when_can_start"
                                    v-model="form.when_can_start"
                                />
                                <span class="checkmark"></span>
                            </label>
                        </li>
                    </ul>

                    <client-only>
                        <date-pick
                            v-if="form.when_can_start == 'choose-date'"
                            v-model="form.can_start_date"
                            :inputAttributes="{ placeholder: 'Pilih Tanggal' }"
                        ></date-pick>
                    </client-only>
                    <span
                        v-if="errors.can_start_date"
                        class="invalid-feedback"
                        role="alert"
                        >{{ errors.can_start_date[0] }}</span
                    >

                    <span
                        v-if="
                            errors.when_can_start ||
                            $v.form.when_can_start.$invalid
                        "
                        class="invalid-feedback"
                        role="alert"
                    >
                        <span v-if="errors.when_can_start">{{
                            errors.when_can_start[0]
                        }}</span>
                        <span v-if="$v.form.when_can_start.$error"
                            >Required field!</span
                        >
                    </span>
                </div>
            </template>
            <template v-slot:footer>
                <div class="flex justify-end">
                    <ModalCloseButton target="myo__basic-modal" />
                    <button
                        type="button"
                        @click="save('myo__basic-modal')"
                        class="btn btn--primary"
                        :disabled="$v.$invalid || saving"
                    >
                        <span v-if="!saving">Save</span>
                        <span v-else>Processing</span>
                    </button>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script>
import { email, required, requiredIf } from "vuelidate/lib/validators";
import AddressMixin from "~/plugins/mixins/address";
import DatePick from "vue-date-pick";
import Modal from "~/components/Share/Modal/Modal";
import ModalTrigger from "~/components/Share/Modal/ModalTrigger";
import ModalCloseButton from "~/components/Share/Modal/ModalCloseButton";

export default {
    props: {
        user_data: {
            type: Object,
            required: true,
        },
        job_statuses: {
            type: Object,
            required: true,
        },
        relationships: {
            type: Object,
            required: true,
        },
        when_can_start_options: {
            type: Object,
            required: true,
        },
        residence_status_options: {
            type: Array,
            required: true,
        },
        all_countries: {
            type: Array,
            required: true,
        },
    },
    mixins: ["AddressMixin"],
    components: {
        DatePick,
        Modal,
        ModalTrigger,
        ModalCloseButton,
    },
    data() {
        let selected_gender = null;
        if (this.user_data.gender.value != "") {
            selected_gender = {
                value: this.user_data.gender.value,
                text: this.user_data.gender.value == "male" ? "Male" : "Female",
            };
        }

        return {
            saving: false,
            isIndonesia: false,
            selected_country: {
                id: this.user_data.country.id,
                name: this.user_data.country.name,
            },
            selected_province: {
                id: this.user_data.province.id,
                name: this.user_data.province.name,
            },
            selected_city: {
                id: this.user_data.city.id,
                name: this.user_data.city.name,
            },
            selected_subdistrict: {
                id: this.user_data.subdistrict.id,
                name: this.user_data.subdistrict.name,
            },
            selected_gender: selected_gender,
            selected_residence_status: {
                value: this.user_data.residence_status.value,
                name: this.user_data.residence_status.description,
            },
            selected_citizenship: {
                value: this.user_data.citizenship.id,
                name: this.user_data.citizenship.name,
            },
            form: {
                name: this.user_data.name,
                email: this.user_data.email,
                gender: this.user_data.gender.value,
                dob: this.user_data.dob,
                phone: this.user_data.phone,
                address: this.user_data.address,
                country_id: this.user_data.country.id,
                province_id: this.user_data.province.id,
                province_name: this.user_data.province.name,
                city_id: this.user_data.city.id,
                city_name: this.user_data.city.name,
                subdistrict_id: this.user_data.subdistrict.id,
                pos_code: this.user_data.pos_code,
                job_status:
                    this.user_data.job_status == ""
                        ? ""
                        : this.user_data.job_status.value,
                hobby: this.user_data.hobby,
                relationship:
                    this.user_data.relationship == ""
                        ? ""
                        : this.user_data.relationship.value,
                when_can_start:
                    this.user_data.when_can_start == ""
                        ? ""
                        : this.user_data.when_can_start.value,
                can_start_date: this.user_data.can_start_date,
                residence_status: this.user_data.residence_status.value,
                citizenship: this.user_data.citizenship.id,
            },
        };
    },
    validations: {
        form: {
            name: { required },
            email: { required, email },
            gender: { required },
            dob: { required },
            phone: { required },
            address: { required },
            country_id: { required },
            province_id: requiredIf((model) => {
                return model.isIndonesia === "ID";
            }),
            province_name: requiredIf((model) => {
                return model.isIndonesia !== "ID";
            }),
            city_id: requiredIf((model) => {
                return model.isIndonesia === "ID";
            }),
            city_name: requiredIf((model) => {
                return model.isIndonesia !== "ID";
            }),
            subdistrict_id: requiredIf((model) => {
                return model.isIndonesia === "ID";
            }),
            pos_code: { required },
            job_status: { required },
            hobby: { required },
            relationship: { required },
            when_can_start: { required },
            residence_status: { required },
            citizenship: { required },
        },
    },
    created() {
        this.getCountries();
        if (
            this.user_data.province.id != "" &&
            this.user_data.country.code == "ID"
        ) {
            this.isIndonesia = true;
            this.getProvinces();
            this.getCities(this.user_data.province.id);
            this.getSubdistricts(this.user_data.city.id);
        }
    },
    methods: {
        handleFileChange(e) {
            if (
                this.$refs.avatar.files[0] == "" ||
                this.$refs.avatar.files[0] === undefined
            ) {
                return;
            }

            this.$bus.$emit("show-loading-block");
            let formData = new FormData();
            formData.append("avatar", this.$refs.avatar.files[0]);

            this.$axios
                .$post(`account/update-avatar`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    this.$emit("updated", res.data);
                    this.$bus.$emit("avatar-update", res.data.avatar_url);
                    this.swalToast(res.status, res.message);
                })
                .catch((err) => {
                    console.log(err.response);
                    if (err.response.status === 422) {
                        this.swalWrong(err.response.data.errors.avatar[0]);
                    } else {
                        if (err.response.data.message != undefined) {
                            this.swalWrong(err.response.data.message);
                        } else {
                            this.swalWrong();
                        }
                    }
                })
                .finally(() => {
                    this.$bus.$emit("hide-loading-block");
                });
        },
        countryChange(value) {
            this.form.country_id = value.id;
            if (value.code === "ID") {
                this.isIndonesia = true;
                this.getProvinces();
                this.selected_province = { id: "", name: "Please select" };
                this.cities = [];
                this.selected_city = { id: "", name: "Please select" };
                this.subdistricts = [];
                this.selected_subdistrict = { id: "", name: "Please select" };
            } else {
                this.isIndonesia = false;
            }
        },
        provinceChange(value) {
            this.form.province_id = value.id;
            this.getCities(value.id);
            this.selected_city = { id: "", name: "Please select" };
            this.subdistricts = [];
            this.selected_subdistrict = { id: "", name: "Please select" };
        },
        cityChange(value) {
            this.form.city_id = value.id;
            this.getSubdistricts(value.id);
            this.selected_subdistrict = { id: "", name: "Please select" };
        },
        subdistrictChange(value) {
            this.form.subdistrict_id = value.id;
        },
        genderChange(value) {
            this.form.gender = value.value;
        },
        residenceStatusChange(value) {
            this.form.residence_status = value.id;
        },
        citizenshipChange(value) {
            this.form.citizenship = value.id;
        },
        save(modal) {
            this.saving = true;

            this.$axios
                .$post(`account/update-basic-info`, this.form)
                .then((res) => {
                    let user = res.data;
                    this.$emit("updated", user);
                    this.swalToast(res.status, res.message);
                    this.$bus.$emit("close-modal", "myo__basic-modal");
                })
                .catch((err) => {
                    this.axiosError(err);
                })
                .finally(() => {
                    this.saving = false;
                });
        },
    },
};
</script>