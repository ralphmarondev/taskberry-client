import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";

// set a prototype for https

const app = createApp(App);
app.config.globalProperties.$http = axios;
app.mount("#app");

// TODO: create a root css  file
