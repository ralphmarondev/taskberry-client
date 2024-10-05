<script setup>
  import Header from '@/layouts/headerLayout.vue';
</script>

<template>
  <div>
    <Header />

    <section class="section" id="home">
      <div class="container">
        <div class="row m-3 d-flex align-items-center h-100">
          <div class="col-6 mt-3">
            <h3 class="text-primary fs-1 fw-semibold">TaskBerry</h3>
            <p class="text-primary fs-5">
              TaskBerry🍓 is a fresh and fun task manager that keeps your to-dos
              sweet and simple! The app that got me into my first internship,
              now here to help you stay on top of your tasks with a smile.
            </p>
            <a
              href="#about"
              class="btn btn-outline-primary mt-3 px-4 fw-semibold fs-6"
            >
              MORE DETAILS
            </a>
          </div>

          <div class="col-6 m5-3">
            <div
              class="d-flex align-items-center justify-content-center overflow-hidden"
            >
              <img
                src="@/assets/images/cute_image.jpg"
                alt="Cute Image"
                height="400"
                width="400"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="about">
      <div class="container border vh-100">
        <div class="col mt-3">
          <h5 class="text-primary">About</h5>
        </div>
      </div>
    </section>
  </div>
</template>
