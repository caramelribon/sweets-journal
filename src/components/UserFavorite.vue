<template>
  <div id="shop" class="flex p-5 items-start justify-center flex-row flex-wrap">
    <div v-for="place in places" :key="place.id">
      <!-- shop layout -->
      <div class="m-4 shopphoto">
        <!-- shop image -->
        <div class="shop-image">
          <img v-bind:src="place.photourl" width="300" height="300">
        </div>
        <!-- shop description and button(favorite and mark) -->
        <div class="shop-description bg-kon">
          <!-- shop name -->
          <div class="shop-name flex justify-center items-center p-1">
            <p class="shop-text text-white text-center">{{ place.name }}</p>
          </div>
          <!-- shop vicinity -->
          <div class="shop-vicinity flex justify-center items-center p-1">
            <p class="shop-text text-white text-center add-size">{{ place.add }}</p>
          </div>
          <!-- button-area-gap -->
          <div class="button-area-gap"></div>
          <!-- button (favorite and mark) -->
          <div class="button-area grid grid-cols-6">
            <div class="col-span-4"></div>
            <!-- mark button -->
            <div class="flex justify-center items-center">
              <button>
                <i class="fas fa-store button-size text-white"></i>
              </button>
            </div>
            <!-- favorite button -->
            <div class="bg-kon flex justify-center items-center">
              <button @click="onFavorite(place)">
                <i class="fas fa-heart button-size text-white"></i>
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
</template>

<script>
  import firebase from 'firebase/app';
  
  
</script>