<template>
  <div class="job-future py2">
    <div class="col-3 job-future__left">
        <h1 class="col-8 mx-auto">Find Work</h1>
        <p class="col-8 mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam hic maiores obcaecati aspernatur dicta fugit</p>
        <dir class="col-8 new-home-top__navigation">
          <nuxt-link to="/explore-jobs"><button id="candidate">Find more</button></nuxt-link>
        </dir>
    </div>
    <div class="col-9 list-jobs mx2">
      <template v-for="(job, i) in featured_jobs">
        <JobCard :job="job" :key="i" />
      </template>
    </div>
  </div>
</template>

<script>
import JobCard from "~/components/Share/Job/JobCard.vue"

export default {
  components: {
    JobCard,
  },
   data() {
        return {
            featured_jobs: [],
        };
    },
    created() {
        const params = {
            take: 4,
            status: "published",
            order_by: "random",
            paginate: false,
        };

        const urlParams = new URLSearchParams(params).toString();

        this.$axios
            .$get(`job/search?${urlParams}`)
            .then((res) => {
                this.featured_jobs = res.data;
                console.log(res.data.length)
            })
            .catch((err) => {
                console.log(err.response);
            });
    },
}
</script>