<template>
    <v-data-table :headers="headers"
                  :loading="loading"
                  :items="loading ? [] : users"
                  :items-per-page="-1"
                  :footer-props="{'items-per-page-options': [10, 25, 50, -1]}"
                  must-sort
    >
        <template v-slot:item.avatar="{item}">
            <v-avatar class="ma-1">
                <img v-if="item.avatar" :src="item.avatar" alt="Avatar"/>
                <template v-else>?</template>
            </v-avatar>
        </template>
        <template v-slot:item.created="{item}">
            {{new Date(item.userCreated).toLocaleString()}}
        </template>
        <template v-slot:item.enrolled="{item}">
            {{new Date(item.enrolled).toLocaleString()}}
        </template>
        <template v-slot:item.activity="{item}">
            {{item.activity === 0 ? 'Never' : new Date(item.activity).toLocaleString()}}
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
            assignments: null,
            headers: [
                {
                    text: '',
                    value: 'avatar',
                    align: 'start',
                    sortable: false
                },
                {text: 'Name', value: 'name'},
                {text: 'Created', value: 'created'},
                {text: 'Enrolled', value: 'enrolled'},
                {text: 'Last Activity', value: 'activity'}
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
                    assignmentsConnection {
                      nodes {
                        name
                        dueAt
                        _id
                      }
                    }
                    enrollmentsConnection {
                      nodes {
                        user {
                          name
                          avatarUrl
                          createdAt
                          _id
                        }
                        lastActivityAt
                        type
                        updatedAt
                        createdAt
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
                if(enrollments.data.course === null)
                {
                    this.users = [];
                    return;
                }

                if(enrollments.data.course['enrollmentsConnection'] === null)
                {
                    this.users = [];
                }
                else
                {
                    this.users = enrollments.data.course['enrollmentsConnection'].nodes.map(user => ({
                        name: user.user.name,
                        avatar: user.user.avatarUrl,
                        userCreated: new Date(user.user.createdAt).getTime(),
                        userID: user.user['_id'],
                        activity: new Date(user.lastActivityAt).getTime(),
                        type: user.type,
                        updated: new Date(user.updatedAt).getTime(),
                        enrolled: new Date(user.createdAt).getTime(),
                        details: null
                    }));
                }

                if(enrollments.data.course['assignmentsConnection'] === null)
                {
                    this.assignments = [];
                }
                else
                {
                    this.assignments = enrollments.data.course['assignmentsConnection'].nodes.map(assignment => ({
                        name: assignment.name,
                        id: assignment['_id'],
                        due: new Date(assignment.dueAt).getTime()
                    }));
                }
            },
            async loadDetails(studentID)
            {

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
