<template>
    <v-app>
        <template v-if="ready">
            <v-navigation-drawer
                    v-model="drawer"
                    :clipped="$vuetify.breakpoint.lgAndUp"
                    app
            >
                <v-list>
                    <v-list-item link :to="{name: 'user-data'}">
                        <v-list-item-action>
                            <v-icon>mdi mdi-flask</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                User Data
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-app-bar
                    app
                    :clipped-left="$vuetify.breakpoint.lgAndUp"
                    color="primary"
            >
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                <div class="d-flex align-center">
                    <v-toolbar-title>
                        Canvas Playground <span class="font-weight-light">v{{version}}</span>
                    </v-toolbar-title>
                </div>

                <v-spacer></v-spacer>

                <v-menu offset-y :close-on-content-click="false">
                    <template v-slot:activator="{on}">
                        <v-btn icon v-on="on">
                            <v-avatar>
                                <img :src="avatar" alt="Profile Picture"/>
                            </v-avatar>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-container>
                            <v-row justify="center">
                                <v-avatar size="80">
                                    <img :src="avatar" alt="Profile Picture"/>
                                </v-avatar>
                            </v-row>
                            <v-row justify="center">
                                <v-card-title>{{user.name}}</v-card-title>
                            </v-row>
                        </v-container>
                        <v-list>
                            <v-list-item>
                                <dark-switch/>
                            </v-list-item>
                            <v-list-item>
                                <close-loading-immediately-switch/>
                            </v-list-item>
                            <v-list-item @click="reload">
                                <v-list-item-icon>
                                    <v-icon>mdi mdi-exit-to-app</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>Exit</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-menu>
            </v-app-bar>

            <v-content>
                <router-view/>
            </v-content>
        </template>
        <template v-else>
            <v-content>
                <v-container fluid class="mt-10">
                    <v-row v-if="loading" justify="center" class="mb-5">
                        <v-progress-circular indeterminate/>
                    </v-row>
                    <v-row v-if="!loading" justify="center" class="mb-1">
                        <v-btn color="success" x-large @click="ready = true">Proceed</v-btn>
                    </v-row>
                    <v-row v-if="!loading" justify="center" class="mb-10">
                        <close-loading-immediately-switch/>
                    </v-row>
                    <v-row justify="center">
                        <v-list>
                            <v-list-item v-for="prepItem of prep" :key="prepItem.name">
                                <v-list-item-icon>
                                    <v-progress-circular v-if="prepItem.status === 'loading'" indeterminate/>
                                    <v-icon v-if="prepItem.status === 'complete'" color="success">mdi mdi-check</v-icon>
                                    <v-icon v-if="prepItem.status === 'error'" color="error">mdi mdi-close</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>{{prepItem.name}}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-row>
                    <v-row justify="center" class="mt-3">
                        <dark-switch/>
                    </v-row>
                </v-container>
            </v-content>
        </template>
    </v-app>
</template>

<script>
    import localforage from 'localforage';
    import {frameFetch} from './frame/frameFetch';
    import {framePromise} from './frame/framePromise';
    import DarkSwitch from './components/DarkSwitch';
    import CloseLoadingImmediatelySwitch from './components/CloseLoadingImmediatelySwitch';

    export default {
        name: 'App',
        components: {CloseLoadingImmediatelySwitch, DarkSwitch},
        data: () => ({
            ready: false,
            loading: true,
            prep: [],
            drawer: null
        }),
        computed: {
            user()
            {
                return this.$store.state.currentUser;
            },
            avatar()
            {
                return this.user['avatar_url'];
            },
            version()
            {
                return process.env.VUE_APP_VERSION;
            }
        },
        methods: {
            addLoading(name)
            {
                this.prep.unshift({name, status: 'loading'});
            },
            endLoading(error)
            {
                this.prep[0].status = error ? 'error' : 'complete';
            },
            reload()
            {
                framePromise('reload');
            },
            async getToken()
            {
                // Check for an existing token
                this.addLoading('Checking for token');
                const tokenList = await framePromise('getTokens');
                this.endLoading();
                let newToken = '';
                for(let token of tokenList)
                {
                    if(token.purpose === 'canvas-playground')
                    {
                        this.addLoading('Regenerating existing token');
                        newToken = (await framePromise('regenerateToken', token.tokenUrl));
                        console.log(newToken);
                        newToken = newToken['visible_token'];
                        this.endLoading(newToken === null || newToken === undefined);
                    }
                }
                // If an existing token doesn't exist, generate a new one
                if(newToken === '')
                {
                    this.addLoading('Generating new token');
                    newToken = await framePromise('generateToken',
                        this.$store.state.hostUrl.origin + '/profile/tokens/',
                        'canvas-playground', '');
                    console.log('New token data: ');
                    console.log(newToken);
                    newToken = newToken['visible_token'];
                    this.endLoading(newToken === null || newToken === undefined);
                }

                this.addLoading('Saving token');
                console.log(newToken);
                await localforage.setItem('token', newToken);
                this.endLoading();

                return newToken;
            },
            async getUser(token)
            {
                this.addLoading('Getting user');
                try
                {
                    let data = await frameFetch(this.$store.state.hostUrl.origin + '/api/v1/users/self', {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Authorization': 'Bearer ' + token,
                            'Content-Type': 'application/json'
                        }
                    });
                    this.endLoading();
                    return {
                        data,
                        tokenValid: true
                    };
                }
                catch(e)
                {
                    this.endLoading(true);
                    return {tokenValid: false};
                }
            }
        },
        async created()
        {
            this.addLoading('Loading settings');
            this.$store.commit('setCloseLoadingImmediately', await localforage.getItem('closeLoadingImmediately'));
            this.endLoading();

            this.addLoading('Loading token');
            let token = await localforage.getItem('token');
            this.endLoading();

            this.addLoading('Loading url');
            this.$store.commit('setHostUrl', await framePromise('getUrl'));
            this.endLoading();

            console.log(token);

            if(token === null)
            {
                token = await this.getToken();
            }
            let currentUser = await this.getUser(token);
            if(!currentUser.tokenValid)
            {
                token = await this.getToken();
                console.log('Newer token');
                console.log(token);
                currentUser = await this.getUser(token);
            }
            this.$store.commit('setToken', token);
            this.$store.commit('setCurrentUser', currentUser.data);

            this.loading = false;
            if(this.$store.state.closeLoadingImmediately)
            {
                this.ready = true;
            }
        }
    };
</script>
