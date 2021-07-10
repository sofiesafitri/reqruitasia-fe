<template>
  <div class="clients">
    <div class="clients-logo py3">
      <div class="col-4 flex-column">
        <h1 class="col-8 mx-auto">1,50,000+</h1>
        <p class="col-8 mx-auto">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      </div>
      <div class="col-8 flex-column justify-center mx3">
        <div class="my-auto slider">
          <HomeSec/>
        </div>
      </div>
    </div>
    <div class="client-count py3">
      <h1 class="color-white mx-auto">Some count that matters</h1>
      <p class="color-white mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <div class="col-8 client-count__services pt3">
        <div>
          <div class="flex justify-center"><h1 class="color-white">50</h1></div>
          <p class="center color-white">Service geographics</p>
        </div>
        <div class="border-left border-right">
          <div class="flex justify-center"><h1 class="color-white">30</h1></div>
          <p class="center color-white">Fortune 500 Clients</p>
        </div>
        <div class="border-right">
          <div class="flex justify-center"><h1 class="color-white">300</h1></div>
          <p class="center color-white">Dedicated Members</p>
        </div>
        <div>
          <div class="flex justify-center"><h1 class="color-white">8</h1></div>
          <p class="center color-white">Years of journey</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomeSec from "~/components/Home/HomeSec.vue"

export default {
  components: {
    HomeSec,
  } 
}
</script>