<script setup>
  import DashBoardHeader from './components/dashboardHeader.vue';
  import NewTask from './modals/newTaskModal.vue';
</script>

<template>
  <div>
    <DashBoardHeader />
    <h2 class="text-primary mt-3">Dashboard</h2>

    <NewTask />
  </div>
</template>
