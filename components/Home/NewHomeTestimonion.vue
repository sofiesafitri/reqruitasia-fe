<template>
  <div class="testimonion my4">
    <div class="col-6 testimonion__left">
      <h1 class="col-8 mx-auto">Client Testimonies</h1>
      <p class="col-8 mx-auto">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur culpa nemo quasi voluptatibus impedit architecto consequatur in earum vel officiis aspernatur quaerat.</p>
    </div>

    <div class="col-6 ">
      <div class="col-8 card-testimonion">
        <img class="semi-colon" style="max-width:100%; height:50px;" src="~/assets/images/icons/semi-colon.svg" alt="semi-colone">
        <div class="col-8 md-8 card-testimonion__user-profile">
          <img :src="testimonials[current].avatar_url" :alt="testimonials[current].name" class="card-testimonion-profil-pic"/> 
          <!-- <div class="card-testimonion-profil-pic"></div> -->
          <div class="col-8 md-8 card-testimonion-profil-desc">
            <span class="card-testimonion-profil-desc-name"> {{testimonials[current].name}}</span>
            <span>{{testimonials[current].profession}}</span>
          </div>
        </div>
        <div class="card-testimonion__user-say"> {{testimonials[current].content}}</div>
        <div class="card-testimonion__navigation">
          <button @click="decrement"><img src="~/assets/images/icons/slider/s-left.svg" alt="left"></button>
          <button @click="increment"><img src="~/assets/images/icons/slider/s-right.svg" alt="left"></button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    testimonials: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      current: 0
    }
  },

  methods: {
    increment() {
      if (this.current >= (this.testimonials.length - 1)) {
        this.current = 0;
        return
      } else {
        this.current += 1;
      }
    },

    decrement() {
      if (this.current <= 0) {
        this.current = (this.testimonials.length - 1);
        return
      } else {
        this.current -= 1;
      }

    }
  }

}
</script>