import "mars3d-cesium/Build/Cesium/Widgets/widgets.css";
import "mars3d/dist/mars3d.css";

import { createApp } from "vue";
import Application from "./App.vue";
import "./style.css";
import router from "./router";
import { setupStore } from "@/store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

const app = createApp(Application);
// 挂载状态管理
setupStore(app);

app.use(router).mount("#app");
