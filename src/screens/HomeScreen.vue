<script>

export default {
    data() {
        return {
            tasks: [],
            loading: true
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
        }
    },
    created() {
        this.fetchTasks();
    }
}
</script>


<template>
    <div>
        <h1>Task List</h1>
        <div v-if="loading">Loading...</div>
        <div v-else>
            <p v-if="tasks.length === 0">No tasks found.</p>
            <div v-else>
                <p v-for="task in tasks" :key="task.id">
                    <strong>ID:</strong> {{ task.id }} <br>
                    <strong>Description:</strong> {{ task.description }} <br>
                    <strong>Completed:</strong> {{ task.completed ? 'Yes' : 'No' }} <br>
                    <strong>Priority:</strong> {{ task.priority }} <br>
                    <strong>Start Time:</strong> {{ task.start_time }} <br>
                    <strong>End Time:</strong> {{ task.end_time }} <br>
                    <br>
                </p>
            </div>
        </div>
    </div>
</template>