<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="3">
                <course-selection v-model="selectedCourse"/>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12">
                <course-peer-table :course-id="selectedCourse"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import CourseSelection from '../components/CourseSelection';
    import CoursePeerTable from '../components/CoursePeerTable';
    export default {
        name: 'CoursePeers',
        components: {CoursePeerTable, CourseSelection},
        data: () => ({
            selectedCourse: null
        })
    };
</script>

<style scoped>

</style>
