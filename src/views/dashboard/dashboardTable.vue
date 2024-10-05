<script setup>
  import { reactive } from 'vue';

  const items = reactive([
    {
      id: 0,
      title: 'Hello',
      description: 'Good',
    },
    {
      id: 1,
      title: 'Name',
      description: 'Ralph Maron',
    },
  ]);
</script>

<template>
  <div class="container">
    <table class="table table-light table-striped table-bordered mt-3">
      <thead class="table-primary">
        <tr>
          <th width="45%" class="text-center">Title</th>
          <th width="45%" class="text-center">Description</th>
          <th width="10%" class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.description }}</td>
          <td class="text-center">
            <button class="btn btn-outline-secondary">Action</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
