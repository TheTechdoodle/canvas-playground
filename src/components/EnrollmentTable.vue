<template>
    <v-card>
        <v-card-title>Enrollments</v-card-title>
        <v-data-table :headers="headers"
                      :loading="loading"
                      :items="enrollments"
                      :items-per-page="-1"
                      must-sort
                      hide-default-footer
        >
            <template v-slot:item.enrolled="{item}">
                {{new Date(item.enrolled).toLocaleString()}}
            </template>
            <template v-slot:item.activity="{item}">
                {{item.activity === 0 ? 'Never' : new Date(item.activity).toLocaleString()}}
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
    export default {
        name: 'EnrollmentTable',
        props: ['user'],
        computed: {
            loading()
            {
                return this.user.details === null;
            },
            enrollments()
            {
                return this.loading ? [] : this.user.details.enrollments;
            }
        },
        data: () => ({
            headers: [
                {text: 'Class', value: 'className'},
                {text: 'Enrolled', value: 'enrolled'},
                {text: 'Last Activity', value: 'activity'}
            ]
        })
    };
</script>

<style scoped>

</style>
