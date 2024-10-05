<script setup>
  import DashBoardHeader from './components/dashboardHeader.vue';
  import DashboardTable from './dashboardTable.vue';
  import NewTask from './modals/newTaskModal.vue';
</script>

<template>
  <div>
    <DashBoardHeader />
    <DashboardTable />

    <NewTask />
  </div>
</template>
