<template>
    <v-select :loading="loading" label="Course" :items="courseItems" v-model="courseSelected"/>
</template>

<script>
    import {frameFetch} from '../frame/frameFetch';

    export default {
        name: 'CourseSelection',
        props: ['value'],
        data: () => ({
            courses: null
        }),
        computed: {
            loading()
            {
                return this.courses === null;
            },
            graphqlEndpoint()
            {
                return this.$store.state.hostUrl.origin + '/api/graphql';
            },
            courseItems()
            {
                if(this.loading)
                {
                    return null;
                }
                return this.courses.map(item => ({
                    text: item.name,
                    value: item['_id']
                }));
            },
            courseSelected: {
                set(value)
                {
                    this.$emit('input', value);
                },
                get()
                {
                    return this.value;
                }
            }
        },
        async created()
        {
            this.courses = (await frameFetch(this.graphqlEndpoint, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({query: `
                query {
                  allCourses {
                    name
                    _id
                  }
                }
                `}),
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.token,
                    'Content-Type': 'application/json'
                }
            })).data['allCourses'];
        }
    };
</script>

<style scoped>

</style>
