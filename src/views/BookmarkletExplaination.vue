<template>
    <v-container fluid class="mt-10">
        <v-row justify="center" class="mb-5">
            <h1>Canvas Playground</h1>
        </v-row>
        <v-row justify="center">
            <v-col cols="10" md="4" sm="8">
                <p>
                    This is a webapp for experimenting with the Canvas api
                    by loading it through a bookmarklet (a bookmark that runs javascript).
                    <br><br>
                    <span class="font-weight-bold">Note: </span>This will automatically generate a token to use.
                </p>
                <h4>Instructions:</h4>
                <ol>
                    <li>
                        Add the bookmarklet link (titled "Canvas Playground") to your bookmarks.
                        <a href="https://mreidsma.github.io/bookmarklets/installing.html" target="_blank">Instructions</a>
                    </li>
                    <li>When you're on a Canvas page and signed in, click the bookmark</li>
                </ol>
            </v-col>
        </v-row>
        <v-row justify="center">
            <bookmarklet title="Canvas Playground"/>
        </v-row>
    </v-container>
</template>

<script>
    import Bookmarklet from '../components/Bookmarklet';
    export default {
        name: 'BookmarkletExplaination',
        components: {Bookmarklet}
    };
</script>

<style scoped>

</style>
