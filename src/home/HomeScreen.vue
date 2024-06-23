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
                // { id: 1, name: "Task 1", status: "Pending", startTime: "10:00 AM", endTime: "11:00 AM" },
                // { id: 2, name: "Task 2", status: "Completed", startTime: "11:00 AM", endTime: "12:00 PM" },
                // Add more tasks as needed
            ],
            taskToUpdate: null
        };
    },
    methods: {
        async addTask(newTask) {
            try {
                const response = await this.$http.post('http://localhost:8000/api/tasks/', {
                    description: newTask.description,
                    priority: newTask.priority,
                    start_time: newTask.startTime,
                    end_time: newTask.endTime
                });

                // Assuming your backend returns the created task with an ID
                this.tasks.push(response.data);
            } catch (error) {
                console.error('Error adding new task:', error);
            }
        },
        updateTask(taskId) {
            // Handle task update logic here
            console.log(`Update task with ID: ${taskId}`);
        },
        deleteTask(taskId) {
            // Handle task deletion logic here
            this.tasks = this.tasks.filter(task => task.id !== taskId);
        },
        async getData() {
            try {
                const response = await this.$http.get('http://localhost:8000/api/tasks/');
                this.tasks = response.data;
                this.tasks.reverse();
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        // fetch tasks on page load
        this.tasks = []
        this.getData();
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
                        <td class="large-column">{{ task.description }}</td>
                        <td class="medium-column">{{ task.priority }}</td>
                        <td class="medium-column">{{ task.start_time }}</td>
                        <td class="medium-column">{{ task.end_time }}</td>
                        <td class="medium-column"><button @click="updateTask(task.id)">Update</button></td>
                        <td class="medium-column"><button @click="deleteTask(task.id)">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </main>

        <CreateNewTask :visible="showCreateNew" @close="showCreateNew = false" :addTask="addTask"
            title="Add New Task" />
    </div>
</template>

<style scoped>
@import url("home.css");
</style>