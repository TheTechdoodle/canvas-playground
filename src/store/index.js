import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        closeLoadingImmediately: false,
        hostUrl: {},
        currentUser: {}
    },
    mutations: {
        setHostUrl(state, hostUrl)
        {
            state.hostUrl = hostUrl;
        },
        setCurrentUser(state, currentUser)
        {
            state.currentUser = currentUser;
        },
        setCloseLoadingImmediately(state, closeLoadingImmediately)
        {
            state.closeLoadingImmediately = closeLoadingImmediately;
        }
    },
    actions: {},
    modules: {}
});
