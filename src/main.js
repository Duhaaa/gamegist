import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import 'remixicon/fonts/remixicon.css'
import { ObserveVisibility } from 'vue-observe-visibility';

const app = createApp(App);
app.directive('observe-visibility', {
    beforeMount: (el, binding, vnode) => {
      vnode.context = binding.instance;
      ObserveVisibility.bind(el, binding, vnode);
    },
    update: ObserveVisibility.update,
    unmounted: ObserveVisibility.unbind,
});
app.use(store);
app.use(router);
app.mount('#app');
