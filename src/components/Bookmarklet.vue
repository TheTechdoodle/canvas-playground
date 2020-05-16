<template>
    <v-btn color="info" :href="scriptData">{{title}}</v-btn>
</template>

<script>
    export default {
        name: 'Bookmarklet',
        props: {
            title: {
                type: String,
                default: 'Bookmarklet'
            }
        },
        computed: {
            scriptData()
            {
                return 'javascript:(function(){let s = document.createElement("script");s.src="' +
                    window.location.origin + '/bookmarklet.js' +
                    '";document.body.appendChild(s);})();';
            }
        }
    };
</script>

<style scoped>

</style>
