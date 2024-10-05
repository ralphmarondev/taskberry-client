<script setup></script>

<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light d-flex align-items-center p-3 sticky-top"
    >
      <div class="container-fluid">
        <a href="#" class="navbar-brand">TaskBerry</a>
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
        <div
          class="collapse navbar-collapse ms-5"
          id="navbar-supported-content"
        >
          <ul class="navbar-nav me-auto mb-2 lg-0">
            <li class="nav-item">
              <a href="#home" class="nav-link active" aria-current="page"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a href="#about" class="nav-link active">About</a>
            </li>
          </ul>
        </div>

        <div class="d-flex">
          <button class="btn btn-outline-primary px-4 fw-semibold fs-6">
            NEW TASK
          </button>
        </div>
      </div>
    </nav>
    <h2 class="text-primary mt-3">Dashboard</h2>
  </div>
</template>
