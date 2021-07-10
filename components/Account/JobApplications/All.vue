<template>
    <div class="clearfix mxn2">
        <div class="sm-col sm-col-12 md-col-6 lg-col-4 p2">
            <a href="#" @click.prevent="navigate('pending')">
                <div class="card card--warning card-stat">
                    <div class="card__body">
                        <div class="card-stat__title">Ulasan Tertunda</div>
                        <div class="card-stat__num-icon">
                            <div class="card-stat__num">
                                {{ data.pending }}
                            </div>
                            <div class="card-stat__icon">
                                <i class="icon-bookmark"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        <div class="sm-col sm-col-12 md-col-6 lg-col-4 p2">
            <a href="#" @click.prevent="navigate('shortlisted')">
                <div class="card card--grey card-stat">
                    <div class="card__body">
                        <div class="card-stat__title">Daftar Pendek</div>
                        <div class="card-stat__num-icon">
                            <div class="card-stat__num">
                                {{ data.shortlisted }}
                            </div>
                            <div class="card-stat__icon">
                                <i class="icon-document"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        <div class="sm-col sm-col-12 md-col-6 lg-col-4 p2">
            <a href="#" @click.prevent="navigate('interview')">
                <div class="card card--info card-stat">
                    <div class="card__body">
                        <div class="card-stat__title">Wawancara</div>
                        <div class="card-stat__num-icon">
                            <div class="card-stat__num">
                                {{ data.interview }}
                            </div>
                            <div class="card-stat__icon">
                                <i class="icon-2-user"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        <div class="sm-col sm-col-12 md-col-6 lg-col-4 p2">
            <a href="#" @click.prevent="navigate('offered')">
                <div class="card card--grey-2 card-stat">
                    <div class="card__body">
                        <div class="card-stat__title">Ditawarkan</div>
                        <div class="card-stat__num-icon">
                            <div class="card-stat__num">
                                {{ data.offered }}
                            </div>
                            <div class="card-stat__icon">
                                <i class="icon-danger"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        <div class="sm-col sm-col-12 md-col-6 lg-col-4 p2">
            <a href="#" @click.prevent="navigate('hired')">
                <div class="card card--success card-stat">
                    <div class="card__body">
                        <div class="card-stat__title">Dipekerjakan</div>
                        <div class="card-stat__num-icon">
                            <div class="card-stat__num">
                                {{ data.hired }}
                            </div>
                            <div class="card-stat__icon">
                                <i class="icon-tick-square"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        <div class="sm-col sm-col-12 md-col-6 lg-col-4 p2">
            <a href="#" @click.prevent="navigate('unsuitable')">
                <div class="card card--danger card-stat">
                    <div class="card__body">
                        <div class="card-stat__title">Ditolak</div>
                        <div class="card-stat__num-icon">
                            <div class="card-stat__num">
                                {{ data.unsuitable }}
                            </div>
                            <div class="card-stat__icon">
                                <i class="icon-close-square"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
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