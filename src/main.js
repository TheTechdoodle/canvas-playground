import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuetify from 'vuetify/lib';
import localforage from 'localforage';

Vue.use(Vuetify);
Vue.config.productionTip = false;

localforage.getItem('theme').then(theme =>
{
    new Vue({
        router,
        store,
        vuetify: new Vuetify({
            theme: {
                dark: theme !== 'light'
            }
        }),
        render: function(h)
        {
            return h(App);
        }
    }).$mount('#app');
});
