<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light d-flex align-items-center py-3 sticky-top px-5"
  >
    <div class="container-fluid">
      <a href="#" class="navbar-brand text-primary">TaskBerry</a>
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
      <div class="collapse navbar-collapse" id="navbar-supported-content">
        <ul class="navbar-nav me-auto mb-2 lg-0"></ul>

        <div class="d-flex">
          <input
            type="search"
            class="form-control me-2"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            class="btn btn-outline-primary fw-semibold fs-6 w-50"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#new-task-modal"
          >
            NEW TASK
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
