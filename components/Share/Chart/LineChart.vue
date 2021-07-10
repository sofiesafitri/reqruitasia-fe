<template>
    <LineChart :data="chartData" :options="chartOptions" :height="200" />
</template>

<script>
import LineChart from "~/components/Share/Chart/Js/LineChartJs";

export default {
    props: {
        labels: {
            type: Array,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        data: {
            type: Array,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },
    components: {
        LineChart,
    },
    data() {
        return {
            chartData: {
                labels: this.labels,
                datasets: [
                    {
                        label: this.label,
                        data: this.data,
                        borderColor: "#2b95ce",
                        backgroundColor: "rgba(0, 0, 0, 0)",
                        // fill: false,
                        lineTension: 0,
                    },
                ],
            },
            chartOptions: {
                responsive: true,
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: this.title,
                    fontSize: 18,
                    // fontColor: "#6b7280",
                },
                tooltips: {
                    // backgroundColor: "#17BF62",
                },
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                display: true,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                            gridLines: {
                                display: true,
                            },
                        },
                    ],
                },
            },
        };
    },
};
</script>