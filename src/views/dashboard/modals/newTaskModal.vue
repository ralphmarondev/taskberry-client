<script setup>
  import { defineModel } from 'vue';
  import axiosIntance from '@/axiosInstance';

  const title = defineModel('title');
  const description = defineModel('description');

  const onSaveTask = () => {
    console.log(
      `Saving... Title: ${title.value}, Description: ${description.value}`
    );
    axiosIntance
      .post('tasks/', {
        title: title.value,
        description: description.value,
      })
      .then(() => {
        console.log('Saved.');

        title.value = '';
        description.value = '';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
</script>

<template>
  <div
    class="modal fade"
    id="new-task-modal"
    tabindex="-1"
    aria-labelledby="new-task-modal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-primary" id="new-task-modal">
            Create New Task
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.prevent="onSaveTask">
          <div class="modal-body">
            <div class="mb-3">
              <label for="title" class="form-label">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                class="form-control"
                placeholder="Title"
                v-model="title"
              />
            </div>
            <label for="description" class="form-label">Description</label>
            <input
              type="text"
              name="description"
              id="description"
              class="form-control"
              placeholder="Description"
              v-model="description"
            />
            <div class="mb3"></div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">Save Task</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
