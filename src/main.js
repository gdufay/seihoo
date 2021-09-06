import { createApp } from "vue"
import App from "./App.vue"
import ElementPlus from "element-plus"
import router from "./router"
import store from "./store"
import { IconCandy, IconCereal, IconDairy, IconFish, IconLiquid, IconSeasoning, IconVegetable, IconFood, IconFruit, IconMeat } from "./components/icons";

const app = createApp(App).use(store).use(router).use(ElementPlus)

app.component("IconCandy", IconCandy);
app.component("IconCereal", IconCereal);
app.component("IconDairy", IconDairy);
app.component("IconFish", IconFish);
app.component("IconFood", IconFood);
app.component("IconFruit", IconFruit);
app.component("IconLiquid", IconLiquid);
app.component("IconMeat", IconMeat);
app.component("IconSeasoning", IconSeasoning);
app.component("IconVegetable", IconVegetable);

app.mount("#app")