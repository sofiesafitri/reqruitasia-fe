<template>
  <div>
    <div class="clearfix">
            <div class="home-hero">
                <div class="sm-col sm-col-6">
                    <div class="box-header-home">
                            <div class="col-10 mx-auto pt2">
                               <h1 class="col-10 mx-auto">
                                Archieve your goals. <br>
                                Drive your future.
                              </h1>
                              <p class="col-10 mx-auto">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam hic maiores obcaecati aspernatur dicta fugit</p>
                              <dir class="col-10 new-home-top__navigation">
                                <nuxt-link to="/auth/logincandidate"><button id="candidate">Candidate</button></nuxt-link>
                                <a href="auth/login"><button id="employee">Employee</button></a>
                              </dir>
                          </div>
                    </div>
                </div>
                <div class="sm-col sm-col-6 xs-hide">
                    <div style="width:100%;height:500px;">
                            <img src="~/assets/images/businessman-employee-candidate-shaking-hands-with--DF5B4YF 2.png" alt="sub-foot" style="float:left;width:100%;height:100%;object-fit:cover;">
                    </div>
                </div>
            </div>
        </div>
    <div class="flex-column justify-center my4">
      <h1 class=" col-8 mx-auto center" >Get to know more about Reqruitasia</h1>
      <p class="col-8 mx-auto center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit nemo iusto mollitia modi quas atque explicabo deserunt, eius fugit deleniti aut distinctio sunt ab id totam? Numquam dicta veniam ipsam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni nesciunt dicta laborum tempora deleniti, facere pariatur officia cum enim quibusdam! At ab culpa sed similique amet dolorum fugiat inventore doloribus. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Suscipit quae ab minima repudiandae voluptatem vel, ducimus consequuntur? Assumenda totam sint culpa explicabo laborum? Molestias in repellendus, provident tenetur magni iste.</p>
      <div class="col-12 my3 flex justify-center">
        <nuxt-link to="/about"> <button id="about-us-button">About us</button></nuxt-link>
        </div>
    </div>
    <div class="our-service py4">
      <div class="flex justify-center my3"><h1>Our Service</h1></div>
      <div class="col-8 our-service__services">
        <div class="col-2 mx-auto">
          <div class="flex justify-center symbol"><img src="~/assets/images/icons/slider/fast.svg" max-width="100%" height="30px" alt="fast"></div>
          <div class="flex justify-center title-card-service"><h3>Fast & Painless</h3></div>
          <p class="center deskription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nesciunt quo numquam dolorem unde distinctio natus illo ut.</p>
        </div>
        <div class="col-2 mx-auto">
          <div class="flex justify-center symbol"><img src="~/assets/images/icons/slider/shere.svg" alt="share" height="30px" max-width="100%"></div>
          <div class="flex justify-center title-card-service"><h3>Share Anywhere</h3></div>
          <p class="center deskription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nesciunt quo numquam dolorem unde distinctio natus illo ut.</p>
        </div>
        <div class="col-2 mx-auto">
          <div class="flex justify-center symbol"><img src="~/assets/images/icons/slider/real-time.svg" max-width="100%" height="30px" alt="real-time"></div>
          <div class="flex justify-center title-card-service"><h3>Real-time data</h3></div>
          <p class="center deskription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nesciunt quo numquam dolorem unde distinctio natus illo ut.</p>
        </div>
        <div class="col-2 mx-auto">
          <div class="flex justify-center symbol"><img src="~/assets/images/icons/slider/ulimited.svg" height="30px" max-width="100%" alt="unlimited"></div>
          <div class="flex justify-center title-card-service"><h3>Unlimited Applied</h3></div>
          <p class="center deskription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum nesciunt quo numquam dolorem unde distinctio natus illo ut.</p>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
export default {
}
</script>