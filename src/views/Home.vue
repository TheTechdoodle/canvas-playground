<template>
    <v-container fluid>
        <v-row justify="center">
            <v-col cols="3">
                <course-selection/>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col class="text-center">
                <v-btn color="info" :href="scriptData">Bookmarklet</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {frameFetch} from '../frame/frameFetch';
    import {framePromise} from '../frame/framePromise';
    import CourseSelection from '../components/CourseSelection';

    export default {
        name: 'Home',
        components: {CourseSelection},
        data: () => ({
            token: null
        }),
        computed: {
            bearerToken()
            {
                return 'Bearer ' + this.token;
            },
            scriptData()
            {
                return 'javascript:(function(){let s = document.createElement("script");s.src="http://localhost:8080/bookmarklet.js";document.body.appendChild(s);})();'
            }
        },
        methods: {
            async testTokens()
            {
                let tokens = await framePromise('tokenDetails', {});
                console.log(tokens);
            },
            test()
            {
                frameFetch('https://vcccd.instructure.com/api/graphql', {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify({query: '{ allCourses { name } }'}),
                    headers: {
                        'Authorization': this.bearerToken,
                        'Content-Type': 'application/json'
                    }
                }).then(console.log);
            }
        }
    };
</script>
