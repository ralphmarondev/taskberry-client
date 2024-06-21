<script>
import CreateNewTask from './components/CreateNewTask.vue';

export default {
    components: {
        CreateNewTask,
    },
    data() {
        return {
            showCreateNew: false,
            tasks: [
                { id: 1, name: "Task 1", status: "Pending", startTime: "10:00 AM", endTime: "11:00 AM" },
                { id: 2, name: "Task 2", status: "Completed", startTime: "11:00 AM", endTime: "12:00 PM" },
                // Add more tasks as needed
            ]
        };
    },
    methods: {
        updateTask(taskId) {
            // Handle task update logic here
            console.log(`Update task with ID: ${taskId}`);
        },
        deleteTask(taskId) {
            // Handle task deletion logic here
            this.tasks = this.tasks.filter(task => task.id !== taskId);
        }
    }
}
</script>

<template>
    <div class="home-screen">
        <header>
            <div class="logo">Todo App</div>
            <div class="action" @click="showCreateNew = true">New</div>
        </header>

        <main>
            <table>
                <thead>
                    <tr>
                        <th class="small-column">ID</th>
                        <th class="large-column">Task Name</th>
                        <th class="medium-column">Status</th>
                        <th class="medium-column">Start Time</th>
                        <th class="medium-column">End Time</th>
                        <th class="medium-column">Update</th>
                        <th class="medium-column">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="task in tasks" :key="task.id">
                        <td class="small-column">{{ task.id }}</td>
                        <td class="large-column">{{ task.name }}</td>
                        <td class="medium-column">{{ task.status }}</td>
                        <td class="medium-column">{{ task.startTime }}</td>
                        <td class="medium-column">{{ task.endTime }}</td>
                        <td class="medium-column"><button @click="updateTask(task.id)">Update</button></td>
                        <td class="medium-column"><button @click="deleteTask(task.id)">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </main>

        <CreateNewTask :visible="showCreateNew" @close="showCreateNew = false" title="Add New Task">
            <p>This is where the form for adding a new task will go.</p>
        </CreateNewTask>
    </div>
</template>

<style scoped>
@import url("home.css");
</style>