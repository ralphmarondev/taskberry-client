<script>
// import { $set } from 'vue';

export default {
    data() {
        return {
            // tasks
            tasks: [''],
            title: '',
            description: '',
        }
    },
    methods: {
        async getData() {
            try {
                // fetch tasks
                const response = await this.$http.get('http://localhost:8000/api/tasks/');
                // set the data returned as tasks
                this.tasks = response.data
            } catch (error) {
                console.log(error);
            }
        },
        async submitForm() {
            // clear trailing and leading spaces
            this.title = this.title.trim();
            this.description = this.description.trim();

            // check if such field is blank. if so, dont submit form
            if (!this.title || !this.description) {
                alert('Title and description cannot be empty!');
                return;
            }

            try {
                // send POST request to the API
                const response = await this.$http.post('http://localhost:8000/api/tasks/', {
                    title: this.title,
                    description: this.description,
                    completed: false
                });
                console.log('Response data after adding tasks:', response.data);
                // append the returned data to the tasks array
                this.tasks.push(response.data);

                // reset the title and description fields
                this.title = ''
                this.description = ''
            } catch (error) {
                console.log(error);
            }
        },
        async toggleTask(task) {
            try {
                // send a request to the API to update the task
                const response = await this.$http.put(`http://localhost:8000/api/tasks/${task.id}/`, {
                    completed: !task.completed,
                    title: task.title,
                    description: task.description
                });

                const index = this.tasks.findIndex(t => t.id === task.id);
                if (index !== -1) {
                    // this.$set(this.tasks, index, response.data);
                    this.tasks[index] = response.data;
                }
            } catch (error) {
                console.log(error);
            }
        },
        async deleteTask(task) {

            console.log('Deleting task:', task);
            // Confirm if one wants to delete the task
            let confirmation = confirm("Do you want to delete [" + task.id + "] task?");

            if (confirmation) {
                try {

                    // Send a request to delete the task
                    await this.$http.delete(`http://localhost:8000/api/tasks/${task.id}/`);

                    this.tasks = this.tasks.filter(t => t.id != task.id);
                    console.log(`Deleting this id: ${task.id.value}`);
                    console.log('Task deleted sucessfully.');
                    // Refresh the tasks
                    this.getData();
                } catch (error) {

                    // Log any error
                    console.log(error)
                }
            }
        }
    },
    created() {
        // fetch tasks on page load
        this.getData();
    }
}
</script>


<template>
    <div class="tasks-container">
        <div class="add-task">
            <form v-on:submit.prevent="submitForm">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" class="form-control" id="title" v-model="title">
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea class="form-control" id="description" v-model="description"></textarea>
                </div>
                <div class="form-group">
                    <button type="submit">Add Task</button>
                </div>
            </form>
        </div>

        <div class="tasks-content">
            <h1>Tasks</h1>

            <div v-for="task in tasks" :key="task.id" class="items">
                <h2> {{ task.title }} </h2>
                <p> {{ task.description }} </p>
                <button @click="toggleTask(task)"> {{ task.completed ? 'Undo' : 'Complete' }} </button>
                <button @click="deleteTask(task)">Delete</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    font-family: 'Courier New', Courier, monospace;
}

button {
    padding: 10px 15px;
    border-radius: 8px;
    border: none;
}

.tasks-container {
    padding: 2% 15%;
}

.add-task {
    padding: 10px;
    border: 2px solid magenta;
    border-radius: 15px;
}

.items {
    padding: 10px 15px;
    margin: 15px;
    border: 2px solid purple;
    border-radius: 15px;
}

.form-group {
    padding: 10px;
    display: flex;
    flex-direction: column;
}

.form-group label {
    font-size: 18px;
    font-weight: 600;
    padding: 5px;
}

.form-group input,
textarea {
    border-radius: 8px;
    font-size: 18px;
    font-weight: 500;
}

.form-control {
    padding: 10px;
    border: none;
    outline: none;
    background: purple;
    color: white;
}

.items button {
    margin: 5px;
}
</style>