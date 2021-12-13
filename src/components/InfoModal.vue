<template>
  <transition name="modal">
    <div class="overlay" @click="$emit('close')">
      <div class="panel" @click.stop>
        <!-- Shop info -->
        <div class="bg-white infomodal">
          <!-- shopname -->
          <div class="m-5">
            <div class="flex justify-between items-center">
              <h1 class="text-2xl m-2">{{ val.placename }}</h1>
              <a v-bind:href="val.website">website</a>
            </div>
            <p>{{ val.addS }}</p>
          </div>
          <!-- shopphotos -->
          <div>
            <swiper
            class="max-w-md flex justify-center items-center"
            :options="swiperOptionPhoto"
            ref="mySwiper1">
              <swiper-slide class="flex justify-center items-center">
                <img v-bind:src="val.photo2" width="300" height="300">
              </swiper-slide>
              <swiper-slide class="flex justify-center items-center">
                <img v-bind:src="val.photo3" width="300" height="300">
              </swiper-slide>
              <swiper-slide class="flex justify-center items-center">
                <img v-bind:src="val.photo4" width="300" height="300">
              </swiper-slide>
              <swiper-slide class="flex justify-center items-center">
                <img v-bind:src="val.photo5" width="300" height="300">
              </swiper-slide>
              <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
          </div>
          <!-- rating and review -->
          <div class="rating text-center m-3">
            <p>Rating<i class="fas fa-star star"></i> : {{ val.rating }}</p>
          </div>
          <div class="mx-3">
            <swiper
            class="max-w-md flex justify-center"
            :options="swiperOptionReview"
            ref="mySwiper1">
              <swiper-slide class="flex justify-center items-center text-xs">
                <p class="items-center">{{ val.review1 }}</p>
              </swiper-slide>
              <swiper-slide class="flex justify-center items-center text-xs">
                <p class="items-center">{{ val.review2 }}</p>
              </swiper-slide>
              <swiper-slide class="flex justify-center items-center text-xs">
                <p class="items-center">{{ val.review3 }}</p>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['val'],
  data() {
    return {
      swiperOptionPhoto: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
      swiperOptionReview: {
        autoplay: {
          delay: 3500,
          disableOnInteraction: false,
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.overlay {
    background: rgba(0, 0, 0, .8);
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 900;
    transition: all .5s ease;
}
.panel {
    position: absolute;
    left: 50%;
    top: 20%;
    margin-left: -230px;
    transition: all .3s ease;
}
.modal-enter,
.modal-leave-active {
    opacity: 0;
}
.modal-enter .panel,
.modal-leave-active .panel{
    top: -200px;
}
.infomodal {
  width: 450px;
  height: 620px;
}
.star {
  color:#1da1f2;
}
</style>
