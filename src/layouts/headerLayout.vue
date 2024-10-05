<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light d-flex align-items-center p-3 sticky-top"
  >
    <div class="container-fluid">
      <a
        href="https://ralphmarondev.github.io/"
        class="navbar-brand text-primary"
        >Ralph Maron Eda</a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar-supported-content"
        aria-controls="navbar-supported-content"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse ms-5" id="navbar-supported-content">
        <ul class="navbar-nav me-auto mb-2 lg-0">
          <li class="nav-item">
            <a href="#home" class="nav-link active" aria-current="page">Home</a>
          </li>
          <li class="nav-item">
            <a href="#about" class="nav-link active">About</a>
          </li>
        </ul>
        <div class="d-flex">
          <router-link
            to="/dashboard"
            class="btn btn-outline-primary px-4 fw-semibold fs-6"
          >
            GET STARTED
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
