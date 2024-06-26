<script>

export default {
    data() {
        return {
            tasks: [],
            loading: true,
            sortBy: 'priority',
            notCompletedTask: [],
            completedTasks: [],

            showAddModal: false,
            showUpdateModal: false,
            newTask: {
                description: '',
                completed: false,
                priority: 1,
                start_time: '',
                end_time: ''
            },
            selectedTask: {
                id: '',
                description: '',
                completed: false,
                priority: 1,
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

                this.updateTaskList();
            } catch (error) {
                console.log(error);
            }
        },

        // Modals
        openAddModal() {
            this.showAddModal = true;
        },
        closeAddModal() {
            this.showAddModal = false;

            this.fetchTasks();
        },
        async addTask() {
            // input validation
            const startTime = new Date(this.newTask.start_time);
            const endTime = new Date(this.newTask.end_time);

            if (endTime <= startTime) {
                alert('Invalid time: End time must be greater than start time');
                return;
            }

            try {
                let response = await this.$http.post('http://localhost:8000/api/tasks/', this.newTask);
                this.tasks.push(response.data);
                this.closeAddModal();
                this.newTask = {
                    description: '',
                    completed: false,
                    priority: 1,
                    start_time: '',
                    end_time: ''
                }

                this.fetchTasks();
            } catch (error) {
                console.log(`Error adding: ${error}`);
            }
        },

        openUpdateModal(task) {
            this.selectedTask = {
                ...task,
                start_time: task.start_time ? task.start_time.slice(0, 16) : '',
                end_time: task.end_time ? task.end_time.slice(0, 16) : ''
            };
            this.showUpdateModal = true;
        },
        closeUpdateModal() {
            this.showUpdateModal = false;

            this.fetchTasks();
        },
        async updateTask() {
            const startTime = new Date(this.newTask.start_time);
            const endTime = new Date(this.newTask.end_time);
            if (endTime <= startTime) {
                alert('Invalid time: End time must be greater than start time');
                return;
            }

            try {
                let response = await this.$http.put(`http://localhost:8000/api/tasks/${this.selectedTask.id}/`, this.selectedTask);
                let index = this.tasks.findIndex(task => task.id === this.selectedTask.id);

                if (index !== -1) {
                    this.tasks.splice(index, 1, response.data);
                }
                this.closeUpdateModal();
            } catch (error) {
                console.log(`Error: ${error}`);
            }
        },

        async deleteTask(taskId) {
            try {
                await this.$http.delete(`http://localhost:8000/api/tasks/${taskId}/`);
                this.tasks = this.tasks.filter(task => task.id !== taskId);

                this.fetchTasks();
            } catch (error) {
                console.log(`Deleting error: ${error}`);
            }
        },

        // refactoring
        getPriorityLabel(priority) {
            switch (priority) {
                case 1:
                    return 'low';
                case 2:
                    return 'medium';
                case 3:
                    return 'high';
                default:
                    return '';
            }
        },
        getStatusLabel(isCompleted) {
            return isCompleted ? 'Completed' : 'Pending';
        },
        formatDateTime(dateTimeStr) {
            if (!dateTimeStr)
                return '';

            const date = new Date(dateTimeStr);
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();
            let hours = date.getHours();
            const minutes = date.getMinutes();
            const period = hours >= 12 ? 'pm' : 'am';

            // convert 24-hour format to 12-hour format
            hours = hours % 12
            hours = hours ? hours : 12; // midnigh (0 hours)

            return `${month}/${day}/${year} ${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
        },
        sortTasks() {
            this.tasks.sort((a, b) => {
                // completion status
                if (a.completed !== b.completed) {
                    return a.completed ? 1 : -1;
                }

                if (a.priority !== b.priority) {
                    return b.priority - a.priority;
                }
            });
        },
        updateTaskList() {
            this.notCompletedTask = this.tasks.filter(task => !task.completed);
            this.completedTasks = this.tasks.filter(task => task.completed);

            this.sortCompletedTasks();
            this.sortNotCompletedTasks();
        },
        sortCompletedTasks() {
            this.completedTasks.sort((a, b) => {
                // completion status
                if (a.completed !== b.completed) {
                    return a.completed ? 1 : -1;
                }

                if (a.priority !== b.priority) {
                    return b.priority - a.priority;
                }
            });
        },
        sortNotCompletedTasks() {
            this.notCompletedTask.sort((a, b) => {
                // completion status
                if (a.completed !== b.completed) {
                    return a.completed ? 1 : -1;
                }

                if (a.priority !== b.priority) {
                    return b.priority - a.priority;
                }
            });
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
            <div class="action" @click="openAddModal">New</div>
        </header>

        <main>
            <div class="spacer"></div>
            <div class="pending-tasks">
                <h2>Pending Tasks</h2>
                <table v-if="notCompletedTask.length > 0">
                    <thead>
                        <tr>
                            <!-- <th class="small-column">ID</th> -->
                            <th class="large-column">Description</th>
                            <th class="medium-column">Status</th>
                            <th class="medium-column">Priority</th>
                            <th class="medium-column">Start Time</th>
                            <th class="medium-column">End Time</th>
                            <th class="medium-column">Update</th>
                            <th class="medium-column">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="task in notCompletedTask" :key="task.id">
                            <!-- <td class="small-column">{{ task.id }}</td> -->
                            <td class="large-column">{{ task.description }}</td>
                            <td class="medium-column">{{ getStatusLabel(task.completed) }}</td>
                            <td class="medium-column">{{ getPriorityLabel(task.priority) }}</td>
                            <td class="medium-large-column">{{ formatDateTime(task.start_time) }}</td>
                            <td class="medium-large-column">{{ formatDateTime(task.end_time) }}</td>
                            <td class="medium-column"><button @click="openUpdateModal(task)">Update</button></td>
                            <td class="medium-column"><button @click="deleteTask(task.id)"
                                    style="background: red;">Delete</button></td>
                        </tr>
                    </tbody>
                </table>
                <h2 v-else>
                    Keep it up! No pending tasks.
                </h2>
            </div>

            <div class="spacer"></div>
            <div class="completed-tasks">
                <h2>Completed Tasks</h2>
                <table v-if="completedTasks.length > 0">
                    <thead>
                        <tr>
                            <!-- <th class="small-column">ID</th> -->
                            <th class="large-column">Description</th>
                            <th class="medium-column">Status</th>
                            <th class="medium-column">Priority</th>
                            <th class="medium-column">Start Time</th>
                            <th class="medium-column">End Time</th>
                            <th class="medium-column">Update</th>
                            <th class="medium-column">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="task in completedTasks" :key="task.id">
                            <!-- <td class="small-column">{{ task.id }}</td> -->
                            <td class="large-column">{{ task.description }}</td>
                            <td class="medium-column">{{ getStatusLabel(task.completed) }}</td>
                            <td class="medium-column">{{ getPriorityLabel(task.priority) }}</td>
                            <td class="medium-large-column">{{ formatDateTime(task.start_time) }}</td>
                            <td class="medium-large-column">{{ formatDateTime(task.end_time) }}</td>
                            <td class="medium-column"><button @click="openUpdateModal(task)">Update</button></td>
                            <td class="medium-column"><button @click="deleteTask(task.id)"
                                    style="background: red;">Delete</button></td>
                        </tr>
                    </tbody>
                </table>
                <h2 v-else>
                    No completed tasks yet.
                </h2>
            </div>
        </main>

        <!-- Modals -->
        <div v-if="showAddModal" class="modal">
            <div class="modal-content">
                <span class="close" @click="closeAddModal">&times;</span>
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

        <div v-if="showUpdateModal" class="modal">
            <div class="modal-content">
                <span class="close" @click="closeUpdateModal">&times;</span>
                <h2>Update Task</h2>

                <form @submit.prevent="updateTask">
                    <label for="description">Description:</label>
                    <input type="text" id="description" v-model="selectedTask.description" required>

                    <label for="completed">Completed:</label>
                    <input type="checkbox" id="completed" v-model="selectedTask.completed">

                    <label for="priority">Priority:</label>
                    <select id="priority" v-model="selectedTask.priority" required>
                        <option value="1">Low</option>
                        <option value="2">Medium</option>
                        <option value="3">High</option>
                    </select>

                    <label for="start_time">Start Time:</label>
                    <input type="datetime-local" id="start_time" v-model="selectedTask.start_time" required>

                    <label for="end_time">End Time:</label>
                    <input type="datetime-local" id="end_time" v-model="selectedTask.end_time" required>

                    <button type="submit">Update Task</button>
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

<!-- TODO: instead of delete [label it as deleted] for recycle purposes -->

<!-- 

https://github.com/ralphmarondev/client

https://github.com/ralphmarondev/api

-->
