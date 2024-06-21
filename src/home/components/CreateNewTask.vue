<script>
export default {
    props: {
        visible: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            default: "Modal Title"
        }
    },
    data() {
        return {
            newTask: {
                id: '',
                name: '',
                status: '',
                startTime: '',
                endTime: ''
            }
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        submitTask() {
            this.$emit('add-task', { ...this.newTask });
            this.closeModal();
            this.resetForm();
        },
        resetForm() {
            this.newTask = {
                id: '',
                name: '',
                status: '',
                startTime: '',
                endTime: ''
            }
        }
    }
};
</script>

<template>
    <div class="modal-overlay" v-if="visible">
        <div class="modal-content">
            <h2>{{ title }}</h2>

            <form @submit.prevent="submitTask">
                <label for="id">ID:</label>
                <input type="text" v-model="newTask.id" required />

                <label for="name">Task Name:</label>
                <input type="text" v-model="newTask.name" required />

                <label for="status">Status:</label>
                <input type="text" v-model="newTask.status" required />

                <label for="startTime">Start Time:</label>
                <input type="time" v-model="newTask.startTime" required />

                <label for="endTime">End Time:</label>
                <input type="time" v-model="newTask.endTime" required />

                <button type="submit">Add Task</button>
                <button type="button" @click="closeModal">Close</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
}

form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

button {
    padding: 5px 10px;
    margin: 2px;
    cursor: pointer;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 3px;
}

button:hover {
    background-color: #0056b3;
}
</style>
