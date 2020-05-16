<template>
    <v-data-table :headers="headers"
                  :loading="loading"
                  :items="rows"
                  :items-per-page="-1"
                  :footer-props="{'items-per-page-options': [10, 25, 50, -1]}">
        <template v-slot:item.avatar="{item}">
            <v-avatar class="ma-1">
                <img v-if="item.avatar" :src="item.avatar" alt="Avatar"/>
                <template v-else>?</template>
            </v-avatar>
        </template>
        <template v-slot:item.created="{item}">
            {{item.created.toLocaleString()}}
        </template>
        <template v-slot:item.activity="{item}">
            {{item.activity.toLocaleString()}}
        </template>
    </v-data-table>
</template>

<script>
    import {frameFetch} from '../frame/frameFetch';

    export default {
        name: 'CoursePeerTable',
        props: ['courseId'],
        data: () => ({
            users: null,
            headers: [
                {
                    text: '',
                    value: 'avatar',
                    align: 'start',
                    sortable: false
                },
                {text: 'Name', value: 'name'},
                {text: 'Created', value: 'created'},
                {text: 'Activity', value: 'activity'}
            ],
            options: {
                itemsPerPage: 25
            }
        }),
        computed: {
            loading()
            {
                return this.users === null;
            },
            graphqlEndpoint()
            {
                return this.$store.state.hostUrl.origin + '/api/graphql';
            },
            rows()
            {
                if(this.loading)
                {
                    return [];
                }
                return this.users.map(user => ({
                    name: user.user.name,
                    avatar: user.user.avatarUrl,
                    created: new Date(user.user.createdAt),
                    activity: new Date(user.lastActivityAt)
                }));
            }
        },
        watch: {
            courseId()
            {
                this.loadData();
            }
        },
        methods: {
            async loadData()
            {
                if(!(this.courseId))
                {
                    this.users = [];
                    return;
                }
                this.users = null;

                let enrollments = (await frameFetch(this.graphqlEndpoint, {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify({query: `
                query($classID: ID!) {
                  course(id: $classID) {
                    name
                    enrollmentsConnection {
                      nodes {
                        user {
                          name
                          avatarUrl
                          createdAt
                        }
                        lastActivityAt
                      }
                    }
                  }
                }
                `, variables: {classID: this.courseId}}),
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.token,
                        'Content-Type': 'application/json'
                    }
                }));
                console.log(enrollments);
                enrollments = enrollments.data['course']['enrollmentsConnection'];

                if(enrollments === null)
                {
                    this.users = [];
                }
                else
                {
                    this.users = enrollments.nodes;
                    console.log(this.users);
                }

            }
        },
        async created()
        {
            await this.loadData();
        }
    };
</script>

<style scoped>

</style>
