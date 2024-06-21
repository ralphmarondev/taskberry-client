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
    methods: {
        closeModal() {
            this.$emit('close');
        }
    }
};
</script>

<template>
    <div class="modal-overlay" v-if="visible">
        <div class="modal-content">
            <h2>{{ title }}</h2>
            <slot></slot>
            <button @click="closeModal">Close</button>
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
</style>
