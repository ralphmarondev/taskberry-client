<script>

export default {
    data() {
        return {
            tasks: [],
            loading: true,

            showModal: false,
            newTask: {
                description: '',
                completed: '',
                priority: '',
                start_time: '',
                end_time: ''
            }
        };
    },
    methods: {
        async fetchTasks() {
            try {
                let response = await this.$http.get('http://localhost:8000/api/tasks/');
                this.tasks = response.data
                this.loading = false;
            } catch (error) {
                console.log(error);
            }
        },
        // Modals
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        async addTask() {
            try {
                let response = await this.$http.post('http://localhost:8000/api/tasks/', this.newTask);
                this.tasks.push(response.data);
                this.closeModal();
                this.newTask = {
                    description: '',
                    completed: false,
                    priority: 1,
                    start_time: '',
                    end_time: ''
                }
            } catch (error) {
                console.log(`Error adding: ${error}`);
            }
        }
    },
    created() {
        this.fetchTasks();
    }
}
</script>


<template>
    <div>
        <header>
            <div class="logo">Todo App</div>
            <div class="action" @click="openModal">New</div>
        </header>

        <main>
            <table>
                <thead>
                    <tr>
                        <th class="small-column">ID</th>
                        <th class="large-column">Description</th>
                        <th class="medium-column">Completed</th>
                        <th class="medium-column">Priority</th>
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
                        <td class="medium-column">{{ task.completed }}</td>
                        <td class="medium-column">{{ task.priority }}</td>
                        <td class="medium-column">{{ task.start_time }}</td>
                        <td class="medium-column">{{ task.end_time }}</td>
                        <td class="medium-column"><button>Update</button></td>
                        <td class="medium-column"><button>Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </main>

        <!-- Modals -->
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <h2>Add New Task</h2>

                <form @submit.prevent="addTask">
                    <label for="description">Description:</label>
                    <input type="text" id="description" v-model="newTask.description" required>

                    <label for="completed">Completed:</label>
                    <input type="checkbox" id="completed" v-model="newTask.completed">

                    <label for="priority">Priority:</label>
                    <select id="priority" v-model="newTask.priority" required>
                        <option value="1">Low</option>
                        <option value="2">Medium</option>
                        <option value="3">High</option>
                    </select>

                    <label for="start_time">Start Time:</label>
                    <input type="datetime-local" id="start_time" v-model="newTask.start_time" required>

                    <label for="end_time">End Time:</label>
                    <input type="datetime-local" id="end_time" v-model="newTask.end_time" required>

                    <button type="submit">Add Task</button>
                </form>
            </div>
        </div>

    </div>
</template>

<style>
@import url('css/style.css');
@import url('css/header.css');
@import url('css/main.css');
@import url('css/modal.css');
</style>
