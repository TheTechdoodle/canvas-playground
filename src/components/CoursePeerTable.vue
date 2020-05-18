<template>
    <v-card>
        <v-card-title>
            {{courseName}}
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table :headers="headers"
                      :loading="loading"
                      :items="loading ? [] : users"
                      :items-per-page="-1"
                      :footer-props="{'items-per-page-options': [10, 25, 50, -1]}"
                      :search="search"
                      @item-expanded="expanded"
                      item-key="name"
                      must-sort
                      show-expand
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

            <template v-slot:expanded-item="{headers, item}">
                <td :colspan="headers.length">
                    <v-container>
                        <v-row v-if="item.details === null" justify="center">
                            <v-progress-circular indeterminate/>
                        </v-row>
                        <template v-else>
                            <v-row justify="center">
                                <enrollment-table :user="item"/>
                            </v-row>
                        </template>
                    </v-container>
                </td>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    import {frameFetch} from '../frame/frameFetch';
    import EnrollmentTable from './EnrollmentTable';

    export default {
        name: 'CoursePeerTable',
        components: {EnrollmentTable},
        props: ['courseId'],
        data: () => ({
            users: null,
            assignments: null,
            courseName: '',
            search: '',
            headers: [
                {
                    text: '',
                    value: 'avatar',
                    align: 'start',
                    sortable: false,
                    filterable: false
                },
                {text: 'Name', value: 'name'},
                {text: 'Created', value: 'created', filterable: false},
                {text: 'Enrolled', value: 'enrolled', filterable: false},
                {text: 'Last Activity', value: 'activity', filterable: false},
                {text: 'Type', value: 'typeName', filterable: false},
                {text: '', value: 'data-table-expand'}
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
            typeName(type)
            {
                return ({
                    'StudentEnrollment': 'Student',
                    'TeacherEnrollment': 'Teacher'
                }[type]) || type;
            },
            async loadData()
            {
                if(!(this.courseId))
                {
                    this.users = [];
                    return;
                }
                this.users = null;

                let data = (await frameFetch(this.graphqlEndpoint, {
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
                          id
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
                })).data.course;
                if(data === null)
                {
                    this.users = [];
                    return;
                }
                this.courseName = data.name;

                if(data['enrollmentsConnection'] === null)
                {
                    this.users = [];
                }
                else
                {
                    this.users = data['enrollmentsConnection'].nodes.map(user => ({
                        name: user.user.name,
                        avatar: user.user.avatarUrl,
                        userCreated: new Date(user.user.createdAt).getTime(),
                        userID: user.user['id'],
                        activity: new Date(user.lastActivityAt).getTime(),
                        type: user.type,
                        typeName: this.typeName(user.type),
                        updated: new Date(user.updatedAt).getTime(),
                        enrolled: new Date(user.createdAt).getTime(),
                        details: null
                    }));
                }

                if(data['assignmentsConnection'] === null)
                {
                    this.assignments = [];
                }
                else
                {
                    this.assignments = data['assignmentsConnection'].nodes.map(assignment => ({
                        name: assignment.name,
                        id: assignment['_id'],
                        due: new Date(assignment.dueAt).getTime()
                    }));
                }
            },
            expanded({item, value})
            {
                if(value === true && item.details === null)
                {
                    this.loadDetails(item.userID);
                }
            },
            async loadDetails(studentID)
            {
                let data = (await frameFetch(this.graphqlEndpoint, {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify({query: `
                query ($studentID: ID!) {
                  node(id: $studentID) {
                    ... on User {
                      name
                      enrollments {
                        lastActivityAt
                        createdAt
                        course {
                          name
                        }
                      }
                    }
                  }
                }
                `, variables: {studentID}}),
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.token,
                        'Content-Type': 'application/json'
                    }
                })).data.node;
                for(let user of this.users)
                {
                    if(user.userID === studentID)
                    {
                        user.details = {
                            enrollments: data.enrollments === null ? [] : data.enrollments.map(enrollment => ({
                                activity: new Date(enrollment.lastActivityAt).getTime(),
                                enrolled: new Date(enrollment.createdAt).getTime(),
                                className: enrollment.course.name
                            }))
                        };
                    }
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
