const { createApp } = Vue;
import app from './app.js';
import home from './pages/home.js';

const routes = [
    { path: '/', component: home, name: 'home' },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
  })

createApp(app).use(router).mount('#app');


