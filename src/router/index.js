import Vue from 'vue';
import VueRouter from 'vue-router';
import CoursePeers from '../views/CoursePeers';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'user-data',
        component: CoursePeers
    }
];

const router = new VueRouter({
    routes
});

export default router;
