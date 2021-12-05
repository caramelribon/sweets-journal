<template>
  <div >
  <nav id="header" class="w-full z-30 top-0 py-1">
      <div class="w-full container mx-auto
      flex flex-wrap items-center justify-between mt-0 px-6 py-3">
        <label for="menu-toggle" class="cursor-pointer md:hidden block">
          <svg class="fill-current text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20">
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>
        <input class="hidden" type="checkbox" id="menu-toggle" />
        <div class="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1" id="menu">
          <nav>
            <ul class="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
              <li><a class="inline-block no-underline hover:text-black hover:underline py-2 px-4"
              href="#">User Activity</a></li>
            </ul>
          </nav>
        </div>
        <div class="order-1 md:order-2">
          <a class="flex items-center tracking-wide no-underline hover:no-underline
          font-bold text-gray-800 text-xl" href="#">
            Sweets Journal
          </a>
        </div>
        <div class="order-2 md:order-3 flex items-center" id="nav-content">
          <a class="inline-block no-underline hover:text-black" href="#">
            <i class="far fa-user"></i>
          </a>
        </div>
      </div>
  </nav>
  </div>
</template>

<style>
  .work-sans {
    font-family: 'Work Sans', sans-serif;
  }
  #menu-toggle:checked + #menu {
    display: block;
  }
  .hover\:grow {
    transition: all 0.3s;
    transform: scale(1);
  }
  .hover\:grow:hover {
    transform: scale(1.02);
  }
</style>
