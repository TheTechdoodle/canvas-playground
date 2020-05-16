<template>
    <v-switch v-model="closeLoadingImmediately" hide-details label="Proceed immediately next time" class="mt-0"/>
</template>

<script>
    import localforage from 'localforage';

    export default {
        name: 'CloseLoadingImmediatelySwitch',
        computed: {
            closeLoadingImmediately: {
                set(closeLoadingImmediately)
                {
                    localforage.setItem('closeLoadingImmediately', closeLoadingImmediately);
                    this.$store.commit('setCloseLoadingImmediately', closeLoadingImmediately);
                },
                get()
                {
                    return this.$store.state.closeLoadingImmediately;
                }
            }
        }
    };
</script>

<style scoped>

</style>
